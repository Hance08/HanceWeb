export const environment = {
  production: false,
  apiUrl: 'https://hanceapi.cfv.biz/api',
  version: new Date().getTime()  // 添加一個時間戳屬性防止快取
}; 