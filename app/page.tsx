import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex flex-col gap-4 text-center sm:text-left">
          <h1 className="text-4xl font-black tracking-tight">
            ChatGPT Apps SDK
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Next.js Starter with Modular Widget Architecture
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Available Widgets</h2>
            <div className="space-y-2">
              <Link 
                href="/widgets/show-content" 
                className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <h3 className="font-medium">Show Content Widget</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Display homepage content with user name
                </p>
              </Link>
              <Link 
                href="/widgets/show-profile" 
                className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <h3 className="font-medium">Show Profile Widget</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Display authenticated user's profile information
                </p>
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Development</h2>
            <div className="space-y-2">
              <Link
                href="/mcp"
                className="block p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="font-medium">MCP Server Endpoint</span>
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                  /mcp
                </span>
              </Link>
              <Link
                href="/custom-page"
                className="block p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="font-medium">Demo Page</span>
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                  /custom-page
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            href="https://vercel.com/templates/ai/chatgpt-app-with-next-js"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Deploy on Vercel
          </a>
        </div>
      </main>
    </div>
  );
}
