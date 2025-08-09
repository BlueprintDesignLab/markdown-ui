export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DwZY0Gur.js",app:"_app/immutable/entry/app.CBqTRAoC.js",imports:["_app/immutable/entry/start.DwZY0Gur.js","_app/immutable/chunks/DiLnwMup.js","_app/immutable/chunks/B0_GDqvu.js","_app/immutable/entry/app.CBqTRAoC.js","_app/immutable/chunks/B0_GDqvu.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/D95gXjRn.js","_app/immutable/chunks/C7QSNQTZ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/editor","/spec"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
