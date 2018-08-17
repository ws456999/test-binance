import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as countersActions from '@/store/modules/trade/actions'
import Types from 'Types'
// import { withRouter } from 'react-router';

export interface SFCCounterProps {
  label: string
  count: number
  increment: () => any
}
interface State {
  readonly count: number
}

// @withRouter
class StatefulCounter extends React.Component<SFCCounterProps, State> {
  readonly state: State = {
    count: 0
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    const { label, increment, count } = this.props
    // console.log(this)

    return (
      <div>
        <span>
          {label}: {count}{' '}
        </span>
        <button type="button" onClick={increment}>
          {`Increment`}
        </button>
      </div>
    )
  }
}

export const SFCCounterConnected = connect(
  (state: Types.RootState) => ({
    count: state.trade.reduxCounter
  }),
  dispatch => bindActionCreators({ ...countersActions }, dispatch)
)(StatefulCounter)
