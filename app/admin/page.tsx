import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import AdminClient from "./AdminClient";

export const metadata = {
    title: "Admin Panel | Gopal Krishn Sahu",
};

export default async function AdminPage() {
    const supabase = createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/admin/login");
    }

    return <AdminClient />;
}
