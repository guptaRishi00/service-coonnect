import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function AiAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ai/getresult`,
        { prompt: prompt }
      );
      setResponse(res.data);
      console.log(res);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Something went wrong. Please try again.");
    }

    setLoading(false);
    setPrompt("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col justify-center">
        <div className="max-w-3xl mx-auto w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Service Connect AI Assistant
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              Powerful, intuitive, and ready to help with whatever you need
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-blue-100"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-purple-100"></div>
            <div className="absolute top-1/2 -right-8 w-8 h-8 rounded-full bg-yellow-100"></div>
            <div className="absolute top-1/2 -left-8 w-8 h-8 rounded-full bg-green-100"></div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 relative z-10">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Describe your Problem
                </h2>
                <p className="text-gray-500">
                  Type your question or request below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="relative">
                <div className="relative rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="I want to create a website for..."
                    className="w-full rounded-xl p-4 pr-16 outline-none resize-none h-24"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-3 bottom-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Display AI Response with enhanced styling */}
              {loading && (
                <div className="mt-6 flex items-center justify-center">
                  <div className="animate-pulse flex space-x-2">
                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="ml-3 text-blue-500 font-medium">
                    Thinking...
                  </span>
                </div>
              )}

              {response && !loading && (
                <div className="mt-6 overflow-hidden">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="ml-2 font-semibold text-gray-700">
                      AI Assistant
                    </span>
                  </div>

                  <div className="p-5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
                    <div className="prose prose-blue max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-blue-100"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-lg font-bold text-gray-800 mt-4 mb-2"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="text-md font-bold text-gray-800 mt-3 mb-1"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="mb-3 text-gray-700" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc pl-5 mb-3 text-gray-700"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol
                              className="list-decimal pl-5 mb-3 text-gray-700"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="mb-1" {...props} />
                          ),
                          a: ({ node, ...props }) => (
                            <a
                              className="text-blue-600 hover:text-blue-800 underline"
                              {...props}
                            />
                          ),
                          blockquote: ({ node, ...props }) => (
                            <blockquote
                              className="border-l-4 border-blue-200 pl-4 italic text-gray-600 my-3"
                              {...props}
                            />
                          ),
                          code: ({ node, inline, ...props }) =>
                            inline ? (
                              <code
                                className="bg-blue-50 text-blue-800 px-1 py-0.5 rounded text-sm font-mono"
                                {...props}
                              />
                            ) : (
                              <div
                                className="bg-gray-800 text-gray-200 p-3 rounded-md my-3 font-mono text-sm overflow-x-auto"
                                {...props}
                              />
                            ),
                        }}
                      >
                        {response}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Features */}
          <div className="mt-16 text-center">
            <div className="flex justify-center space-x-6">
              {[
                {
                  iconColor: "blue",
                  text: "Fast Responses",
                  iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
                },
                {
                  iconColor: "purple",
                  text: "Smart Insights",
                  iconPath:
                    "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                },
                {
                  iconColor: "green",
                  text: "Creative Solutions",
                  iconPath:
                    "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-full bg-${item.iconColor}-50 flex items-center justify-center mb-2`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 text-${item.iconColor}-500`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.iconPath}
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-900">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
