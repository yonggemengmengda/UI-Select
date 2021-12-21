import { join } from 'path';
import { app, BrowserWindow, Menu, MenuItemConstructorOptions, shell } from 'electron';
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
          shell.openExternal('https://github.com/cyytemplate/vite-electron-ts/issues')
        }
      },
      {
        label: 'GitHub',
        click() {
          shell.openExternal('https://github.com/cyytemplate/vite-electron-ts')
        }
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(template)
function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1140,
    minHeight: 700,
    width: 1240,
    height: 700,
    titleBarStyle: "default",
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
