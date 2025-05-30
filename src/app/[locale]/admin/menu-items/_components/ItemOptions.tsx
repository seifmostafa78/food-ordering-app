/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Translations } from "@/types/translations";
import {
  Extra,
  ExtraIngredients,
  ProductSizes,
  Size,
} from "@/generated/prisma";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";

export enum ItemOptionsKeys {
  SIZES,
  EXTRAS,
}

const sizesNames = [
  ProductSizes.SMALL,
  ProductSizes.MEDIUM,
  ProductSizes.LARGE,
];

const extrasNames = [
  ExtraIngredients.CHEESE,
  ExtraIngredients.BACON,
  ExtraIngredients.ONION,
  ExtraIngredients.PEPPER,
  ExtraIngredients.TOMATO,
];

function handleOptions(
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>
) {
  const addOption = () => {
    setState((prev: any) => {
      return [...prev, { name: "", price: 0 }];
    });
  };

  const onChange = (
    value: string | number,
    index: number,
    fieldName: string
  ) => {
    const newValue = value;
    setState((prev: any) => {
      const newSizes = [...prev];
      newSizes[index][fieldName] = newValue;
      return newSizes;
    });
  };
  const removeOption = (indexToRemove: number) => {
    setState((prev: any) => {
      return prev.filter((_: any, index: number) => index !== indexToRemove);
    });
  };

  return { addOption, onChange, removeOption };
}

function ItemOptions({
  translations,
  optionKey,
  state,
  setState,
}: {
  translations: Translations;
  optionKey: ItemOptionsKeys;
  state: Partial<Size>[] | Partial<Extra>[];
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
}) {
  const { addOption, onChange, removeOption } = handleOptions(setState);

  const isThereAvailableOptions = () => {
    switch (optionKey) {
      case ItemOptionsKeys.SIZES:
        return sizesNames.length > state.length;
      case ItemOptionsKeys.EXTRAS:
        return extrasNames.length > state.length;
    }
  };
  return (
    <>
      {state.length > 0 && (
        <ul>
          {state.map((item, index) => {
            return (
              <li key={index} className="flex gap-2 mb-2">
                <div className="space-y-1 basis-1/2">
                  <Label>Name</Label>
                  <SelectName
                    onChange={onChange}
                    item={item}
                    index={index}
                    currentState={state}
                    optionKey={optionKey}
                  />
                </div>
                <div className="space-y-1 basis-1/2">
                  <Label>ExtraPrice</Label>
                  <Input
                    type="number"
                    name="price"
                    placeholder="0"
                    min={0}
                    value={item.price}
                    onChange={(e) =>
                      onChange(Number(e.target.value), index, "price")
                    }
                    className="bg-white focus:!ring-0"
                  />
                </div>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {isThereAvailableOptions() && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addOption}
        >
          <Plus />
          {optionKey === ItemOptionsKeys.SIZES
            ? translations.admin["menu-items"].addItemSize
            : translations.admin["menu-items"].addExtraItem}
        </Button>
      )}
    </>
  );
}

export default ItemOptions;

const SelectName = ({
  onChange,
  item,
  index,
  currentState,
  optionKey,
}: {
  onChange: (value: string | number, index: number, fieldName: string) => void;
  item: Partial<Size> | Partial<Extra>;
  index: number;
  currentState: Partial<Size>[] | Partial<Extra>[];
  optionKey: ItemOptionsKeys;
}) => {
  const { locale } = useParams();
  const getNames = () => {
    switch (optionKey) {
      case ItemOptionsKeys.SIZES:
        const filteredSizes = sizesNames.filter(
          (size) => !currentState.some((s) => s.name === size)
        );
        return filteredSizes;
      case ItemOptionsKeys.EXTRAS:
        const filteredExtras = extrasNames.filter(
          (extra) => !currentState.some((e) => e.name === extra)
        );
        return filteredExtras;
    }
  };
  const names = getNames();
  return (
    <Select
      defaultValue={item.name ? item.name : "select..."}
      onValueChange={(value) => onChange(value, index, "name")}
    >
      <SelectTrigger
        className={`bg-white border-none mb-4 focus:ring-0 ${
          locale === Languages.ARABIC ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <SelectValue>{item.name ? item.name : "select..."}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white border-none z-50">
        <SelectGroup className="bg-background text-accent z-50">
          {names.map((name, index) => (
            <SelectItem
              key={index}
              value={name}
              className="hover:!bg-primary hover:!text-white !text-accent !bg-transparent"
            >
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
