import * as React from 'react'
import { StatefulCounter } from '@/components/counter'
import * as style from './App.css'
import Home from '@/api/home'
import {
  Link
} from 'react-router-dom'

import logo from '@/assets/logo.svg'

export default class App extends React.Component {/*  */
  componentDidMount () {
    Home.getBookTicker().then(res => {
      console.log(res)
    })
  }

  public render() {
    return (
      <div className={style.App}>
        <p className={style.what}>123456</p>
        <StatefulCounter label="what3"/>
        {/* <Link to="/">返回</Link> */}
        <Link to="/trade">交易12</Link>
        <header className="App-header">
          <img src={logo} className={style['App-logo']} alt="logo" />
          <h1 className="App-title">Welcome to React123</h1>
        </header>
        <p className="App-intro">
          To get started, edit123 <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    )
  }
}
