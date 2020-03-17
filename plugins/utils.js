import { mapGetters } from 'vuex'

export const authComputed = {
  ...mapGetters(['isLoggedIn'])
}

export function uuid() {
  return Math.random()
    .toString(16)
    .slice(2)
}

export function saveStatePlugin(store) {
  store.subscribe((mutation, state) => {
    localStorage.setItem('board', JSON.stringify(state.board))
  })
}
