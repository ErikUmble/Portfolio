import Path from '~/types/path';
import findFile from '~/functions/findFile';

export default function autocompletePath(partial : string) : string | null {
    const env = useUserEnvironment();
    const filesytem = useFileSystem()

    // autocomplete substring after the last / in partial based on filepoints available with everything before that
    const fullPathString = (env.getPath().toString() + partial);
    const parentPath = new Path(fullPathString.slice(0, fullPathString.lastIndexOf("/")).split("/"));
    let parent;
    try {
        parent = findFile(filesytem.root, parentPath);
    }
    catch (e) {
        return null;
    }
    let matchingPrefixChoices = [];
    if (parent) {
        for (let [name, child] of parent.children) {
            if (name.startsWith(fullPathString.slice(fullPathString.lastIndexOf("/") + 1))) {
                matchingPrefixChoices.push(name);
            }
        }
    }
    // find the longest common prefix of all matching names
    if (matchingPrefixChoices.length > 0) {
        let prefix = matchingPrefixChoices[0];
        // find the maximum index that all matchingPrefixChoices have in common
        for (let i = 1; i < matchingPrefixChoices.length; i++) {
            let j = 0;
            while (j < prefix.length && j < matchingPrefixChoices[i].length && prefix[j] == matchingPrefixChoices[i][j]) {
                j++;
            }
            prefix = prefix.slice(0, j);
        }
        return prefix;
    }
    return null;
}