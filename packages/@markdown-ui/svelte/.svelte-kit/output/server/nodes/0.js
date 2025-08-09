

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": true
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Dco8P852.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/B0_GDqvu.js","_app/immutable/chunks/ChtMoJzX.js","_app/immutable/chunks/D95gXjRn.js","_app/immutable/chunks/C1itG1dT.js","_app/immutable/chunks/B6qCwk2o.js","_app/immutable/chunks/DiLnwMup.js"];
export const stylesheets = ["_app/immutable/assets/widgets.CC5xWzCR.css","_app/immutable/assets/0.BCIQtFao.css"];
export const fonts = [];
