<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\User;
use App\Models\UserCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    function signUp() 
    {
        return Inertia::render('Auth/SignUp');
    }

    function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|min:2',
            'phone' => 'required|min:10',
            'confirmedPassword' => 'required|min:8',
        ]);

        $credentials = $request->validate([
            'email' => 'required|email:rfc,dns',
            'password' => ['required', 'min:8']
        ]);

        if ($request->password === $request->confirmedPassword) {
            $user = new User();
            $user->name = $request->name;
            $user->user_type = 'client';
            $user->email = $request->email;
            $user->email_verified_at = now();
            $user->phone = $request->phone;
            $user->password = Hash::make($request->password);
            $user->save();
            
            // creat user cart
            $userCart = new UserCart();
            $userCart->user_id = $user->id;
            
            if (Auth::attempt($credentials)) {
                return Inertia::render('Index');
            }
        }
    }

    function editProfil()
    {
        return Inertia::render('Auth/UserProfil');
    }

    function updateProfil(Request $request)
    {
        $request->validate([
            'userName' => 'required|min:2',
            'userFullAddress' => 'required|min:10',
            'userEmail' => 'required|email:rfc,dns',
            'userNum' => 'required|min:10',
        ]);
        
        $currentUser = User::find(Auth::user()->id);
        if (Hash::check($request->userPassWord, $currentUser->password) && $request->userNewPassWord === $request->userConfirmeNewPassWord) {
            $currentUser->password = Hash::make($request->userNewPassWord);
            $currentUser->save();
        }
        
        $udates = array(
            'userName' => $request->userName,
            'userAddress' => $request->userAddress,
            'userEmail' => $request->userEmail,
            'userNum' => $request->userNum,
        );
        $udatesObj = (object) $udates;
        
        $userAddress = Address::where('user_id', Auth::user()->id)->first();
        
        $currentInfo = array(
            'userName' => $currentUser->name,
            'userAddress' => $userAddress->address_line,
            'userEmail' => $currentUser->email,
            'userNum' => $currentUser->phone,
        );
        $currentInfoObj = (object) $currentInfo;
        
        if (isUpdateProfilNecessary($udatesObj, $currentInfoObj)) {
            $currentUser->name = $request->userName;
            $userAddress->address_line = $request->userAddress;
            $currentUser->email = $request->userEmail;
            $currentUser->phone = $request->userNum;
            
            $currentUser->save();
            return redirect()->route("home");
        } else {
            return redirect()->route("home");
        }
    }

    function login()
    {
        return Inertia::render('Auth/Login');
    }

    function loginError()
    {
        return Inertia::render('Auth/Login', [
            "credentialsError" => "Un des identifiant ne correspond pas :/"
        ]);
    }

    function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        Auth::attempt($credentials);
        if (!Auth::attempt($credentials)) {
            return redirect()->route("Login.error");
        } else {
            return redirect()->route("home");
        }
    }

    function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        return redirect()->route("login");
    }
}