import React, { useState } from "react";
import { useAddTweet } from "../../hooks/tweet.hook";
import { useSelector } from "react-redux";
import LoginPopup from "../LoginPopup";

function TweetInput() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const theme = useSelector((state) => state.theme.theme); // Get the current theme
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [tweet, setTweet] = useState("");

  const { mutateAsync: addTweet, isPending } = useAddTweet();

  const sendTweet = async () => {
    if (!authStatus) {
      return setShowLoginPopup(true);
    }
    await addTweet({ tweet });
    setTweet("");
  };

  if (showLoginPopup)
    return (
      <LoginPopup
        loginTo={"write Tweet"}
        onClose={() => setShowLoginPopup(false)}
      />
    );

  return (
    <div
      className={`w-full mt-3 ${
        theme === "dark" ? "bg-[#121212]" : "bg-white"
      }`}
    >
      <textarea
        className={`w-full p-2 border rounded-lg border-slate-300 ${
          theme === "dark"
            ? "bg-[#121212] text-gray-200"
            : "bg-transparent text-gray-800"
        }`}
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
      ></textarea>
      <button
        className={`bg-[#00bcd4] hover:bg-[#00bcd4] text-white font-bold py-2 px-4 rounded ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={sendTweet}
        disabled={isPending} // Disable button while pending
      >
        Send
      </button>
    </div>
  );
}

export default TweetInput;
