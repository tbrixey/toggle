import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/LikeDislike.module.css";

export const LikeDislikeButtons = ({
  gif,
}: {
  gif: {
    images: { fixed_height: { url: string }; downsized: { url: string } };
  };
}) => {
  const [gifCounts, setGifCounts] =
    useState<{ url: string; likes: number; dislikes: number }>();

  useEffect(() => {
    axios
      .post("/api/gif/count", {
        url: gif.images.fixed_height.url,
      })
      .then((gifCount) => {
        setGifCounts(gifCount.data);
      });
  }, [gif]);

  const likeGif = () => {
    axios
      .post("/api/gif/update-like", {
        url: gif?.images.fixed_height.url,
      })
      .then((res) => {
        setGifCounts(res.data);
      });
  };

  const dislikeGif = () => {
    axios
      .post("/api/gif/update-dislike", {
        url: gif?.images.fixed_height.url,
      })
      .then((res) => {
        setGifCounts(res.data);
      });
  };

  return (
    <div className={styles.likeDislikeContainer}>
      <span onClick={likeGif}>({gifCounts?.likes || 0}) like</span>
      <span onClick={dislikeGif}>({gifCounts?.dislikes || 0}) dislike</span>
    </div>
  );
};
