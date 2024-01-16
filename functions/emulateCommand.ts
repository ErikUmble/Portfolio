
import type User from '~/types/user';
import Path from '~/types/path';

export default function emulateCommand(command: string, user: User, path: Path): string {
  
    return `you entered ${command}`;
}