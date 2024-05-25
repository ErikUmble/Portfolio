import type Command from '~/types/command';
import type Environment from '~/types/environment';
import Path from '~/types/path';
import FilePoint from '~/types/filepoint';
import findFile from './findFile';

export default function ls(command: Command, environment: Environment): void {
    const filesystem = useFileSystem();
    const currentPoint = findFile(filesystem.root, environment.path);
    let output = "";
    let allSafe : Boolean = true;
    let children = [];
    for (const child of currentPoint?.children.values() || []) {
        children.push({name: child.name, isDir: child.isDir});
        allSafe = allSafe && child.isSafe;
    }

    // use innerHTML if allSafe, else use innerText
    if (allSafe) {
        for (const child of children) {
            if (child.isDir) {
                output += "<span class='text-info'>" + child.name + "&nbsp;</span> ";
            }
            else {
                output += child.name + " &nbsp;";
            }
        }
        environment.div.innerHTML = output;
    }
    else {
        for (const child of children) {
            
            output += child.name + "&nbsp; ";
            
        }
        environment.div.innerText = output;
    }
}