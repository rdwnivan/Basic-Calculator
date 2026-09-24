import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getPlatform: () => process.platform,
});
