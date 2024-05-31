import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"; 
import { toast } from "react-hot-toast";
import { STATUS } from "../../../app/constants";
import { sentResetEmail } from "../resetPasswordAPI";

function SendResetMail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    
  const [status,setStatus] = useState(STATUS.IDEAL)
  
  const onSubmit = async (data) => {

    setStatus(STATUS.LOADING);
    const res = await sentResetEmail(data); 

    if(res.success === true){
      setStatus(STATUS.IDEAL);
      toast.success(res.message);
    }else{
      setStatus(STATUS.ERROR);
      toast.error(res.message);
    }
  };

  return (
    <> 
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <img
              className="mx-auto h-20 w-20"
              src={require("../../../images/download.webp")}
              alt="Your Company"
            />
          </Link>
          <h2
            className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 `}
          >
            Enter your e-mail to reset password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                      message: "Email is not Valid",
                    },
                  })}
                  id="email"
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
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
                {status === STATUS.LOADING ? "Sending password reset mail" : "Reset password "}
              </button>
            </div>
          </form>
 
        </div>
      </div>
    </>
  )
}

export default SendResetMail