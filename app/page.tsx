import UrlForm from "@/components/UrlForm";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center h-screen bg-pink-200 text-purple-100">
        <div className="w-full max-w-lg bg-purple-950 p-6 rounded-2xl shadow-xl">
          <UrlForm />
        </div>
      </main>
  );
}
