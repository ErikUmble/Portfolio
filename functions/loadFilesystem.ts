import Path from "../types/path";
import FilePoint from "../types/filepoint";
import type FilePointJson from "../types/filepointjson";
import filesystem from "@/assets/data/filesystem.json";

function parseFile(_file: FilePointJson, _path: String[]): FilePoint {
    // recursively parses the json representation of a filepoint and its children into a FilePoint object
    let file = {path: {route: _path as String[]} as Path, name: _file.name, isDir: _file.isDir, isSafe: true, content : _file?.content || "", children: new Map()} as FilePoint;
    if (_file.isDir) {
        for (const _child of (_file.children || [])) {
            file.children.set(_child.name, parseFile(_child, _path.concat(_file.name)));
        }
    }

    return file;
}

export default function loadFilesystem(): FilePoint {
    // creates a root FilePoint and loads the contents of the filesystem.json file into it as FilePoint children
    let root = {path: {route: [] as String[]} as Path, name: "", isDir: true, isSafe: true, content : "", children: new Map()} as FilePoint;
    for (const _file of filesystem) {
        root.children.set(_file.name, parseFile(_file, [""]));
    }
    return root;
}