import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import btnStyles from "../styles/Button.module.css";
import MetaTags from "../components/meta";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TheToggle from "../components/theToggle";
import { NewCategory } from "../components/newCategory";
import { categoryDBList } from "../lib/categories";
import { isMobile } from "react-device-detect";

const Home: NextPage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seconds = useRef(8);
  const [gifCounts, setGifCounts] =
    useState<{ url: string; likes: number; dislikes: number }>();
  const { data: session } = useSession();
  const [dbUser, setDbUser] =
    useState<{ coins: number; email: string; categories: any }>();
  const [gif, setGif] = useState<{
    images: { fixed_height: { url: string }; downsized: { url: string } };
  }>();
  const [toggleState, setToggleState] = useState(false);
  const [enabledCategory, setEnabledCategory] = useState("funny");

  useEffect(() => {
    if (session?.user) {
      axios
        .post("/api/user/coins", {
          email: session.user.email,
          name: session.user.name,
        })
        .then((res) => {
          setDbUser(res.data);
        });
    }
  }, [session]);

  const getImage = async () => {
    setToggleState(true);
    const giphy = {
      baseURL: "https://api.giphy.com/v1/gifs/",
      apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
      tag: "fail",
      type: "random",
      rating: "pg",
    };
    await axios
      .get(
        `https://api.giphy.com/v1/gifs/${giphy.type}?api_key=${giphy.apiKey}&tag=${enabledCategory}`
      )
      .then(async (gif) => {
        axios
          .post("/api/gif/count", {
            url: gif.data.data.images.fixed_height.url,
          })
          .then((gifCount) => {
            setGifCounts(gifCount.data);
            setGif(gif.data.data);
          });
      });
  };

  const toggle = () => {
    setToggleState(false);
    setGif(undefined);
    if (dbUser) {
      axios
        .post("/api/user/update-coin", {
          email: dbUser.email,
        })
        .then((res) => {
          setDbUser(res.data);
        });
    }
  };

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

  const purchaseCategory = (cost: number, categoryToPurchase: string) => {
    if (dbUser && dbUser.coins >= cost) {
      const newCategories = { ...dbUser?.categories, [categoryToPurchase]: 1 };
      axios
        .post("/api/user/purchase-category", {
          email: dbUser?.email,
          cost,
          categories: newCategories,
        })
        .then((res) => {
          setDbUser(res.data);
          setEnabledCategory(categoryToPurchase);
        });
    } else {
      alert("NOT ENOUGH COINS! TOGGLE BABY!");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Toggle</title>
        <MetaTags />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {session?.user && (
          <div className={styles.flexColStnd}>
            {gif && (
              <div>
                <div className={styles.likeDislikeContainer}>
                  <span onClick={likeGif}>({gifCounts?.likes || 0}) like</span>
                  <span onClick={dislikeGif}>
                    ({gifCounts?.dislikes || 0}) dislike
                  </span>
                </div>
                <img
                  src={
                    isMobile
                      ? gif.images.fixed_height.url
                      : gif.images.downsized.url
                  }
                  alt="Gif"
                />
              </div>
            )}
            <span>{dbUser?.coins} coins</span>
            <TheToggle
              checked={toggleState}
              handleCheck={getImage}
              handleComplete={toggle}
              toggleTime={seconds.current * 1000}
            />
            <div className={styles.categoryContainer}>
              {dbUser &&
                categoryDBList &&
                categoryDBList.map(({ category, cost }) => {
                  let purchased = false;
                  Object.keys(dbUser?.categories).forEach((key) => {
                    if (key === category) purchased = true;
                  });
                  return (
                    <NewCategory
                      key={category}
                      category={category}
                      cost={purchased ? 0 : cost}
                      enabled={category === enabledCategory}
                      disabled={toggleState}
                      onClick={() => {
                        if (purchased) {
                          setEnabledCategory(category);
                        } else {
                          purchaseCategory(cost, category);
                        }
                      }}
                    />
                  );
                })}
            </div>
            <button
              onClick={() => signOut()}
              className={btnStyles.button}
              style={{ bottom: 20, position: "absolute" }}
            >
              Sign Out
            </button>
          </div>
        )}
        {!session && (
          <div className={styles.imageContainer}>
            <Image
              src={"/togglelogo.svg"}
              width={256}
              height={128}
              layout={"responsive"}
              alt="Toggle Logo image"
            />
            <button onClick={() => signIn()} className={btnStyles.button}>
              Sign in
            </button>
            <audio
              controls
              ref={audioRef}
              src={"/rick.mp3"}
              style={{ width: "90%", top: 50, position: "relative" }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
