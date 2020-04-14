import Auth from '../pages/auth/routes'
import Home from '../pages/home/routes'
import Profile from '../pages/profile/routes'
import User from '../pages/user/routes'

export default [
    {
        path: '/',
        redirect: '/home'
    },
    Auth,
    Home,
    Profile,
    User
]