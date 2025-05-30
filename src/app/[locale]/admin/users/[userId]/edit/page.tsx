import EditUserForm from "@/components/edit-user-form";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { getUsers } from "@/server/db/users";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const users = await getUsers();
  return users.map((user) => ({ userId: user.id }));
}

async function EditUserPage({
  params,
}: {
  params: Promise<{ locale: Locale; userId: string }>;
}) {
  const { locale, userId } = await params;
  const translations = await getTrans(locale);
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <EditUserForm translations={translations} user={user} />
        </div>
      </section>
    </main>
  );
}

export default EditUserPage;
