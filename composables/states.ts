import { defineStore } from 'pinia'
import loadFilesystem from '~/functions/loadFilesystem';
import type FilePoint from '~/types/filepoint';
import Path from '~/types/path';
import type User from '~/types/user';

export const useFileSystem = defineStore('filesystem', {
    state: () => ({
        root : loadFilesystem() as FilePoint,
    }),
    actions: {
        
    },
});

export const useUserEnvironment = defineStore('currentPath', {
    state: () => ({
        path: new Path(["~"]).toPlainObject() as ReturnType<Path['toPlainObject']>,
        user: { name: "user" } as User,
    }),
    actions: {
        setPath(newPath: Path) {
            this.path = newPath.toPlainObject();
        },
        getPath(): Path {
            return Path.fromPlainObject(this.path);
        },
        setUser(newUser: User) {
            this.user = newUser;
        },
        getUser(): User {
            return this.user;
        },
        
    },
});


