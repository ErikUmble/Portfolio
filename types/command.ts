
export default class Command {
    commandName: String;
    args: Array<String>;
    kwargs: Object;

    constructor(commandName: String, args: Array<String> = [], kwargs: Object = {}) {
        this.commandName = commandName;
        this.args = args;
        this.kwargs = kwargs;
    }

    toString(): String {
        return `${this.commandName} ${this.args.join(' ')}`
    }
}