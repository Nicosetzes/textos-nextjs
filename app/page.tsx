import styles from "./page.module.css";
import { signOut } from "@/auth";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>Posts:</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>
          <div>Sign Out</div>
        </button>
      </form>
    </main>
  );
}
