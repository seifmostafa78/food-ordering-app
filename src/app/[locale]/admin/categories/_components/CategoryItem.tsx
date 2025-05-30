import { Category } from "@/generated/prisma";
import EditCategory from "./EditCategory";
import getTrans from "@/lib/translation";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import DeleteCategory from "./DeleteCategory";

async function CategoryItem({ category }: { category: Category }) {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  return (
    <li className="flex justify-between bg-gray-200 p-4 rounded-md">
      <h3 className="text-gray-800 font-medium text-lg flex-1">
        {category.name}
      </h3>
      <div className="flex items-center gap-2">
        <EditCategory translations={translations} category={category}/>
        <DeleteCategory translations={translations} id={category.id}/>
      </div>
    </li>
  );
}

export default CategoryItem;
