export default interface FilePointJson {
    name: String,
    isDir: Boolean,
    content?: String,
    children?: FilePointJson[]
}