<?php

namespace App\Providers;

use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\ServiceProvider;

class ResponseMacroServiceProvider extends ServiceProvider
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
        ResponseFactory::macro('jsonNotFound', function($message = '') {
            return response([
                'message' => empty($message) ? trans('messages.request_empty') : $message
            ], 404)->header('Content-Type', 'application/json');
        });

        ResponseFactory::macro('jsonSavingResult', function($success = true, $title = '', $row = []) {
            return response([
                'message' => $success
                    ? trans('messages.saving_success', ['title' => $title])
                    : trans('messages.saving_failed'),
                'row' => $success ? $row : []
            ], $success ? 200 : 500)->header('Content-Type', 'application/json');
        });

        ResponseFactory::macro('jsonDeletingResult', function($title = '') {
            return response([
                'message' => trans('messages.delete_success', ['title' => $title])
            ])->header('Content-Type', 'application/json');
        });
    }
}
