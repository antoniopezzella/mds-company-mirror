/**
 * commit-and-tag-version updater for dist/tokens.json.
 *
 * dist/tokens.json is a TRACKED build artifact that stamps its own version in
 * `meta.version`. Regenerating it in a `postbump` hook isn't enough: the tool
 * only stages files it knows about, so the regenerated artifact was left as an
 * unstaged modification and the release commit shipped tokens still claiming
 * the PREVIOUS version. This repo has published that mismatch before — an
 * artifact stamped 0.2.0 while the package was 0.4.1.
 *
 * Declaring it in `bumpFiles` with this updater makes the tool read, rewrite
 * and stage it alongside package.json, so the artifact and the package can't
 * disagree.
 *
 * CommonJS on purpose: commit-and-tag-version `require()`s updater modules, and
 * this package is "type": "module", so a .js file here would be parsed as ESM
 * and fail.
 */
module.exports.readVersion = function readVersion(contents) {
  return JSON.parse(contents).meta.version;
};

module.exports.writeVersion = function writeVersion(contents, version) {
  const json = JSON.parse(contents);
  json.meta.version = version;
  // Two spaces, no trailing newline — matches what scripts/build-tokens.js
  // writes, so a release doesn't introduce a spurious whitespace diff.
  return JSON.stringify(json, null, 2);
};
