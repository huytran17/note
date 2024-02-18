"use client";

import { useRootDispatch } from "@/hooks/redux";
import noteActions from "@/store/note/actions/actions";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import styles from "./edit-note-form.module.css";

export default function EditNoteForm({ data }: { data: INote }) {
  const dispatch = useRootDispatch();
  const [note, setNote] = useState(data);
  const [mousePosition, setMousePosition] = useState({ x: 0 });
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

    const dragableWidth = dragableRef.current.offsetWidth;

    let positionX = event.pageX;
    if (mousePosition.x < dragableWidth / 2) {
      positionX = event.pageX + (dragableWidth / 2 - mousePosition.x);
    } else if (mousePosition.x > dragableWidth / 2) {
      positionX = event.pageX - (mousePosition.x - dragableWidth / 2);
    }

    dragableRef.current.style.top = event.pageY + "px";
    dragableRef.current.style.left = positionX + "px";
  };

  const onDragOver = (event) => event.preventDefault();
  const onDragStart = () => {};
  const onMouseDown = (event) =>
    setMousePosition({ x: event.nativeEvent.offsetX });

  return (
    <div
      ref={dropzoneRef}
      className={styles["dropzone"]}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div
        ref={dragableRef}
        className={styles["form-edit-note-wrapper"]}
        draggable
        onDragStart={onDragStart}
        onMouseDown={onMouseDown}
      >
        <div className={styles["menubar"]}></div>
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
