import feedService from '@/services/feedService'

export const getFeed = async ({ commit, dispatch }, payload) => {
  const { account, count } = payload
  commit('setFeedsLoading', true)
  try {
    const { data } = await feedService.getFeedByUsername(account, count)
    commit('setFeeds', { account, data })
  } catch (err) {
    dispatch('failedApiRequest', 'Something went wrong!')
  }
  commit('setFeedsLoading', false)
}

export const failedApiRequest = ({ commit }, payload) => {
  commit('setRequestFailedMessage', payload)
}

export const successfulApiRequest = ({ commit }, payload) => {
  commit('setRequestSuccessMessage', payload)
}
