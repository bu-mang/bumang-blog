"use client";

// COMPONENTS
import { Input } from "@/components/ui/input";
import { FillButton as Button } from "@/components/common";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormType } from "@/types/schemas";

/**
 * @FORM_WITH_REACT_HOOK_FORM
 */

interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  // 유효하면 Server Action Trigger
  const onSubmit = async (formData: LoginFormType) => {
    document.getElementById("login-submit")?.click();
  };

  return (
    <>
      {/* ID */}
      <label htmlFor="username" className="mb-1 text-sm text-gray-300">
        ID
      </label>
      <Input
        id="username"
        type="email"
        containerClassName="mb-5"
        autoComplete="username"
        placeholder="Email"
        // RHF
        {...register("username")}
        errorHint={errors.username?.message}
        isTouchedField={touchedFields.username}
        // successHint={"Looks Good To Me :)"}
      />

      {/* PASSWORD */}
      <label htmlFor="password" className="mb-1 text-sm text-gray-300">
        Password
      </label>
      <Input
        id="password"
        type="password"
        containerClassName="mb-10"
        autoComplete="current-password"
        placeholder="Password"
        // RHF
        {...register("password")}
        errorHint={errors.password?.message}
        isTouchedField={touchedFields.password}
        // successHint={"It seems over 4 Charaters"}
      />

      {/* SUBMIT BUTTON */}
      <Button onClick={handleSubmit(onSubmit)} className="mb-6 h-12 text-white">
        Login
      </Button>
    </>
  );
};

export default LoginForm;
