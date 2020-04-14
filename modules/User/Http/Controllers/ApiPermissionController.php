<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Spatie\Permission\Models\Permission as PermissionModel;
use Yajra\DataTables\DataTables;

class ApiPermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $this->middleware('permission:user.permissions.read');
        $this->middleware('permission:user.permissions.create', ['only' => ['store']]);
        $this->middleware('permission:user.permissions.edit', ['only' => ['update']]);
        $this->middleware('permission:user.permissions.delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $model = PermissionModel::query();
        return DataTables::of($model)
            ->toJson();
    }

    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function validateInput(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'guard_name' => ['max:255'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validateInput($request);

        $permission = PermissionModel::create([
            'name' => $request->input('name'),
            'guard_name' => $request->input('guard_name'),
        ]);

        return response()->json([
            'message' => 'Success created',
            'row' => $permission
        ]);
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $permission = PermissionModel::find($id);
        return response()
            ->json($permission);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $this->validateInput($request);

        $permission = PermissionModel::find($id);
        if (!$permission) {
            return response()->json([
                'message' => 'Permission not found'
            ], 404);
        }

        $permission->name = $request->input('name');
        $permission->guard_name = $request->input('guard_name');
        $permission->save();

        return response()->json([
            'message' => 'Changes saved',
            'row' => $permission
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $ids = explode(',', $id);
        PermissionModel::destroy($ids);

        return response()->json([
            'message' => 'Success deleted',
        ]);
    }
}
