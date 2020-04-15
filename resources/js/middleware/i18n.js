import store from '~/store'

export default async (to, from, next) => {
  const module = to.meta.module
  if (!module) {
    next()
  } else {
    store.dispatch('localisation/loadI18n', module)
    next()
  }
}
