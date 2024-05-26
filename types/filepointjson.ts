export default interface FilePointJson {
    name: string,
    isDir: Boolean,
    content?: string,
    contentPath?: string,
    children?: FilePointJson[]
}