export const setAccounts = (state, accounts) => {
  state.accounts = accounts
}

export const addAccount = (state, account) => {
  if (typeof state.accounts === 'undefined') return
  state.accounts.push(account)
}

export const updatePostCount = (state, payload) => {
  if (typeof state.default.settings[payload.account] !== 'undefined') {
    state.default.settings[payload.account].postCount = payload.count
  } else {
    state.default.settings[payload.account] = state.default.settings[payload.account] || {}
    state.default.settings[payload.account]['postCount'] = state.default.settings[payload.account]['postCount'] || {}
    state.default.settings[payload.account].postCount = payload.count
  }
}

export const updateLinkColor = (state, payload) => {
  if (typeof state.default.settings[payload.account] !== 'undefined') {
    state.default.settings[payload.account].linkColor = payload.color
  } else {
    state.default.settings[payload.account] = state.default.settings[payload.account] || {}
    state.default.settings[payload.account]['linkColor'] = state.default.settings[payload.account]['linkColor'] || {}
    state.default.settings[payload.account].linkColor = payload.color
  }
}
