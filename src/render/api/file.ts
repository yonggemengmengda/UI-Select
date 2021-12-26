const ipcRenderer = require('electron').ipcRenderer
import { useMessage } from 'naive-ui'
import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'
import { resolve } from 'path'
/*
 * @Author: Yong
 * @Date: 2021-12-26 12:23:48
 * @LastEditors: Yong
 * @LastEditTime: 2021-12-26 23:43:01
 * @Description: 文件操作
 */
interface FileCtrlEventType {
    writeFileRes: "writeFile-res"
    writeFileReq: "writeFile-req"
    readFileDataReq: "readFileData-req"
    readFileDataRes: "readFileData-res"
    readFileListReq: "readFileList-req"
    readFileListRes: "readFileList-res"
    renameReq: "rename-req"
    renameRes: "rename-res"
    removeReq: "remove-req",
    removeRes: "remove-res"
}
interface FileCtrlResType {
    data: any,
    err?: string
}
class useFileCtrl {
    FileCtrlEvent: FileCtrlEventType
    fileDir: string
    message: MessageApiInjection
    constructor() {
        this.message = useMessage()
        this.fileDir = "/md"
        this.FileCtrlEvent = {
            writeFileRes: "writeFile-res",
            writeFileReq: "writeFile-req",
            readFileDataReq: "readFileData-req",
            readFileDataRes: "readFileData-res",
            readFileListReq: "readFileList-req",
            readFileListRes: "readFileList-res",
            renameReq: "rename-req",
            renameRes: "rename-res",
            removeReq: "remove-req",
            removeRes: "remove-res"
        }
    }
    read(name: string): Promise<FileCtrlResType> {
        return new Promise((resolve, reject) => {
            ipcRenderer.once(this.FileCtrlEvent.readFileDataRes, (event, res: { data: any, err?: string }) => {
                if (res.err) {
                    this.message.error(res.err, { duration: 10000, closable: true })
                    return reject(res.err)
                }
                return resolve(res)
            })
            ipcRenderer.send(this.FileCtrlEvent.readFileDataReq, `${this.fileDir}/${name}`)
        })
    }
    write(name: string, data: string): Promise<FileCtrlResType> {
        return new Promise((resolve, reject) => {
            ipcRenderer.once(this.FileCtrlEvent.writeFileRes, (event, res: { data: any, err?: string }) => {
                if (res.err) {
                    this.message.error(res.err, { duration: 10000, closable: true })
                    return reject(res.err)
                }
                return resolve(res)
            })
            ipcRenderer.send(this.FileCtrlEvent.writeFileReq, {
                path: `${this.fileDir}/${name}`,
                data,
            })
        })
    }
    list(dir?: string): Promise<FileCtrlResType> {
        return new Promise((resolve, reject) => {
            ipcRenderer.once(this.FileCtrlEvent.readFileListRes, (event, res: { data: any, err?: string }) => {
                if (res.err) {
                    this.message.error(res.err, { duration: 10000, closable: true })
                    return reject(res.err)
                }
                return resolve(res)
            })
            ipcRenderer.send(this.FileCtrlEvent.readFileListReq, dir || this.fileDir)
        })
    }
    rename(oldName: string, newName: string): Promise<FileCtrlResType> {
        return new Promise((resolve, reject) => {
            ipcRenderer.once(this.FileCtrlEvent.renameRes, (event, res: { data: 'ok', err?: string }) => {
                if (res.err) {
                    this.message.error(res.err, { duration: 10000, closable: true })
                    return reject(res.err)
                }
                return resolve(res)
            })
            ipcRenderer.send(this.FileCtrlEvent.renameReq, {
                oldName: `${this.fileDir}/${oldName}`, newName: `${this.fileDir}/${newName}`
            })
        })
    }
    remove(name: string): Promise<FileCtrlResType> {
        return new Promise((resolve, reject) => {
            ipcRenderer.once(this.FileCtrlEvent.removeRes, (event, res: { data: 'ok', err?: string }) => {
                if (res.err) {
                    this.message.error(res.err, { duration: 10000, closable: true })
                    return reject(res.err)
                }
                return resolve(res)
            })
            ipcRenderer.send(this.FileCtrlEvent.removeReq, `${this.fileDir}/${name}`)
        })
    }
}
export default useFileCtrl
