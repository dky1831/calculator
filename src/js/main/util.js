'use strict';

import {BrowserWindow, app} from 'electron';

export function run(windowOptions, filename) {
    let window;
    function createWindow() {
        window = new BrowserWindow(windowOptions);
        if (filename !== undefined) {
            window.loadFile(`../../html/${filename}.html`);
        }
        window.on('closed', () => {
            window = null;
        });
    }
    
    app.on('ready', createWindow);
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    app.on('activate', () => {
        if (window === null) {
            createWindow();
        }
    });
}
