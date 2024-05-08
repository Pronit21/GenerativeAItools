import { useState } from "react";
export default function Home() {
  const [topic, setTopic] = useState("");
  const [mood, setMood] = useState("");
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const generateTweet = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tweet-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, mood }),
      });
      const { tweet } = await response.json();
      setTweet(tweet);
    } catch (error) {
      console.error("Failed to generate tweet:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-96">
        <h1 className="text-3xl font-semibold text-center">AI Tweet Generator</h1>
        <div className="flex flex-col space-y-2">
          <label htmlFor="topic" className="text-lg">
            Topic:
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:r
      ing-blue-400"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="mood" className="text-lg">
            Mood:
          </label>
          <input
            type="text"
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:r
      ing-blue-400"
          />
        </div>
        <button
          onClick={generateTweet}
          className="bg-blue-500 text-white rounded-md py-2 px-4 w-full hover:bg-blue-600
      focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Tweet"}
        </button>
        {tweet && <p className="text-center text-lg font-medium">{tweet}</p>}
      </div>
    </div>
);
}