import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import MetaTags from "../components/meta";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [dbUser, setDbUser] = useState<{ coins: number; email: string }>();

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

  const toggle = () => {
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <span
            style={{
              color: "#f5d8dd",
            }}
          >
            Toggle
          </span>
        </h1>
        {session?.user && (
          <div>
            <span>
              Logged in as {session.user.email} with {dbUser?.coins}
            </span>
            <button onClick={() => signOut()}>Sign out</button>
            <button onClick={() => toggle()}>TOGGLE</button>
          </div>
        )}
        {!session && <button onClick={() => signIn()}>Sign in</button>}
      </main>
    </div>
  );
};

export default Home;
