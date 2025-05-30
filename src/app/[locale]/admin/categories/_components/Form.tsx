"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Translations } from "@/types/translations";
import { ValidationErrors } from "@/validations/auth";
import { useActionState, useEffect } from "react";
import { addCategory } from "../_actions/category";
import Loader from "@/components/ui/Loader";
import { toast } from "sonner";

function Form({ translations }: { translations: Translations }) {
  type InitialStateType = {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
  };
  const initialState: InitialStateType = {
    message: "",
    error: {},
    status: null,
  };
  const [state, action, pending] = useActionState(addCategory, initialState);

  useEffect(() => {
    if (state.message) {
      toast(state.message, {
        style: {
          color: state.status === 201 ? "#4ade80" : "#ef4444",
        },
      });
    }
  }, [state.status, state.message]);
  return (
    <form action={action}>
      <div className="space-y-2">
        <Label htmlFor="name">
          {translations.admin.categories.form.name.label}
        </Label>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            name="name"
            id="name"
            placeholder={translations.admin.categories.form.name.placeholder}
          />
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? <Loader /> : translations.create}
          </Button>
        </div>
        {state.error?.name && (
          <p className="text-sm text-destructive">{state.error.name}</p>
        )}
      </div>
    </form>
  );
}

export default Form;
