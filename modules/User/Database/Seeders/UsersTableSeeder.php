<?php

namespace Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Modules\User\Entities\UserModel;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        $password = Hash::make('qwerty');
        $user = UserModel::create([
            'id' => Str::uuid(),
            'username' => 'metallica.one',
            'email' => 'metallica.one@live.com',
            'password' => $password,
            'active' => true
        ]);
        $user->assignRole(['super-admin']);

        for ($i = 0; $i < 50; $i++) { 
            $uid = Str::uuid();
            UserModel::create([
                'id' => $uid,
                'username' => $faker->userName,
                'email' => $faker->email,
                'password' => $password,
                'active' => true
            ]);
        }

    }
}
