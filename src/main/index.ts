import { join, resolve } from 'path';
const fs = require('fs');
import { app, BrowserWindow, Menu, MenuItemConstructorOptions, shell, ipcMain } from 'electron';
import './router';
import './menu';
const isDev = process.env.NODE_ENV === 'development'
const WinURL = isDev
  ? `http://localhost:3000`
  : 'file://' + join(__dirname, '../../dist/render/index.html')

let mainWindow: BrowserWindow | null = null
let willQuitApp = false
const template: MenuItemConstructorOptions[] = [
  {
    label: '修改',
    submenu: [
      { label: '撤销', enabled: false, role: 'undo' },
      { label: '重做', role: 'redo' },
      { type: 'separator' },
      { label: '剪切', role: 'cut' },
      { label: '复制', role: 'copy' },
      { label: '粘贴', role: 'paste' },
      { label: '粘贴并匹配样式', role: 'pasteAndMatchStyle' },
      { label: '删除', role: 'delete' },
      { label: '全选', role: 'selectAll' }
    ]
  },
  {
    role: 'window',
    label: '窗口',
    submenu: [
      { label: '重新加载', role: 'reload' },
      { label: '最小化', role: 'minimize' }
    ]
  },
  {
    role: 'help',
    label: '帮助',
    submenu: [
      {
        label: '反馈建议',
        click() {
          shell.openExternal('https://www.baidu.com')
        }
      },
      {
        label: 'GitHub',
        click() {
          shell.openExternal('https://github.com')
        }
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(template)
function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 300,
    minHeight: 520,
    width: 1240,
    height: 700,
    titleBarStyle: "default",
    center: true,
    backgroundColor: "#ececec",
    alwaysOnTop: false,
    webPreferences: {
      contextIsolation: false,
      // enableRemoteModule: false,
      // webSecurity: true,
      nodeIntegration: true
    }
  })
  Menu.setApplicationMenu(menu)
  if (isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  }
  // and load the index.html of the app.
  mainWindow.loadURL(WinURL)
  mainWindow.on('close', function (event) {
    if (!willQuitApp) {
      event.preventDefault()
      mainWindow?.hide()
    }
  })
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!mainWindow) {
    createWindow()
  } else {
    mainWindow.show()
  }
})
app.on('before-quit', () => willQuitApp = true)
ipcMain.on('writeFile-req', function (event, arg) {
  fs.writeFile(join(__dirname, arg.path), arg.data, "utf-8", (err: string) => {
    if (err) return event.sender.send('writeFile-res', { err: JSON.stringify(err) });
    return event.sender.send('writeFile-res', { data: 'ok' });
  })
})
const sortByCreateTime = (files: string[]) => {
  return files.sort((a, b) => {
    return fs.statSync(join(__dirname, `/md/${a}`)).birthtime - fs.statSync(join(__dirname, `/md/${b}`)).birthtime
  })
}
ipcMain.on('readFileList-req', (event, dir) => {
  fs.readdir(join(__dirname, dir), (err: string, files: any[]) => {
    if (err) return event.sender.send('readFileList-res', { err: JSON.stringify(err) });
    return event.sender.send('readFileList-res', { data: sortByCreateTime(files.filter(item => item != '.DS_Store')) });
  })
})
ipcMain.on('readFileData-req', (event, filePath) => {
  fs.readFile(join(__dirname, filePath), 'utf-8', (err: string, file: any) => {
    if (err) return event.sender.send('readFileData-res', { data: null, err: JSON.stringify(err) });
    return event.sender.send('readFileData-res', { data: file });
  })
})
ipcMain.on('rename-req', (event, fileName) => {
  fs.rename(join(__dirname, fileName.oldName), join(__dirname, fileName.newName), (err: string) => {
    if (err) return event.sender.send('rename-res', { err: JSON.stringify(err) });
    return event.sender.send('rename-res', { data: 'ok' });
  })
})
ipcMain.on('remove-req', (event, fileName) => {
  fs.unlink(join(__dirname, fileName), (err: string) => {
    if (err) return event.sender.send('remove-res', { err: JSON.stringify(err) })
    return event.sender.send('remove-res', { data: 'ok' })
  })
})
