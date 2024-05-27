import type Command from '~/types/command';
import type Environment from '~/types/environment';
import Path from '~/types/path';
import { useFileSystem, useUserEnvironment } from '~/composables/states';
import {FileError} from '~/types/errors';
import ShellText from '~/components/ShellText.vue';

import findFile from './findFile';
import type Output from '~/types/output';

export default function cat(command: Command): Output {
    const filesystem = useFileSystem();
    const env = useUserEnvironment();
    let targetPath;
    let targetPoint;
    if (command.args.length < 2) {
        return {
            component: "ShellText",
            props: {
                text: "cat: missing operand"
            }
        
        }
    }
    else {
        targetPath = env.getPath().getAbsolute(command.args[1]);
    }
    
    try {
        targetPoint = findFile(filesystem.root, targetPath);
    }
    catch (e) {
        if (e instanceof FileError) {
            return {
                component: "ShellText",
                props: {
                    text: "cat: " + targetPath.toString() + "is not a valid file"
                
                }
            }
        }
    }
    if (!targetPoint || targetPoint.isDir) {
        return {
            component: "ShellText",
            props: {
                text: "cat: " + targetPath.toString() + "is not a valid file"
            }
        
        }
    }
    else {
        // output as htm if safe, else as text
        if (targetPoint.isSafe) {
            return {
                component: "ShellHTML",
                props: {
                    html: targetPoint.content
                }
            }
        }
        else {
            return {
                component: "ShellText",
                props: {
                    text: targetPoint.content
                }   
            }
        }
    }
}