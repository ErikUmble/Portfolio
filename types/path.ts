export default class Path {
    route: string[];

    constructor(route: string[] = []) {
        // ignore ./ or empty strings and collapse ../
        for (let i = 0; i < route.length; i++) {
            if (route[i] == "." || route[i] == "") {
                route.splice(i, 1);
                i--;
            }
            else if (route[i] == "..") {
                if (i > 0) {
                    route.splice(i - 1, 2);
                    i -= 2;
                }
                else {
                    route.splice(i, 1);
                    i--;
                }
            }
        }

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
