export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')

    if (loggedIn && !app.store.loggedIn)
      app.store.commit('SET_USER_DATA', JSON.parse(loggedIn)) // persist user until logout

    if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
      next('/login')
    } else next()
  })
}
