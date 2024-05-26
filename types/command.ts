
export default class Command {
    commandName: string;
    args: Array<string>;
    kwargs: Object;

    constructor(commandName: string, args: Array<string> = [], kwargs: Object = {}) {
        this.commandName = commandName;
        this.args = args;
        this.kwargs = kwargs;
    }

    toString(): string {
        return `${this.commandName} ${this.args.join(' ')}`
    }
}