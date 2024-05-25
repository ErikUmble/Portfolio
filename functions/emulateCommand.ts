
import type User from '~/types/user';
import Path from '~/types/path';

import ls from './ls';

export default function emulateCommand(input: string, user: User, path: Path, div: HTMLDivElement): void {
    console.log(path.toString());
    ls({commandName: "ls", args: [], kwargs: {}}, {user, path, div});
}