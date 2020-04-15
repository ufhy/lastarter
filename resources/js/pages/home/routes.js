const Home = () => import(/* webpackChunkName: "home" */ './Home.vue')

export default {
    path: '/home',
    name: 'home',
    meta: {
        middleware: ['auth'],
    },
    component: Home,
}