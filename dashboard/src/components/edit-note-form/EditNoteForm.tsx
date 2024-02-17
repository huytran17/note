"use client";

import { useRootDispatch } from "@/hooks/redux";
import noteActions from "@/store/note/actions/actions";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./edit-note-form.module.css";
import { useRouter } from "next/navigation";

export default function EditNoteForm({ data }: { data: INote }) {
  const dispatch = useRootDispatch();
  const [note, setNote] = useState(data);
  const router = useRouter();
  const dragableRef = useRef(null);
  const dropzoneRef = useRef(null);

  const updateNoteData = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const path = event.currentTarget.name;
    const value = event.currentTarget.value;

    const noteData = { ...note, [path]: value };
    setNote(noteData);
  };

  const submit = async (event) => {
    event.preventDefault();
    await dispatch(noteActions.UPDATE_NOTE(note));
  };

  const backToPrevPage = () => {
    router.back();
  };

  const onDrop = (event) => {
    if (!dragableRef.current) {
      return;
    }

    dragableRef.current.style.top = event.pageY + "px";
    dragableRef.current.style.left = event.pageX + "px";
  };

  dropzoneRef.current?.addEventListener("drop", onDrop);

  dropzoneRef.current?.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  dragableRef.current?.addEventListener("dragstart", (event) => {});

  dragableRef.current?.addEventListener("mousedown", (event) => {
    if (event.target.getAttribute("id") !== "dragzone") {
      return dropzoneRef.current?.removeEventListener("drop", onDrop);
    }

    dropzoneRef.current?.addEventListener("drop", onDrop);
  });

  useEffect(() => {
    return () => {
      dropzoneRef.current?.removeEventListener("drop", onDrop);
    };
  });

  return (
    <div ref={dropzoneRef} className={styles["dropzone"]}>
      <div
        ref={dragableRef}
        className={styles["form-edit-note-wrapper"]}
        draggable
      >
        <div id="dragzone" className={styles["dragzone"]}></div>
        <div className={styles["close-icon"]} onClick={backToPrevPage}></div>
        <div className={styles["form-edit-note"]}>
          <form>
            <div className={styles["form-row"]}>
              <div className={styles["form-group"]}>
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  type="text"
                  value={note.title}
                  onInput={updateNoteData}
                />
              </div>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["form-group"]}>
                <label htmlFor="content">Content</label>
                <textarea
                  name="content"
                  rows={10}
                  value={note.content}
                  onInput={updateNoteData}
                ></textarea>
              </div>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["form-action-button"]}>
                <button onClick={submit}>Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
