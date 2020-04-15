import store from '../store'
import ability from '../plugins/ability/services';

export default (to, from, next) => {
  const permission = to.meta.permission;
  if (store.getters['auth/isLogin'] && ability.can(permission)) {
    next()
  } else {
    alert('You dont have permission to access that page')
    next({ name: 'home' })
  }
}
