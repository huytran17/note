"use client";

import { useRootDispatch } from "@/hooks/redux";
import noteActions from "@/store/note/actions/actions";
import { useEffect, useState } from "react";
import Notelist from "@/components/note-list/NoteList";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function ListNotes() {
  const dispatch = useRootDispatch();
  const [notes, setNotes] = useState([]);
  const router = useRouter();

  const backToHome = () => router.push("/");

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await dispatch(noteActions.GET_ALL_NOTES());
      setNotes(data.data);
    };

    fetchNotes();
  }, []);

  return (
    <div className={styles["note-list"]}>
      <div className={styles["home"]}>
        <button onClick={backToHome}>Home</button>
      </div>
      <Notelist data={notes} />
    </div>
  );
}
