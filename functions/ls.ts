import type Command from '~/types/command';
import type Environment from '~/types/environment';
import Path from '~/types/path';
import FilePoint from '~/types/filepoint';
import findFile from './findFile';
import type Output from '~/types/output';

export default function ls(command: Command): Output {
    const filesystem = useFileSystem();
    const env = useUserEnvironment();
    let targetPath;
    if (command.args.length < 2) {
        targetPath = env.getPath();
    }
    else {
        targetPath = new Path(env.getPath().route.concat(command.args[1].split('/')));
    }
    const currentPoint = findFile(filesystem.root, targetPath);
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
        return {
            component: "ShellHTML",
            props: {
                html: output
            }
        
        }
    }
    else {
        for (const child of children) {
            
            output += child.name + "&nbsp; ";
            
        }
        return {
            component: "ShellText",
            props: {
                text: output
            }
        }
    }
}