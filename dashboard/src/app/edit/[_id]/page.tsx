"use client";

import EditNoteForm from "@/components/edit-note-form/EditNoteForm";
import { useRootDispatch } from "@/hooks/redux";
import noteActions from "@/store/note/actions/actions";
import { useEffect, useState } from "react";

export default function EditNote({ params }: { params: { _id: string } }) {
  const dispatch = useRootDispatch();
  const [note, setNote] = useState<INote>();

  useEffect(() => {
    const fetchNote = async () => {
      const res = await dispatch(
        noteActions.GET_NOTE_BY_ID({ _id: params._id })
      );

      setNote(res.data);
    };

    fetchNote();
  }, []);

  return <>{note ? <EditNoteForm data={note} /> : null}</>;
}
