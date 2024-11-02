import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/auth.hook";
import { Input, SpButton } from "./index";
import { useSelector } from "react-redux"; // Import useSelector

function LoginForm({ onLogin }) {
  const schema = z.object({
    usernameOrEmail: z
      .string()
      .min(3, "Username or email must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: login, isPending, isError, error } = useLogin();

  const loginUser = async (data) => {
    try {
      const session = await login(data);
      if (session) {
        onLogin(session);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Get the theme from the Redux store
  const theme = useSelector((state) => state.theme.theme);

  // Define background and text color based on the theme
  const themeClasses =
    theme === "dark"
      ? "bg-[#121212] text-gray-200" // Dark mode colors
      : "bg-white text-gray-600"; // Light mode colors

  return (
    <form
      onSubmit={handleSubmit(loginUser)}
      className={`flex flex-col p-4 rounded-lg ${themeClasses}`}
    >
      <Input
        label={"Username/Email"}
        type="text"
        placeholder="johnwick7"
        id={"username"}
        {...register("usernameOrEmail", {
          required: true,
        })}
      />
      {errors.usernameOrEmail && (
        <span className="text-red-500 text-sm">
          {errors.usernameOrEmail.message}
        </span>
      )}
      <Input
        label={"Password"}
        type="password"
        placeholder="*******"
        id={"password"}
        {...register("password", {
          required: true,
        })}
        className="mb-4"
      />
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}
      {/* {isError && <span className="text-red-500 text-sm">{error.message}</span>} */}
      <SpButton type="submit">{isPending ? "Logging In" : "Login"}</SpButton>
    </form>
  );
}

export default LoginForm;
