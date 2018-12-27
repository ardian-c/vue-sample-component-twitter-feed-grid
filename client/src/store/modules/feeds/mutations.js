export const setFeeds = (state, payload) => {
  state.feeds.push(payload)
}

export const updateFeed = (state, payload) => {
  const { account } = payload
  state.feeds.forEach((feed, idx) => {
    if (feed.account === account) {
      state.feeds[idx].data = payload.data
    }
  })
}

export const setFeedsLoading = (state, status) => {
  state.isLoading = status
}

export const setRequestSuccessMessage = (state, message) => {
  state.successMessage = message
}

export const setRequestFailedMessage = (state, message) => {
  state.failedMessage = message
}
