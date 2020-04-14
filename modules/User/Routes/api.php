<?php

use Illuminate\Support\Facades\Route;

Route::post('auth/logout', 'Auth\ApiLoginController@logout');

Route::prefix('auth')->middleware('guest:api')->group(function() {
    Route::post('login', 'Auth\ApiLoginController@login');
    Route::post('request-password', 'Auth\ApiForgotPasswordController@sendResetLinkEmail');
    Route::post('reset-password', 'Auth\ApiResetPasswordController@reset');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user/users/form-options', 'ApiUserController@formOptions');
    Route::resource('user/users', 'ApiUserController');

    Route::get('user/roles/form-options', 'ApiRoleController@formOptions');
    Route::resource('user/roles', 'ApiRoleController');


    Route::resource('user/permissions', 'ApiPermissionController');
});
