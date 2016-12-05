const {app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const nativeImage = require('electron').nativeImage;
let win,
	iconPath = nativeImage.createFromPath(path.join(__dirname, 'resources/images/icon.png'));

function createWindow() {

	win  = new BrowserWindow({
		width: 800,
		height: 600,
		icon: iconPath
	});

	console.log(iconPath);

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'app/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
});