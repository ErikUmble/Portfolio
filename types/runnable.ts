
import type Environment from "./environment";

export default interface Runnable {
    environment: Environment;
    input: string;
}

