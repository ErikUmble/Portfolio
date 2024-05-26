import type Command from '~/types/command';
import type Environment from '~/types/environment';
import Path from '~/types/path';
import { useFileSystem, useUserEnvironment } from '~/composables/states';
import {FileError} from '~/types/errors';

import findFile from './findFile';

export default function cat(command: Command, div: HTMLDivElement): void {
    const filesystem = useFileSystem();
    const env = useUserEnvironment();
    let targetPath;
    let targetPoint;
    if (command.args.length < 2) {
        div.innerText = "cat: missing operand";
        return;
    }
    else {
        targetPath = new Path(env.getPath().route.concat(command.args[1].split('/')));
    }
    
    try {
        targetPoint = findFile(filesystem.root, targetPath);
    }
    catch (e) {
        if (e instanceof FileError) {
            div.innerText = "cat: " + targetPath.toString() + "is not a valid file";
            return;
        }
    }
    if (!targetPoint || targetPoint.isDir) {
        div.innerText = "cat: " + targetPath.toString() + "is not a valid file";
        return;
    }
    else {
        // output as htm if safe, else as text
        if (targetPoint.isSafe) {
            div.innerHTML = "<div>" + targetPoint.content + "</div>";
        }
        else {
            div.innerText = targetPoint.content;
        }
    }
}