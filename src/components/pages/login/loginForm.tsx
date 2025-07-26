"use client";

// COMPONENTS
import { Input } from "@/components/ui/input";
import { FillButton as Button } from "@/components/common";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormType } from "@/types/schemas";

import { isAxiosError } from "axios";
import { useRouter } from "@/i18n/navigation";
import { postLogin } from "@/services/api/auth/client";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/api/queryKey";
import { useAuthStore } from "@/store/auth";
import { useTranslations } from "next-intl";
import { PATHNAME } from "@/constants/routes";
import { toast } from "react-toastify";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const t = useTranslations("login");
  const queryClient = useQueryClient();

  // 유효하면 Server Action Trigger
  const onSubmit = async (formData: LoginFormType) => {
    try {
      const res = await postLogin(formData);

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.GET_USER_PROFILE,
      });
      // await queryClient.refetchQueries({
      //   queryKey: QUERY_KEY.GET_USER_PROFILE,
      // });

      window.location.href = PATHNAME.HOME; // full reload
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);

        if (error.status === 401) {
          toast.error(t("error.noUser"));

          setError("root", {
            type: "manual",
            message: t("error.noUser"),
          });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ID */}
      <label htmlFor="username" className="text-sm text-gray-300">
        {t("idLabel")}
      </label>
      <Input
        id="username"
        type="email"
        containerClassName="mb-5 mt-1.5"
        autoComplete="username"
        placeholder="Email"
        // RHF
        {...register("username")}
        errorHint={errors.username?.message}
        isTouchedField={touchedFields.username}
        // successHint={"Looks Good To Me :)"}
      />

      {/* PASSWORD */}
      <label htmlFor="password" className="text-sm text-gray-300">
        {t("passwordLabel")}
      </label>
      <Input
        id="password"
        type="password"
        containerClassName="mb-10 mt-1.5"
        autoComplete="current-password"
        placeholder="Password"
        // RHF
        {...register("password")}
        errorHint={errors.password?.message}
        isTouchedField={touchedFields.password}
      />

      {/* SUBMIT BUTTON */}
      <Button onClick={handleSubmit(onSubmit)} className="mb-6 h-12 text-white">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
