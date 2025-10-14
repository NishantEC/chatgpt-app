"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const HARDCODED_EMAIL = "admin@example.com";
const HARDCODED_PASSWORD = "password123";
const HARDCODED_TOKEN = "test-bearer-token-12345";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      setShowToken(true);
    } else {
      setError("Invalid email or password");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(HARDCODED_TOKEN);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (showToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Login Successful! 🎉
            </h1>
            <p className="text-gray-600 text-sm">
              Here's your Bearer token for MCP authentication
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Bearer Token
            </label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white px-3 py-2 rounded border border-gray-200 text-sm font-mono break-all">
                {HARDCODED_TOKEN}
              </code>
              <button
                onClick={copyToClipboard}
                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2 text-sm">
              How to use with ChatGPT:
            </h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Copy the token above</li>
              <li>Open ChatGPT and go to Settings</li>
              <li>Navigate to MCP Servers</li>
              <li>Add your MCP server URL</li>
              <li>Paste this token when prompted for authentication</li>
            </ol>
          </div>

          <button
            onClick={() => {
              setShowToken(false);
              setEmail("");
              setPassword("");
            }}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors text-sm font-medium"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            MCP Authentication
          </h1>
          <p className="text-gray-600">
            Login to get your Bearer token
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Test Credentials:</strong>
            <br />
            Email: admin@example.com
            <br />
            Password: password123
          </p>
        </div>
      </div>
    </div>
  );
}

