import type Command from '~/types/command';
import Path from '~/types/path';
import type User from '~/types/user';

export default function parseCommand(input: string): Command {
    // simplified parsing for now
    const args = input.trim().split(" ");
    return {
        commandName: args[0],
        args: args,
        kwargs: {},
    }
}