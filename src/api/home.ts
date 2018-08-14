import { BaseAxios } from './axios'

/**
 * 首页 模块
 *
 * @export
 * @class Home
 */
export default class Home {
  static async getBookTicker (params?: Object): Promise<any> {
    return await BaseAxios.get('/api/v1/exchangeInfo', { params })
  }
}
