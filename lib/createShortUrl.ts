"use server";

import getCollection, { URL_COLLECTION } from "@/db";

const CYCLE_HOSTS = [
    "https://mp-5-sable.vercel.app",
    "http://localhost:3000",
];

export default async function createShortUrl(
    alias: string,
    url: string
): Promise<{ success: boolean; message: string }> {
    try {
        if (!alias || !url) {
            return { success: false, message: "URL or alias is missing." };
        }

        let parsedUrl: URL;
        try {
            parsedUrl = new URL(url);
        } catch {
            return { success: false, message: "Invalid URL." };
        }

        if (CYCLE_HOSTS.some((host) => parsedUrl.href.startsWith(host))) {
            return { success: false, message: "Invalid URL: Cycles are not allowed." };
        }

        if (encodeURIComponent(alias) !== alias) {
            return {
                success: false,
                message: "Invalid alias: You may only use valid URL characters",
            };
        }

        try {
            const res = await fetch(parsedUrl.href);
            if (res.status < 200 || res.status >= 500) {
                console.log("invalid url response", res.status);
                return {
                    success: false,
                    message: `Invalid URL: Bad response ${res.status}`,
                };
            }
        } catch {
            console.log("failed to fetch");
            return {
                success: false,
                message: "Invalid URL: Could not verify URL. Please try again.",
            };
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
