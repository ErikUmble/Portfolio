import type Output from "./output";
import type Runnable from "./runnable";


export default interface ExecutionResult {
    run: Runnable;
    output: Output;
    error?: string;
    exitCode?: number;
}