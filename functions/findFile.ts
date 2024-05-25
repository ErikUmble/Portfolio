
import FilePoint from '~/types/filepoint';
import Path from '~/types/path';

export default function findFile(root: FilePoint, path: Path): FilePoint | null {
    if (path.isRoot()) {
        return root;
    }
    
    // temporarily use root as home directory
    else if (path.route[0] == "~") {
        return FilePoint.find(root, new Path(path.route.slice(1)));
    }
    console.log(path.route)
    return FilePoint.find(root, path);
}