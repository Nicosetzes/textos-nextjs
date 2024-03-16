"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default function WriteNewPost() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" placeholder="Title" />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="./plus.svg" alt="" width={16} height={16}></Image>
        </button>
        {open && (
          <div className={styles.add}>
            <button className={styles.addButton}>
              <Image src="./plus.svg" alt="" width={16} height={16}></Image>
            </button>
            <button className={styles.addButton}>
              <Image src="./plus.svg" alt="" width={16} height={16}></Image>
            </button>
            <button className={styles.addButton}>
              <Image src="./plus.svg" alt="" width={16} height={16}></Image>
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Escribe..."
        />
      </div>
      <button className={styles.publish}>Publicar</button>
    </div>
  );
}
