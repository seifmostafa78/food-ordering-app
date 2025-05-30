"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "@/constants/enums";
import { Category } from "@/generated/prisma";
import { Translations } from "@/types/translations";
import { useParams } from "next/navigation";

function SelectCategory({
  categories,
  translations,
  categoryId,
  setCategoryId,
}: {
  categories: Category[];
  translations: Translations;
  categoryId: string | undefined;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { locale } = useParams();
  return (
    <>
      <Label htmlFor="categoryId" className="capitalize text-black block mb-3">
        {translations.category}
      </Label>
      <Select
        name="categoryId"
        defaultValue={categoryId}
        onValueChange={(value) => {
          setCategoryId(value);
        }}
      >
        <SelectTrigger
          className={`w-48 h-10 bg-gray-100 border-none mb-4 focus:ring-0 ${
            locale === Languages.ARABIC ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent className="bg-transparent border-none z-50">
          <SelectGroup className="bg-background text-accent z-50">
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectCategory;
