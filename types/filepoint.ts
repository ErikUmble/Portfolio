import Path from "./path";
import {FileError} from "./errors";

export default class FilePoint {
    path: Path;
    name: string;
    isDir: Boolean;
    isSafe: Boolean;
    children: Map<string, FilePoint>;
    content: string;

    constructor(path: Path, name: string, isDir: boolean = false, isSafe: boolean = false, children: Map<string, FilePoint> = new Map(), content: string = "") {
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

        let next = path.route[0];
        let child = root.children.get(next);
        if (child) {
            return FilePoint.find(child, new Path(path.route.slice(1)));
        } else {
            throw new FileError({name: "FILE_NOT_FOUND", message: "File not found", cause: path.route.join("/")});
        }
    }


    
    
}

