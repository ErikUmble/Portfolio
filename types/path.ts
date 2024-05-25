export default class Path {
    route: string[];

    constructor(route: string[] = []) {
        this.route = route;
    }

    toString(): string {
        if (this.route.length == 0) return "/";
        return this.route.join('/') + "/";
    }
    isRoot(): boolean {
        return this.route.length == 0;
    }

    toPlainObject() {
        return {
            route: this.route,
        };
    }

    static fromPlainObject(obj: { route: string[] }) {
        return new Path(obj.route);
    }
}
