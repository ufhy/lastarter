import store from '../store'

export default async (to, from, next) => {
  if (!store.getters['auth/isLogin']) {
    try {
      await store.dispatch('auth/fetchUser')
    } catch (e) { }
  }
  next()
}
