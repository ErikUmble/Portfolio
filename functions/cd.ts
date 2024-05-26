
import type Command from '~/types/command';
import type Environment from '~/types/environment';
import Path from '~/types/path';
import { useFileSystem, useUserEnvironment } from '~/composables/states';
import {FileError} from '~/types/errors';

import findFile from './findFile';

export default function cd(command: Command, div: HTMLDivElement): void {
    const filesystem = useFileSystem();
    const env = useUserEnvironment();
    let targetPath;
    let targetPoint;
    if (command.args.length < 2) {
        targetPath = new Path(["~"]);
    }
    else {
        targetPath = new Path(env.getPath().route.concat(command.args[1].split('/')));
    }
    
    try {
        targetPoint = findFile(filesystem.root, targetPath);
    }
    catch (e) {
        if (e instanceof FileError) {
            div.innerText = "cd: " + targetPath.toString() + "is not a valid directory";
            return;
        }
    }
    if (targetPoint && targetPoint.isDir) {
        env.setPath(targetPath);
    }
    else {
        div.innerText = "cd: " + targetPath.toString() + "is not a valid directory";
    }
    
}