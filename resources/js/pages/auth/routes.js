const Login = () => import(/* webpackChunkName: "auth-login" */ './Login.vue')
const ForgottenPassword = () => import(/* webpackChunkName: "auth-forgotten-password" */ './ForgottenPassword.vue')
const ResetPassword = () => import(/* webpackChunkName: "auth-reset-password" */ './ResetPassword.vue')
// const Register = () => import(/* webpackChunkName: "auth-register" */ './Register.vue')

export default {
    path: '/auth',
    component: {
        name: 'AuthParent',
        template: '<router-view></router-view>'
    },
    children: [
        {
            path: '',
            name: 'auth.login',
            meta: {
                layout: 'Basic',
                middleware: 'guest',
            },
            component: Login
        },
        // {
        //     path: 'register',
        //     name: 'auth.register',
        //     meta: {
        //         layout: 'Basic',
        //         middleware: 'guest',
        //     },
        //     component: Register
        // },
        {
            path: 'forgotten-password',
            name: 'auth.forgotten_password',
            meta: {
                layout: 'Basic',
                middleware: 'guest',
            },
            component: ForgottenPassword
        },
        {
            path: 'reset-password/:token/:email',
            name: 'auth.reset_password',
            meta: {
                layout: 'Basic',
                middleware: 'guest',
            },
            component: ResetPassword
        }
    ]
}