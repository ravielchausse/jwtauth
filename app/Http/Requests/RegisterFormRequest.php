<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class RegisterFormRequest extends Request
{
    
    /**
    * Determine if the user is authorized to make this request.
    * @date 24/08/2017
    * @return bool
    */
    public function authorize()
    {
        
        return true;

    }

    /**
    * Get the validation rules that apply to the request.
    * @date 24/08/2017
    * @return array
    */
    public function rules()
    {

        return [

            'name' => 'required',
            
            'email' => 'required|email|unique:users',

            'password' => 'required',

        ];
    }
}
