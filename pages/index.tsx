import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import MetaTags from "../components/meta";

const Home: NextPage = () => {
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
      </main>
    </div>
  );
};

export default Home;
