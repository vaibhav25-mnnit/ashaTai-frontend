import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form"; 
import { toast } from "react-hot-toast";
import { STATUS } from "../../../app/constants";
import { changePassword } from "../resetPasswordAPI";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = useParams().token;
    const mail = searchParams.get('mail')
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const navigate = useNavigate();
    
        
      const [status,setStatus] = useState(STATUS.IDEAL)
      
      const onSubmit = async (data) => {

        const {confirmPassword,...newData} = data;
        newData.token = token;
        
        setStatus(STATUS.LOADING);
        const res = await changePassword(newData); 
    
        if(res.success === true){
          setStatus(STATUS.IDEAL);
          toast.success(res.message);
          navigate('/login',{replace:true})
        }else{
          setStatus(STATUS.ERROR);
          toast.error(res.message);
        }
      };
    
    return <> 
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
            className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 `}
            >
             Reset Password                                                                      
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    noValidate
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input 
                            id="email"
                            type="email"
                            value={mail}
                            placeholder={mail}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                            caret-color="transparent"
                            />
                        </div>
                        
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Password
                        </label>
                        </div>
                        <div className="mt-2">
                        <input
                            {...register("password", {
                            required: "Password is required",

                            pattern: {
                                value:
                                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                message: "Password does not match below condition's",
                            },
                            })}
                            id="password"
                            type="password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>

                        {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                        )}
                        <p>
                        <b>
                            password must contain
                            <br />
                            - at least 8 characters
                            <br />- must contain at least 1 uppercase letter, 1 lowercase
                            letter, and 1 number
                        </b>
                        </p>
                    </div>
                    {/* Confirm-password */}
                    <div>
                    <div className="flex items-center justify-between">
                        <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                        >
                        Confirm Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value, formValues) =>
                            value === formValues.password || "passwords not matching",
                        })}
                        id="confirPassword"
                        type="password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-red-500">
                        {errors.confirmPassword.message}
                        </span>
                    )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ${
                            status === STATUS.LOADING &&
                            "bg-indigo-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                            }`}
                        >
                            {status === STATUS.LOADING ? "Reseting password" : "Reset Password"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    
    </>;
}

export default ResetPassword;




