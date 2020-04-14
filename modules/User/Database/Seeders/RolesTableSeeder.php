<?php

namespace Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission as PermissionModel;
use Spatie\Permission\Models\Role as RoleModel;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
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
            'user.permissions.delete',
        ];
        foreach ($permissions as $permission) {
            PermissionModel::create([
                'name' => $permission,
                'guard_name' => 'web'
            ]);
        }

        $defaultRole = RoleModel::create([
            'name' => 'default-user',
            'guard_name' => 'web'
        ]);
        $defaultRole->syncPermissions([
            'user.users.read','user.roles.read','user.permissions.read',
        ]);

        $adminRole = RoleModel::create([
            'name' => 'super-admin',
            'guard_name' => 'web'
        ]);
        $adminRole->syncPermissions([
            'user.users.read','user.users.create','user.users.edit','user.users.delete',
            'user.roles.read','user.roles.create','user.roles.edit','user.roles.delete',
            'user.permissions.read','user.permissions.create','user.permissions.edit','user.permissions.delete',
        ]);
    }
}
