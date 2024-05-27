export default class Path {
    route: string[];

    constructor(route: string[] = []) {
        // ignore ./ or empty strings and collapse ../
        for (let i = 0; i < route.length; i++) {
            if (route[i] == ".") {
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
        return this.route.join('/');
    }
    isRoot(): boolean {
        return this.route.length == 0;
    }

    getAbsolute(relativePathString : string): Path {
        /*
        returns an absolute path from a relative path string starting from this current path
        */
        if (relativePathString.startsWith("/")) {
            // already absolute
            return new Path(relativePathString.split('/'));
        }
        else if (relativePathString.startsWith("~")) {
            // also handled as absolute starting from root
            return new Path(relativePathString.slice(1).split('/'));
        }
        else {
            // relative to base
            return new Path(this.route.concat(relativePathString.split('/')));
        }
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
