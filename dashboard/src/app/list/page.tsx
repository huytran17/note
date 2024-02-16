"use client";

import { useRootDispatch } from "@/hooks/redux";
import noteActions from "@/store/note/actions/actions";
import { useEffect, useState } from "react";
import Notelist from "@/components/note-list/NoteList";

export default function ListNotes() {
  const dispatch = useRootDispatch();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await dispatch(noteActions.GET_ALL_NOTES());
      setNotes(data.data);
    };

    fetchNotes();
  }, []);

  return <div>{<Notelist data={notes} />}</div>;
}
