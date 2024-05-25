import Path from "./path";

export default class FilePoint {
    path: Path;
    name: String;
    isDir: Boolean;
    isSafe: Boolean;
    children: Map<String, FilePoint>;
    content: String;

    constructor(path: Path, name: String, isDir: boolean = false, isSafe: boolean = false, children: Map<String, FilePoint> = new Map(), content: String = "") {
        this.path = path;
        this.name = name;
        this.isDir = isDir;
        this.isSafe = isSafe;
        this.children = children;
        this.content = content;
        
    }

    static find(root: FilePoint, path: Path): FilePoint {
        // recursively finds a filepoint by path and returns it if it exists as a descendant of this filepoint
        if (path.route.length == 0) {
            return root;
        }

        // skip over empty strings (which represent current or root directory)
        if (path.route[0] == "") {
            return FilePoint.find(root, new Path(path.route.slice(1)));
        }
        console.log(path.route);

        let next = path.route[0];
        let child = root.children.get(next);
        if (child) {
            return FilePoint.find(child, new Path(path.route.slice(1)));
        } else {
            throw new Error("File not found");
        }
    }


    
    
}

