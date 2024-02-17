"use client";

import { useRouter } from "next/navigation";
import styles from "./note-card.module.css";

export default function NoteCard({ data }: { data: INote }) {
  const router = useRouter();

  const editNote = (_id: string) => router.push(`/edit/${_id}`);

  return (
    <div className={styles["note-card-wrapper"]}>
      <div className={styles["note-card"]} onClick={() => editNote(data._id)}>
        <h2 className={styles["note-title"]}>
          <span>{data.title}</span>
        </h2>
        <div className={styles["note-content"]}>
          <span>{data.content}</span>
        </div>
      </div>
    </div>
  );
}
