import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Logo, SpButton } from "../components/index.js";
import { useLogin } from "../hooks/auth.hook.js";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../features/authSlice.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = z.object({
    usernameOrEmail: z.string().min(3),
    password: z.string().min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: login, isPending, isError, error } = useLogin();

  const loginUser = async (data) => {
    const session = await login(data);
    if (session) {
      dispatch(setUser(session));
      navigate("/");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 bg-[#121212] text-white">
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        <div className="text-center">
          <Logo className="w-full mx-auto text-2xl font-semibold uppercase" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(loginUser)} className="space-y-4">
          <div>
            <label className="font-medium text-white">Username/Email*</label>
            <Input
              type="text"
              placeholder="johnwick7"
              id="username"
              {...register("usernameOrEmail", { required: true })}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium text-white">Password*</label>
            <Input
              type="password"
              placeholder="*******"
              id="password"
              {...register("password", { required: true })}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>

          <SpButton
            type="submit"
            className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            {isPending ? "Logging In" : "Login"}
          </SpButton>
        </form>
      </div>
    </div>
  );
}

export default Login;
