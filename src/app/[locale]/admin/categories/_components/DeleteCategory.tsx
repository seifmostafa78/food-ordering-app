"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { deleteCategory } from "../_actions/category";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";
import { Translations } from "@/types/translations";
import Loader from "@/components/ui/Loader";

type StateType = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

function DeleteCategory({
  translations,
  id,
}: {
  translations: Translations;
  id: string;
}) {
  const { locale } = useParams();
  const [state, setState] = useState<StateType>({
    isLoading: false,
    message: "",
    status: null,
  });

  const handleDelete = async () => {
    try {
      setState((prev) => {
        return { ...prev, isLoading: true };
      });
      const res = await deleteCategory(id);
      setState((prev) => {
        return { ...prev, message: res.message, status: res.status };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => {
        return { ...prev, isLoading: false };
      });
    }
  };

  useEffect(() => {
    if (state.message) {
      toast(state.message, {
        style: {
          color: state.status === 200 ? "#4ade80" : "#ef4444",
        },
      });
    }
  }, [state.status, state.message]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader
          className={locale === Languages.ARABIC ? "!text-right" : "!text-left"}
        >
          <DialogTitle>
            {translations.admin.categories.deleteCategory.title}
          </DialogTitle>
          <DialogDescription>
            {translations.admin.categories.deleteCategory.desc}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h2 className="text-lg font-bold">
            {translations.admin.categories.deleteCategory.warning}
          </h2>
        </div>
        <DialogFooter>
          <Button onClick={handleDelete} disabled={state.isLoading}>
            {state.isLoading ? <Loader /> : translations.delete}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCategory;
