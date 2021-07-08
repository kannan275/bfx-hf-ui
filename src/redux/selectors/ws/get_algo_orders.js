import _get from 'lodash/get'
import _map from 'lodash/map'
import _find from 'lodash/find'
import { createSelector } from 'reselect'
import { REDUCER_PATHS } from '../../config'
import { getMarkets } from '../meta'

const path = REDUCER_PATHS.WS

const algoOrders = (state) => {
  return _get(state, `${path}.algoOrders`, [])
}
const allMarkets = state => getMarkets(state)

const algoOrdersWithReplacedPairs = createSelector([allMarkets, algoOrders], (markets, orders) => {
  return _map(orders, (order) => {
    const currentMarket = _find(markets, (market) => market.wsID === order.args.symbol)
    return { ...order, args: { ...order.args, symbol: currentMarket.uiID } }
  }, [])
})

export default algoOrdersWithReplacedPairs
