
import type User from '~/types/user';
import type Command from '~/types/command';
import Path from '~/types/path';
import parseCommand from './parseCommand';
import type Output from '~/types/output';

import ls from './ls';
import cd from './cd';
import cat from './cat';

export default function emulateCommand(input: string, user: User, path: Path): Output {
    const command = parseCommand(input);
    if (command.commandName === "ls") {
        return ls(command);
    }
    else if (command.commandName === "cd") {
        return cd(command);
    }
    else if (command.commandName === "cat") {
        return cat(command);
    }
    else if (command.commandName === "whoami") {
        return {
            component: "WhoAmI",
            props: {}
        }
    }
    else {
        return {
            component: "ShellText",
            props: {
                text: `Command not found: ${command.commandName}`
            }
        }
    }
}