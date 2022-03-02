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

const Home: NextPage = () => {
  const seconds = useRef(8);
  const { data: session } = useSession();
  const [dbUser, setDbUser] = useState<{ coins: number; email: string }>();
  const [gif, setGif] =
    useState<{ images: { fixed_height: { url: string } } }>();
  const [toggleState, setToggleState] = useState(false);

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
        `https://api.giphy.com/v1/gifs/${giphy.type}?api_key=${giphy.apiKey}&tag=${giphy.tag}&type=${giphy.type}`
      )
      .then((gif) => {
        console.log("GIF", gif.data.data);
        setGif(gif.data.data);
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
                <img src={gif.images.fixed_height.url} alt="Gif" />
              </div>
            )}
            <span>{dbUser?.coins} coins</span>
            <TheToggle
              checked={toggleState}
              handleCheck={getImage}
              handleComplete={toggle}
              toggleTime={seconds.current * 1000}
            />
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
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
