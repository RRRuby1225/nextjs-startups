"use client";

import { useState, useActionState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { formSchema } from "@/lib/validation";
import { createPitch } from "@/lib/actions";

import { StartupFormFields } from "./StartupForm/StartupFormFields";
import { StartupPitchEditor } from "./StartupForm/StartupPitchEditor";
import { StartupFormActions } from "./StartupForm/StartupFormActions";

export default function StartupForm() {
  const [pitch, setPitch] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  //提交业务逻辑
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      // 从formData中提取表单值
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch, // Markdown（从状态取）
      };

      // 验证：检查格式
      await formSchema.parseAsync(formValues);
      const result = await createPitch(formData, pitch);

      // 处理成功响应
      if (result.status === "SUCCESS") {
        toast.success("Your startup pitch has been created successfully");
        router.push(`/startup/${result._id}`);
      }
      return result; // 返回结果给React
    } catch (error) {
      // ✅ 错误处理
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        // 在字段下显示错误
        // setErrors更新状态 → React重渲染 → 条件渲染显示<p class="error">
        // as unknown as = TypeScript骗编译器，React不知道
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Please check your inputs and try again");
        // ...prevState管理按钮状态
        // isPending=true = 按钮禁用不闪
        // status="ERROR" = 表单知道出问题
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast.error("An unexpected error has occurred");
      return { ...prevState, error: "An unexpected error", status: "ERROR" };
    }
  };

  //表单状态管理
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    // 初始状态：无错误、未提交
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <StartupFormFields errors={errors} />
      <StartupPitchEditor
        pitch={pitch}
        onPitchChange={setPitch}
        error={errors.pitch}
      />
      <StartupFormActions isPending={isPending} />
    </form>
  );
}
