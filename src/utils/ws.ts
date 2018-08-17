/**
 * Class for communications using WebSockets
 */
// const config = {
//   LORA_SERVER: process.env.LORA_SERVER || '127.0.0.1:10000',
//   LORA_ACCESS_TOKEN: process.env.LORA_ACCESS_TOKEN,
//   RECONN_INTERVAL: Number(process.env.LORA_RECONN_INTERVAL) || 1000
// }

class WebSocketClient {
  /** Interval between reconnections */
  autoReconnectInterval: number

  /** Server address (in the form of ``localhost:9000``) */
  server: string

  /** WebSocket handler */
  websocket?: WebSocket | null

  /** Callback invoked when a message is received */
  onMessageCb?: Function

  /**
   * Constructor
   * @param server The server that this websocket client will connect to
   * @param autoReconnectInterval Interval between reconnections
   */
  constructor(server: string, autoReconnectInterval: number) {
    this.server = server
    this.autoReconnectInterval = autoReconnectInterval
    this.websocket = undefined
    this.onMessageCb = undefined
  }

  /**
   * Set the callback for received messages
   * @param onMessage The callback to be invoked when a message is received
   */
  onMessage(onMessage: (data: any) => void) {
    this.onMessageCb = onMessage
  }

  /**
   * Start the websocket handling
   */
  start() {
    console.log(`Creating connection to server: ${this.server}`)
    this.websocket = new WebSocket(this.server)
    console.log(`WebSocket was created.`)

    this.websocket.onopen = () => {
      console.log('open ws connection')
    }

    this.websocket.onmessage = (data: any) => {
      if (this.onMessageCb) {
        console.log('message' + data)
        this.onMessageCb(data)
      } else {
        console.log('No message callback was set.')
      }
    }

    this.websocket.onerror = e => {
      this.reconnect()
    }

    this.websocket.onclose = e => {
      console.log('close websocket')
    }

  }

  close () {
    if (this.websocket) {
      this.websocket.close()
    }
  }

  /**
   * Reconnect the websocket, if any error occured previously.
   */
  reconnect() {
    console.log(`WebSocketClient: retry in ${this.autoReconnectInterval}ms`)
    if (this.websocket) {
      this.websocket.close()
      this.websocket = null
      // this.websocket.removeAllListeners()
      setTimeout(() => {
        console.log('WebSocketClient: reconnecting...')
        this.start()
      }, this.autoReconnectInterval)
    }
  }
}

export { WebSocketClient }
