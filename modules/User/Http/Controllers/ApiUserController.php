<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\User\Entities\UserModel;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role as RoleModel;

class ApiUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $this->middleware('permission:user.users.read');
        $this->middleware('permission:user.users.create', ['only' => ['store']]);
        $this->middleware('permission:user.users.edit', ['only' => ['update']]);
        $this->middleware('permission:user.users.delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $model = UserModel::select(['id','username','email','email_verified_at','last_login','active','created_at','updated_at']);
        return DataTables::of($model)
            ->setTransformer(function($item) {
                return [
                    'id' => $item->id,
                    'username' => $item->username,
                    'email' => $item->email,
                    'email_verified_at' => $item->email_verified_at,
                    'last_login' => $item->last_login,
                    'active' => (boolean) $item->active,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,
                ];
            })
            ->toJson();
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(with(new UserModel())->getTable(), 'email')],
            'password' => ['required', 'string', 'min:5', 'confirmed'],
            'roles' => ['required'],
        ]);

        $fn_create = function() use ($request)
        {
            try
            {
                $uid = Str::uuid();
                $data = $request->only(['username','email','password', 'active']);
                $user = UserModel::create([
                    'id' => $uid,
                    'username' => $data['username'],
                    'email' => $data['email'],
                    'password' => Hash::make($data['password']),
                    'active' => $data['active']
                ]);
                $user->assignRole($request->input('roles'));

                return response()->jsonSavingResult(true, $user->username, $user);
            }
            catch(\Exception $e)
            {
                DB::rollBack();
                \Illuminate\Support\Facades\Log::error($e);
                return response()->jsonSavingResult(false);
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
        $user = UserModel::with('roles:id,name')->find($id);
        if (!$user) {
            return response()->jsonNotFound();
        }

        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $user = UserModel::find($id);
        if (!$user) {
            return response()->jsonNotFound();
        }

        $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(with(new UserModel())->getTable(), 'email')->ignore($id)],
            'active' => ['required'],
            'roles' => ['required', 'array'],
        ]);
        if ($request->input('change_password')) {
            $request->validate([
                'password' => ['required', 'string', 'min:5', 'confirmed'],
            ]);
        }

        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->active = $request->input('active');
        if ($request->input('change_password')) {
            $user->password = Hash::make($request->input('password'));
        }
        $user->syncRoles($request->input('roles'));
        $user->save();

        return response()->jsonSavingResult(true, $user->username, $user);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $ids = explode(',', $id);
        UserModel::destroy($ids);

        return response()->jsonDeletingResult();
    }

    /**
     * Display options needed form
     * @return Response
     */
    public function formOptions()
    {
        $roles = RoleModel::select(['id','name'])
            ->get();

        return response()->json([
            'roles' => $roles
        ]);
    }
}
