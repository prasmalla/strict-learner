export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !app.$fireAuth.currentUser
    ) {
      next('/login')
    } else next()
  })
}
