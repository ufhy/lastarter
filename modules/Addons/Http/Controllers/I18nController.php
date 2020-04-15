<?php

namespace Modules\Addons\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Lang;

class I18nController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request
     * @return Response
     */
    public function index(Request $request)
    {
        $payload = $request->get('module');
        if ($payload) {
            $langs = Lang::get($payload);
            $modules = explode('::', $payload);

            if (count($modules) === 1) {
                return response()->json([
                    $modules[0] => $langs
                ]);
            } else if (count($modules) === 2) {
                return response()->json([
                    $modules[0] => [
                        $modules[1] => $langs
                    ]
                ]);
            }
        }
    }
}
