type DynamicRoutes = {
	
};

type Layouts = {
	"/": undefined;
	"/editor": undefined;
	"/spec": undefined
};

export type RouteId = "/" | "/editor" | "/spec";

export type RouteParams<T extends RouteId> = T extends keyof DynamicRoutes ? DynamicRoutes[T] : Record<string, never>;

export type LayoutParams<T extends RouteId> = Layouts[T] | Record<string, never>;

export type Pathname = "/" | "/editor" | "/spec";

export type ResolvedPathname = `${"" | `/${string}`}${Pathname}`;

export type Asset = "/robots.txt";