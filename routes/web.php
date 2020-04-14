<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth::routes();


Route::get('{path}', function (Request $request) {
    $isLogin = Auth::check();
    $user = $request->user();
    $permissions = [];
    
    if (Auth::check()) {
        foreach ($user->getAllPermissions() as $permission) {
            $permissions[] = $permission->name;
        }
    }

    return view('app', [
        'userInfo' => $isLogin ? [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'last_login' => $user->last_login,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ] : [],
        'permissions' => $permissions
    ]);
})->where('path', '^(?!api).*$');
