import store from '../store'

export default async (to, from, next) => {
    if (!store.getters['auth/isLogin']) {
        next({name: 'auth.login'})
    }
    else {
        next()
    }
}