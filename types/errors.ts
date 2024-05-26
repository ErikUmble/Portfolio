
export class ErrorBase<T extends string> extends Error {
    name: T;
    message: string;
    cause: any;
    constructor({
        name,
        message,
        cause
    }: {
        name: T;
        message: string;
        cause: any;
    }) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}

type CommandErrorName = 
| "COMMAND_NOT_FOUND"

export class CommandError extends ErrorBase<CommandErrorName> {}

type FileErrorName =
| "FILE_NOT_FOUND"
| "PERMISSION_DENIED"

export class FileError extends ErrorBase<FileErrorName> {}