"use client";

import { FormEvent, useState } from "react";
import styles from "./create-note-form.module.css";
import noteActions from "@/store/note/actions/actions";
import { useRootDispatch } from "@/hooks/redux";
import { useRouter } from "next/navigation";

export default function CreateNoteForm() {
  const [data, setData] = useState({});
  const dispatch = useRootDispatch();
  const router = useRouter();

  const backToHome = () => router.push("/");

  const updateNoteData = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const path = event?.currentTarget?.name;
    const value = event?.currentTarget?.value;

    const noteData = { ...data, [path]: value };
    setData(noteData);
  };

  const submit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await dispatch(noteActions.CREATE_NOTE(data));
    router.push("/list");
  };

  return (
    <div className={styles["form-create-note-wrapper"]}>
      <div className={styles["menubar"]}></div>
      <div className={styles["close-icon"]} onClick={backToHome}></div>
      <div className={styles["form-create-note"]}>
        <form>
          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="title">Title</label>
              <input name="title" type="text" onInput={updateNoteData} />
            </div>
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="content">Content</label>
              <textarea
                name="content"
                cols={150}
                rows={10}
                onInput={updateNoteData}
              ></textarea>
            </div>
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-action-button"]}>
              <button onClick={submit}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
