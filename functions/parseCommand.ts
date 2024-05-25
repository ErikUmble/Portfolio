import type Command from '~/types/command';
import Path from '~/types/path';
import type User from '~/types/user';

export default function parseCommand(input: String): Command {
    // TODO
    return {
        commandName: "ls",
        args: [],
        kwargs: {},
    }
}