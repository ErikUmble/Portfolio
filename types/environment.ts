import type User from "./user";
import Path from "./path";

export default interface Environment {
    user: User;
    path: Path;
}