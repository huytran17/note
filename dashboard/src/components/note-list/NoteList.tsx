"use client";

import NoteCard from "../note-card/NoteCard";
import styles from "./note-list.module.css";

export default function Notelist({ data }: { data: INote[] }) {
  return (
    <div className={styles["note-list"]}>
      {data.map((note) => (
        <NoteCard data={note} key={note._id} />
      ))}
    </div>
  );
}
