// Link.react.js
import * as React from 'react'

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal'
}

export interface SFCCounterProps {
  page: string
}
interface State {
  readonly class: string
}

export default class Link extends React.Component<SFCCounterProps, State> {
  state = {
    class: STATUS.NORMAL
  }

  _onMouseEnter = () => {
    this.setState({ class: STATUS.HOVERED })
  }

  _onMouseLeave = () => {
    this.setState({ class: STATUS.NORMAL })
  }

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        {this.props.children}
      </a>
    )
  }
}
