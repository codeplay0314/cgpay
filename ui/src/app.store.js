import { writable } from 'svelte/store'

// --------------------------------------------

export const createStore = () => {
  const storeKey = 'cgpay.store'
  const storedState = JSON.parse(window.localStorage.getItem(storeKey))

  // --------------------------------------------

  function getDeviceType() {
    const { userAgent } = window.navigator

    if (/Android/i.test(userAgent)) {
      return 'Android'
    }

    if (/iPhone|iPod|iPad/i.test(userAgent)) {
      return 'Apple'
    }

    return 'Other'
  }

  // --------------------------------------------

  const defaults = {
    auth: {
      account: null,
      token: null
    },

    business: {
      linked: null
    },

    device: {
      type: getDeviceType(),
    },

    homeScreen: {
      skipped: false
    },

    network: {
      offline: null,
      online: null,
      restored: false
    }
  }

  // --------------------------------------------

  let localState = storedState || defaults
  const { set, subscribe, update } = writable(localState)

  // --------------------------------------------

  function storeStateLocally(state) {
    window.localStorage.setItem(storeKey, JSON.stringify(state))
    return state
  }

  // --------------------------------------------

  return {
    subscribe,

    inspect() {
      return localState
    },

    auth: {
      isAuthenticated() {
        return localState.auth.token !== null
      },

      isNotAuthenticated() {
        return localState.auth.token === null
      },

      signIn({ account, token }) {
        update(currentState => {
          const newState = { ...currentState }

          newState.auth.account = account
          newState.auth.token = token

          return storeStateLocally(newState)
        })
      },

      signOut() {
        update(currentState => {
          const newState = { ...currentState }

          newState.auth.account = null
          newState.auth.token = null

          return storeStateLocally(newState)
        })
      }
    },

    business: {
      isLinked() {
        return localState.business.linked !== null
      },

      link(business) {
        update(currentState => {
          const newState = { ...currentState }

          newState.business.linked = business

          return storeStateLocally(newState)
        })
      }
    },

    device: {
      isApple() {
        return localState.device.type === 'Apple'
      },

      isAndroid() {
        return localState.device.type === 'Android'
      }
    },

    homeScreen: {
      promptRequired() {
        const onMobileDevice = [ 'Apple', 'Android' ].includes(localState.device.type)
        const hasNotSkippedPrompt = !localState.homeScreen.skipped

        return onMobileDevice && hasNotSkippedPrompt
      },

      skip() {
        update(currentState => {
          const newState = { ...currentState }

          newState.homeScreen.skipped = new Date()

          return storeStateLocally(newState)
        })
      }
    },

    network: {
      reset() {
        update(currentState => {
          const newState = { ...currentState }

          newState.network.restored = false

          return newState
        })
      },

      setOffline() {
        update(currentState => {
          const newState = { ...currentState }

          newState.network.offline = true
          newState.network.online = false

          return newState
        })
      },

      setOnline() {
        update(currentState => {
          const newState = { ...currentState }

          newState.network.offline = false
          newState.network.online = true

          return newState
        })
      },

      setRestored() {
        update(currentState => {
          const newState = { ...currentState }

          newState.network.offline = false
          newState.network.online = true
          newState.network.restored = true

          return newState
        })
      },
    }
  }
}

// --------------------------------------------

export default createStore()
