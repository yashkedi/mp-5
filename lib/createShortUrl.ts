"use server";

import getCollection, { URL_COLLECTION } from "@/db";

export default async function createShortUrl(alias: string, url: string): Promise<{ success: boolean; message: string }> {
    try {
        try {
            new URL(url);
        } catch {
            return { success: false, message: "Invalid URL." };
        }

        const urls = await getCollection(URL_COLLECTION);

        const existing = await urls.findOne({ alias });
        if (existing) {
            return { success: false, message: "Alias already exists." };
        }

        await urls.insertOne({ alias, url });
        return { success: true, message: "Short url created!" };
    } catch (err) {
        console.error("Error creating short url:", err);
        return { success: false, message: "Server error." };
    }
}
