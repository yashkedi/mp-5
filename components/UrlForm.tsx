"use client";
import { useState } from "react";
import createShortUrl from "@/lib/createShortUrl";

export default function UrlForm() {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [result, setResult] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setResult("Processing...");

        const res = await createShortUrl(alias, url);
        if (res.success) {
            setResult(`${window.location.origin}/r/${alias}`);
            setAlias("");
            setUrl("");
        } else {
            setResult(res.message);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
        >
            <div className="text-center mb-6">
                <h1 className="text-4xl font-semibold mb-2">CS391 URL Shortener</h1>
                <p className="text-sm text-purple-200">Share cleaner links with your own custom alias.</p>
            </div>
            <input
                type="text"
                placeholder="Full URL (e.g. https://example.com/very/long/url)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="border border-purple-300 rounded-md p-2 text-white"
                required
            />
            <input
                type="text"
                placeholder="Alias (e.g. my-url)"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="border border-purple-300 rounded-md p-2 text-white"
                required
            />
            <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-400 transition"
            >
                Create Short Link
            </button>

            {result && (
                <p className="text-center mt-3 text-sm break-all">
                    {result.startsWith("http") ? (
                        <a href={result} target="_blank" className="text-purple-200 underline">
                            {result}
                        </a>
                    ) : (
                        <span className="text-red-600">{result}</span>
                    )}
                </p>
            )}
        </form>
    );
}
