import { BaseAxios } from './axios'

/**
 * 首页 模块
 *
 * @export
 * @class Home
 */
export default class Trade {
  static async getBookTicker (params?: Object): Promise<any> {
    return await BaseAxios.get('/v1/ticker/24hr', { params })
  }
  static async getDepth (params?: Object): Promise<any> {
    return await BaseAxios.get('/v1/depth', { params })
  }
  static async getAggTrades (params?: Object): Promise<any> {
    return await BaseAxios.get('/v1/aggTrades', { params })
  }
}
