import defaultBoard from '../plugins/default-board'
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default () => ({
  authUser: null,
  board
})
