export default class Path {
    route: string[];

    constructor(route: string[] = []) {
        this.route = route;
    }

    toString(): string {
        if (this.route.length == 0) return "/";
        return this.route.join('/') + "/";
    }
}
