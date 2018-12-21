export const setFeeds = (state, payload) => {
  state.feeds.push(payload)
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
