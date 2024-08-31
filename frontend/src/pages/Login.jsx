import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Logo, SpButton } from "../components/index.js";
import { useLogin } from "../hooks/user.hook.js";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../features/authSlice.js";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const schema = z.object({
        usernameOrEmail: z
          .string()
          .min(1, "Username or email is required")
          .refine((value) => {
            // Check if the value is a valid email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(value) || value.length >= 4;
          }, {
            message: "Enter a valid email or username (minimum 4 characters)",
          })
          .refine((value) => {
            // Check if username has no spaces and is all lowercase
            if (value.includes("@")) return true; // Skip email validation for username checks
            return !value.includes(" ") && value === value.toLowerCase();
          }, {
            message: "Username must be all lowercase and contain no spaces",
          }),
        password: z.string().min(6, "Password must be at least 6 characters long"),
      });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: login, isPending, isError, error } = useLogin();

  const loginUser = async (data) => {
    
    const session = await login(data);
    if(session){
      dispatch(setUser(session));
      navigate("/");
    }
    if (error) {
      toast.error(error)
    };
    

};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-center mb-6">
        <Logo className="w-24 h-auto" />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <p className="text-center mb-4 text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Signup
        </Link>
      </p>
      <form onSubmit={handleSubmit(loginUser)} className="space-y-4">
        <div>
          <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Username/Email*
          </label>
          <Input
            type="text"
            id="usernameOrEmail"
            placeholder="johnwick7 or johnwick@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("usernameOrEmail")}
          />
          {errors.usernameOrEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.usernameOrEmail.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password*
          </label>
          <Input
            type="password"
            id="password"
            placeholder="*******"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          
        <SpButton type="submit">
            {isPending ? "Logging In" : "Login"}
          </SpButton>



          
        </div>
      </form>
    </div>
  </div>
  );
}

export default Login;