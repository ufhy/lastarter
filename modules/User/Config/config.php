<?php

return [
    'name' => 'User',
    'sections' => [
        'users' => [
            'name' => ''
        ]
    ],
    'permissions' => [
        'user.users.read',
        'user.users.create',
        'user.users.edit',
        'user.users.delete',
        'user.roles.read',
        'user.roles.create',
        'user.roles.edit',
        'user.roles.delete',
        'user.permissions.read',
        'user.permissions.create',
        'user.permissions.edit',
        'user.permissions.delete'
    ]
];
