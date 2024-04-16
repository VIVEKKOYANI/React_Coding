import { useState } from "react";
import "./App.css";
import { HeartIcon, SpinnerIcon } from "./icons";

function App() {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const handleLikeUnlike = async () => {
    setIsFetching(true);
    setError(null);

    try {
      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: liked ? "unlike" : "like" }),
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setLiked(!liked);
      } else {
        const res = await response.json();
        setError(res.message);
        return;
      }
    } finally {
      setIsFetching(false);
    }

    setLiked(!liked);
  };

  return (
    <div>
      <button
        className={`likeBtn ${liked ? "liked" : ""}`}
        disabled={isFetching}
        onClick={handleLikeUnlike}
      >
        {isFetching ? <SpinnerIcon /> : <HeartIcon />}{" "}
        {liked ? "Liked" : "Like"}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;