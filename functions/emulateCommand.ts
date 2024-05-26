
import type User from '~/types/user';
import type Command from '~/types/command';
import Path from '~/types/path';
import parseCommand from './parseCommand';

import ls from './ls';
import cd from './cd';
import cat from './cat';

export default function emulateCommand(input: string, user: User, path: Path, div: HTMLDivElement): void {
    const command = parseCommand(input);
    if (command.commandName === "ls") {
        ls(command, div);
    }
    else if (command.commandName === "cd") {
        cd(command, div);
    }
    else if (command.commandName === "cat") {
        cat(command, div);
    }
    else {
        div.innerText = "Command not found";
    }
}