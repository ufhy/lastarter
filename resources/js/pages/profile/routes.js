const Profile = () => import(/* webpackChunkName: "profile" */ './Profile.vue')

export default {
    path: '/profile',
    name: 'profile',
    meta: {
        middleware: 'auth'
    },
    component: Profile,
}