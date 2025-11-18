import { redirect } from "next/navigation";
import getCollection, { URL_COLLECTION } from "@/db";


export default async function RedirectPage({
                                               params,
                                           }: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;

    const links = await getCollection(URL_COLLECTION);
    const found = await links.findOne({ alias });

    if (!found) {
        redirect("/");
    }

    redirect(found.url);
}