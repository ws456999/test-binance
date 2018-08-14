import * as React from 'react'
import {
  Link
} from 'react-router-dom'

export default class Trade extends React.Component {
  public render() {
    return (
      <div>
        <Link to="/">返回</Link>
        <Link to="/trade">交易</Link>
      </div>
    )
  }
}
