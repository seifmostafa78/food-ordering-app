"use client";

import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { signup } from "@/server/_actions/auth";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { ValidationErrors } from "@/validations/auth";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
  formData?: FormData | null;
} = {
  message: "",
  error: {},
  status: null,
  formData: null,
};

function Form({ translations }: { translations: Translations }) {
  const { locale } = useParams();
  const router = useRouter();
  const [state, action, pending] = useActionState(signup, initialState);
  const { getFormFields } = useFormFields({
    slug: Pages.Register,
    translations,
  });
  useEffect(() => {
    if (state.status && state.message) {
      toast(state.message, {
        style: {
          color: state.status === 201 ? "#4ade80" : "#ef4444",
        },
      });
    }
    if (state.status === 201) {
      router.replace(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
    }
  }, [locale, router, state.status, state.message]);
  return (
    <form action={action}>
      {getFormFields().map((field: IFormField) => {
        const fieldValue = state.formData?.get(field.name) as string;
        return (
          <div key={field.name} className="mb-3">
            <FormFields
              {...field}
              error={state.error}
              defaultValue={fieldValue}
            />
          </div>
        );
      })}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? <Loader /> : translations.auth.register.submit}
      </Button>
    </form>
  );
}

export default Form;
