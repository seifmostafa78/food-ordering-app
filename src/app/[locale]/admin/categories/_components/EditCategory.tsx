"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Languages } from "@/constants/enums";
import { Category } from "@/generated/prisma";
import { Translations } from "@/types/translations";
import { ValidationErrors } from "@/validations/auth";
import { EditIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { updateCategory } from "../_actions/category";
import Loader from "@/components/ui/Loader";
import { toast } from "sonner";

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

function EditCategory({
  translations,
  category,
}: {
  translations: Translations;
  category: Category;
}) {
  const { locale } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [state, action, pending] = useActionState(
    updateCategory.bind(null, category.id),
    initialState
  );

  useEffect(() => {
    if (state.message) {
      toast(state.message, {
        style: {
          color: state.status === 200 ? "#4ade80" : "#ef4444",
        },
      });
    }
    if (state.status === 200) {
      setOpenDialog(false);
    }
  }, [state.status, state.message]);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader
          className={locale === Languages.ARABIC ? "!text-right" : "!text-left"}
        >
          <DialogTitle>
            {translations.admin.categories.form.editName}
          </DialogTitle>
          <DialogDescription>
            {translations.admin.categories.form.desc}
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="pt-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="category-name">
              {translations.admin.categories.form.name.label}
            </Label>
            <div className="flex-1 relative">
              <Input
                type="text"
                name="categoryName"
                id="category-name"
                defaultValue={category.name}
                placeholder={
                  translations.admin.categories.form.name.placeholder
                }
              />
              {state.error?.categoryName && (
                <p className="text-sm text-destructive absolute top-12">
                  {state.error?.categoryName}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-10">
            <Button type="submit" disabled={pending}>
              {pending ? <Loader /> : translations.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategory;
