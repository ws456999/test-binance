import * as React from 'react'
import {
  // Link,
  match
} from 'react-router-dom'
import { WebSocketClient } from '@/utils/ws'
import { aggTrades, depth } from './mock'
import TradeApi from '@/api/trade'
import style from './trade.css'

interface TradeMatch {
  id: string;
}

export interface TradeProps {
  history: History,
  match: match<TradeMatch>
}

interface TradeState {
  ws: WebSocketClient | null
  symbol: string,
  aggTrades: any,
  asks: any,
  bids: any,
  currentPrice: number | null
  // readonly list: any
}

export default class Trade extends React.Component<TradeProps, TradeState> {

  state = {
    ws: null,
    symbol: '',
    aggTrades: [],
    asks: [],
    bids: [],
    currentPrice: null
  }

  closeWebsocket = () => {
    if (this.state.ws) {
      (this.state.ws as any).close();
      (this.state.ws as any).reconnect()
    }
  }

  getDepth () {
    TradeApi.getDepth({
      limit: 80,
      symbol: this.state.symbol
    }).then(res => {
      this.setState({
        asks: res.asks,
        bids: res.bids
      })
    }).catch(() => {
      this.setState({
        asks: depth.asks.sort((a: any, b: any) => b[0] - a[0]),
        bids: depth.bids
      })
    })
  }

  getAggTrades () {
    TradeApi.getAggTrades({
      limit: 80,
      symbol: this.state.symbol
    }).then(res => {
      this.setState({
        aggTrades: res
      })
    }).catch(() => {
      this.setState({
        aggTrades: aggTrades
      })
    })
  }

  componentDidMount () {
    const { match } = this.props
    this.setState({
      symbol: match.params.id
    }, () => {
      this.getAggTrades()
      this.getDepth()
    })
    let symbol = match.params.id.toLocaleLowerCase()
    let ws: WebSocketClient = new WebSocketClient(`wss://stream.binance.com:9443/stream?streams=!miniTicker@arr@3000ms/${symbol}@depth.b10/${symbol}@aggTrade.b10`, 4)
    this.setState({
      ws: ws
    })

    ws.onMessage((event) => {
      let data = JSON.parse(event.data).data
      switch (data.e) {
        case 'aggTrade':
          this.setState({
            currentPrice: data.p,
            aggTrades: [data, ...this.state.aggTrades].slice(0, 50)
          })
          break;
        case 'depthUpdate':
          this.setState({
            asks: [...data.a, ...this.state.asks].sort((a: any, b: any) => b[0] - a[0]).slice(0, 20),
            bids: [...data.b, ...this.state.bids].sort((a: any, b: any) => b[0] - a[0]).slice(0, 20)
          })
          break;
        default:
          break;
      }
    })
    ws.start()
  }

  componentWillUnmount () {
    (this.state.ws as any).close()
  }

  public render() {
    const { asks, bids, aggTrades, currentPrice } = this.state
    // console.log()
    return (
      <div>
        <button className={style.button} onClick={this.closeWebsocket}>断开连接</button>
        <div className={style.depth}>
          <div className={style.title}>
            <div>价格</div>
            <div>数量</div>
          </div>
          {
            asks.map((ask, index) => (
              <div className={style.ask} key={index}>
                <div className={style.ask_price}>{ask[0]}</div>
                <div>{ask[1]}</div>
                {/* <div></div> */}
              </div>
            ))
          }
          <h2>当前价格： {currentPrice}</h2>
          {
            bids.map((bid, index) => (
              <div className={style.bid} key={index}>
                <div className={style.bid_price}>{bid[0]}</div>
                <div>{bid[1]}</div>
                {/* <div></div> */}
              </div>
            ))
          }
        </div>

        <div><h1>当前成交</h1></div>
        <div className={style.aggTrade}>
          <div className={style.title}>
            <div>价格</div>
            <div>数量</div>
          </div>
          {
            (aggTrades as any[]).map((agg, index) => (
              <div className={style.agg} key={index}>
                <div className={agg.m ? style.bid_price : style.ask_price}>{agg.p}</div>
                <div>{agg.q}</div>
                {/* <div></div> */}
              </div>
            ))
          }
          </div>
      </div>
    )
  }
}
