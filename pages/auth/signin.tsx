import { getProviders, signIn } from "next-auth/react";
import styles from "../../styles/Home.module.css";
import btnStyles from "../../styles/Button.module.css";

export default function SignIn({ providers }: any) {
  return (
    <div className={styles.container}>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name} className={styles.main}>
          <button
            onClick={() => signIn(provider.id)}
            className={btnStyles.button}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
