const UserIndex = () => import(/* webpackChunkName: "user-users-index" */ './UserIndex.vue')
const UserForm = () => import(/* webpackChunkName: "user-users-form" */ './UserForm.vue')
const UserView = () => import(/* webpackChunkName: "user-users-view" */ './UserView.vue')
const RoleIndex = () => import(/* webpackChunkName: "user-role-index" */ './RoleIndex.vue')
const RoleForm = () => import(/* webpackChunkName: "user-role-form" */ './RoleForm.vue')
const PermissionIndex = () => import(/* webpackChunkName: "user-permission-index" */ './PermissionIndex.vue')
const PermissionForm = () => import(/* webpackChunkName: "user-permission-form" */ './PermissionForm.vue')

export default {
    path: '/user',
    redirect: '/user/users',
    name: 'user',
    meta: {
        middleware: 'permissions',
    },
    component: {
        name: 'Users',
        template: '<router-view></router-view>'
    },
    children: [
        {
            path: 'users',
            name: 'user.users.index',
            meta: {
                middleware: 'permissions',
                permission: 'user.users.read'
            },
            component: UserIndex,
            children: [
                {
                    path: 'create',
                    name: 'user.users.create',
                    meta: {
                        middleware: 'permissions',
                        permission: 'user.users.create'
                    },
                    component: UserForm,
                },
                {
                    path: 'edit/:id',
                    name: 'user.users.edit',
                    meta: {
                        middleware: 'permissions',
                        permission: 'user.users.edit'
                    },
                    component: UserForm,
                },
                {
                    path: 'view/:id',
                    name: 'user.users.view',
                    meta: {
                        middleware: 'permissions',
                        permission: 'user.users.read'
                    },
                    component: UserView,
                }
            ]
        },
        {
            path: 'roles',
            name: 'user.roles.index',
            meta: {
                middleware: 'permissions',
                permission: 'user.roles.read'
            },
            component: RoleIndex,
            children: [
                {
                    path: 'create',
                    name: 'user.roles.create',
                    meta: {
                        middleware: 'permissions',
                        permission: 'user.roles.create'
                    },
                    component: RoleForm,
                },
                {
                    path: 'edit/:id',
                    name: 'user.roles.edit',
                    meta: {
                        middleware: 'permissions',
                        permission: 'user.roles.edit'
                    },
                    component: RoleForm,
                }
            ]
        },
        {
            path: 'permissions',
            name: 'user.permissions.index',
            meta: {
                middleware: 'permissions',
                permission: 'user.permissions.read'
            },
            component: PermissionIndex,
            children: [
                {
                    path: 'create',
                    name: 'user.permissions.create',
                    meta: {
                        middleware: 'permissions',
                        permission: 'user.permissions.create'
                    },
                    component: PermissionForm,
                },
                {
                    path: 'edit/:id',
                    name: 'user.permissions.edit',
                    meta: {
                        middleware: 'permissions',
                        permission: 'user.permissions.edit'
                    },
                    component: PermissionForm,
                }
            ]
        },
    ]
}