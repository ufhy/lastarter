<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use KgBot\LaravelLocalization\Facades\ExportLocalizations;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        View::composer('app', function($view) {
            $isLogin = Auth::check();

            $user = Auth::user();
            $permissions = [];
            if ($isLogin) {
                foreach ($user->getAllPermissions() as $permission) {
                    $permissions[] = $permission->name;
                }
            }
            return $view->with([
                'userInfo' => $isLogin ? [
                        'id' => $user->id,
                        'username' => $user->username,
                        'email' => $user->email,
                        'last_login' => $user->last_login,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at,
                    ] : [],
                'permissions' => $permissions,
                'langs' => ExportLocalizations::export()->toArray(),
            ]);
        });
    }
}
