
import type Command from '~/types/command';
import type Environment from '~/types/environment';
import Path from '~/types/path';
import { useFileSystem, useUserEnvironment } from '~/composables/states';
import {FileError} from '~/types/errors';

import findFile from './findFile';
import type Output from '~/types/output';

export default function cd(command: Command): Output {
    const filesystem = useFileSystem();
    const env = useUserEnvironment();
    let targetPath;
    let targetPoint;
    let outputText = "";
    if (command.args.length < 2) {
        // empty cd goes home
        targetPath = new Path(["~"]);
    }
    else {
        // otherwise form absolute path from relative input path
        targetPath = env.getPath().getAbsolute(command.args[1]);
    }
    
    try {
        targetPoint = findFile(filesystem.root, targetPath);
    }
    catch (e) {
        if (e instanceof FileError) {
            outputText = "cd: " + targetPath.toString() + "is not a valid directory";
        }
    }
    if (targetPoint && targetPoint.isDir) {
        env.setPath(targetPath);
    }
    else {
        outputText = "cd: " + targetPath.toString() + "is not a valid directory";
    }

    return {
        component: "ShellText",
        props: {
            text: outputText
        }
    }
    
}