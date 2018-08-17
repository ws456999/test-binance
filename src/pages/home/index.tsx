import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router';
import { History } from 'history'

// import { SFCCounterConnected } from '@/components/counter'
// import { SFCCounterDecorator } from '@/components/contain'
import * as countersActions from '@/store/modules/trade/actions'
import { CoinListState } from '@/store/modules/trade/state'
import Trade from '@/api/trade'
import * as style from './home.css'
import { WebSocketClient } from '@/utils/ws'
import coinJson from './coin'
// import { Link } from 'react-router-dom'

import Types from 'Types'

export interface HomeProps {
  initailCoinList: (a: any) => any
  changeCoinList: (a: any) => any
  coinList: CoinListState[],
  history: History
}
interface HomeState {
  // readonly list: any
}

class Home extends React.Component<HomeProps, HomeState> {
  /*  */
  // state = {
  // }

  geTrade(symbol: string | undefined) {
    this.props.history.push(`/trade/${symbol}`)
  }

  componentDidMount() {
    const { initailCoinList, changeCoinList } = this.props

    initailCoinList(coinJson)
    Trade.getBookTicker().then(res => {
      initailCoinList(res)
      // console.log(res)
    })

    let ws: WebSocketClient = new WebSocketClient('wss://stream.binance.com:9443' + '/stream?streams=!miniTicker@arr@3000ms', 4)

    ws.onMessage((event) => {
      changeCoinList(JSON.parse(event.data).data)
    } )
    ws.start()

    // console.log(this, coinList)
    // let websocket: WebSocket = new WebSocket(
    //   'wss://stream.binance.com:9443' + '/stream?streams=!miniTicker@arr@3000ms'
    // )
    // websocket.onopen = () => {
    //   console.log('open')
    // }
    // websocket.onmessage = event => {
    //   console.log(JSON.parse(event.data))
    // }
    // websocket.onerror = e => {
    //   console.log(e)
    // }
  }

  public render() {
    const { coinList } = this.props
    return (
      <div className={style.App}>
        {/* <SFCCounterConnected label="what3" /> */}
        <div className={style.col}>
          <div className={style['col-item']}>市场</div>
          <div className={style['col-item']}>最近价格</div>
          <div className={style['col-item']}>24小时涨幅</div>
          <div className={style['col-item']}>24h最高价</div>
          <div className={style['col-item']}>24h最低价</div>
          <div className={style['col-item']}>24h成交量</div>
        </div>
        {
          coinList.map(item => (
            <div key={item.symbol} className={style.col} onClick={() => this.geTrade(item.symbol)}>
              <div className={style['col-item']}>{item.symbol}</div>
              <div className={style['col-item']}>{item.lastPrice}</div>
              <div className={style['col-item']}>{item.priceChangePercent}</div>
              <div className={style['col-item']}>{item.highPrice}</div>
              <div className={style['col-item']}>{item.lowPrice}</div>
              <div className={style['col-item']}>{item.volume}</div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default withRouter(connect(
  (state: Types.RootState) => ({
    coinList: state.trade.coinList
  }),
  dispatch => bindActionCreators({ initailCoinList: countersActions.initailCoinList, changeCoinList: countersActions.changeCoinList }, dispatch)
)(Home))
