export const getAllFeeds = state => state.feeds
export const getFeedsByAccount = state => (account) => {
  return state.feeds.find(feed => feed.account === account)
}
export const isLoading = state => state.isLoading
