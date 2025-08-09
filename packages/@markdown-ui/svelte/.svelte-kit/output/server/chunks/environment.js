let base = "";
let assets = base;
const app_dir = "_app";
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
let prerendering = false;
function set_building() {
}
function set_prerendering() {
  prerendering = true;
}
export {
  assets as a,
  base as b,
  app_dir as c,
  set_building as d,
  set_prerendering as e,
  override as o,
  prerendering as p,
  reset as r,
  set_assets as s
};
