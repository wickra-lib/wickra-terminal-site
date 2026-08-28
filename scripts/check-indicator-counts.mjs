// Every indicator count this site states, checked against the repository that
// owns it.
//
// The site restates two numbers it does not own: how many of the Wickra
// indicators the terminal reaches, and how many the library ships. Nothing
// checked either, and both drifted -- the terminal's went stale twice over, sat
// at 460 while the repository said 457, and was only ever noticed by hand.
//
// The terminal guards its own copies with a marker and a test; this is the same
// idea across a repository boundary. The marker is the source here too, so the
// terminal's README stays the single place the number is decided.
//
// Run: node scripts/check-indicator-counts.mjs

const TERMINAL_README =
  'https://raw.githubusercontent.com/wickra-lib/wickra-terminal/main/README.md';
const LIBRARY_INDICATORS =
  'https://raw.githubusercontent.com/wickra-lib/wickra/main/crates/wickra-core/src/indicators/mod.rs';

// A three-digit number on a line that mentions an indicator. Deliberately not a
// list of line numbers: the wording here changes more often than the fact does.
const COUNT = /\b(\d{3})\b(?=[^\n]*indicator)/gi;

// Which number each file is talking about. `demo.md` points at the library's own
// live demo, so it states the library's count and not the terminal's.
const FILES = [
  { path: '.vitepress/config.ts', owner: 'terminal' },
  { path: 'about.md', owner: 'terminal' },
  { path: 'index.md', owner: 'terminal' },
  { path: 'demo.md', owner: 'library' },
];

async function text(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.text();
}

const [readme, modrs] = await Promise.all([
  text(TERMINAL_README),
  text(LIBRARY_INDICATORS),
]);

const marker = readme.match(/<!--indicator-count-->(\d+)<!--\/indicator-count-->/);
if (!marker) {
  throw new Error('the terminal README no longer carries an indicator-count marker');
}
// The same count wickra's own sync workflow derives: one `mod` per indicator.
const libraryCount = (modrs.match(/^mod /gm) ?? []).length;
if (libraryCount < 100) {
  throw new Error(`only ${libraryCount} indicator modules found; the source moved`);
}

const expected = { terminal: marker[1], library: String(libraryCount) };
console.log(`terminal: ${expected.terminal}   library: ${expected.library}`);

const { readFileSync } = await import('node:fs');
let checked = 0;
const wrong = [];

for (const { path, owner } of FILES) {
  const lines = readFileSync(path, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(COUNT)) {
      checked += 1;
      if (m[1] !== expected[owner]) {
        wrong.push(`${path}:${i + 1} says ${m[1]}, the ${owner} has ${expected[owner]}`);
      }
    }
  });
}

if (checked === 0) {
  throw new Error('no indicator counts found to check; the phrasing moved');
}
console.log(`checked ${checked} stated counts`);
if (wrong.length) {
  console.error('\n' + wrong.join('\n'));
  process.exit(1);
}
