<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission as PermissionModel;
use Spatie\Permission\Models\Role as RoleModel;
use Yajra\DataTables\DataTables;

class ApiRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $this->middleware('permission:user.roles.read');
        $this->middleware('permission:user.roles.create', ['only' => ['store']]);
        $this->middleware('permission:user.roles.edit', ['only' => ['update']]);
        $this->middleware('permission:user.roles.delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $model = RoleModel::query();
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
            'permissions' => ['required']
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

        $fn_create = function() use ($request)
        {
            try
            {
                $role = RoleModel::create([
                    'name' => $request->input('name'),
                    'guard_name' => $request->input('guard_name')
                ]);
                $role->syncPermissions($request->input('permissions'));

                return response()->json([
                    'message' => 'Success created',
                    'row' => $role
                ]);
            }
            catch(\Exception $e)
            {
                DB::rollBack();
                \Illuminate\Support\Facades\Log::error($e);
                return response()->json(['message'=>'Unable to create'], 400);
            }
        };

        $return = DB::transaction($fn_create);
        return $return;
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $role = RoleModel::with('permissions:id,name')
            ->find($id);
        
        return response()->json($role);
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

        $role = RoleModel::find($id);
        if (!$role) {
            return response()->json([
                'message' => 'Role not found'
            ], 404);
        }

        $role->name = $request->input('name');
        $role->guard_name = $request->input('guard_name');
        $role->syncPermissions($request->input('permissions'));

        $role->save();

        return response()->json([
            'message' => 'Changes saved',
            'row' => $role
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
        RoleModel::destroy($ids);

        return response()->json([
            'message' => 'Success deleted',
        ]);
    }

    /**
     * Display options needed form
     * @return Response
     */
    public function formOptions()
    {
        $permissions = PermissionModel::select(['id','name'])
            ->get();

        return response()->json([
            'permissions' => $permissions
        ]);
    }
}
