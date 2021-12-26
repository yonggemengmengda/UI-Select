"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs = require('fs');
var electron_1 = require("electron");
require("./router");
require("./menu");
var isDev = process.env.NODE_ENV === 'development';
var WinURL = isDev
    ? "http://localhost:3000"
    : 'file://' + (0, path_1.join)(__dirname, '../../dist/render/index.html');
var mainWindow = null;
var willQuitApp = false;
var template = [
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
                click: function () {
                    electron_1.shell.openExternal('https://www.baidu.com');
                }
            },
            {
                label: 'GitHub',
                click: function () {
                    electron_1.shell.openExternal('https://github.com');
                }
            }
        ]
    }
];
var menu = electron_1.Menu.buildFromTemplate(template);
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
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
            nodeIntegration: true
        }
    });
    electron_1.Menu.setApplicationMenu(menu);
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadURL(WinURL);
    mainWindow.on('close', function (event) {
        if (!willQuitApp) {
            event.preventDefault();
            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.hide();
        }
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.once('ready-to-show', function () {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.show();
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (!mainWindow) {
        createWindow();
    }
    else {
        mainWindow.show();
    }
});
electron_1.app.on('before-quit', function () { return willQuitApp = true; });
electron_1.ipcMain.on('writeFile-req', function (event, arg) {
    fs.writeFile((0, path_1.join)(__dirname, arg.path), arg.data, "utf-8", function (err) {
        if (err)
            return event.sender.send('writeFile-res', { err: JSON.stringify(err) });
        return event.sender.send('writeFile-res', { data: 'ok' });
    });
});
var sortByCreateTime = function (files) {
    return files.sort(function (a, b) {
        return fs.statSync((0, path_1.join)(__dirname, "/md/".concat(a))).birthtime - fs.statSync((0, path_1.join)(__dirname, "/md/".concat(b))).birthtime;
    });
};
electron_1.ipcMain.on('readFileList-req', function (event, dir) {
    fs.readdir((0, path_1.join)(__dirname, dir), function (err, files) {
        if (err)
            return event.sender.send('readFileList-res', { err: JSON.stringify(err) });
        return event.sender.send('readFileList-res', { data: sortByCreateTime(files.filter(function (item) { return item != '.DS_Store'; })) });
    });
});
electron_1.ipcMain.on('readFileData-req', function (event, filePath) {
    fs.readFile((0, path_1.join)(__dirname, filePath), 'utf-8', function (err, file) {
        if (err)
            return event.sender.send('readFileData-res', { data: null, err: JSON.stringify(err) });
        return event.sender.send('readFileData-res', { data: file });
    });
});
electron_1.ipcMain.on('rename-req', function (event, fileName) {
    fs.rename((0, path_1.join)(__dirname, fileName.oldName), (0, path_1.join)(__dirname, fileName.newName), function (err) {
        if (err)
            return event.sender.send('rename-res', { err: JSON.stringify(err) });
        return event.sender.send('rename-res', { data: 'ok' });
    });
});
electron_1.ipcMain.on('remove-req', function (event, fileName) {
    fs.unlink((0, path_1.join)(__dirname, fileName), function (err) {
        if (err)
            return event.sender.send('remove-res', { err: JSON.stringify(err) });
        return event.sender.send('remove-res', { data: 'ok' });
    });
});
