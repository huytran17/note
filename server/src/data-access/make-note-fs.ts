import { appendFile, readFile, writeFile } from "fs/promises";
import Note from "../entities/note";
import INote from "../interfaces/note";
import INoteFs from "./interfaces/note-fs";

export default function makeNoteFs({ filePath }: { filePath: string }) {
  return new (class NoteFs implements INoteFs {
    async findAll(): Promise<INote[]> {
      try {
        const fileContents = await readFile(filePath, { encoding: "utf8" });
        const noteContents: INote[] = JSON.parse(fileContents);

        if (noteContents) {
          return noteContents.map((note) => new Note(note));
        }

        return null;
      } catch (error) {
        console.error(error);
      }
    }

    async findById({ _id }: { _id: string }): Promise<INote> {
      try {
        const noteContents = await this.findAll();

        const note: INote = noteContents.find((note) => note._id === _id);

        if (note) {
          return new Note(note);
        }

        return null;
      } catch (error) {
        console.error(error);
      }
    }

    async insert({
      noteDetails,
    }: {
      noteDetails: Partial<INote>;
    }): Promise<void> {
      try {
        const noteContents = await this.findAll();

        const finalNoteDetails = <INote>{
          ...noteDetails,
          _id: Date.now().toString(),
          created_at: new Date(),
          updated_at: null,
        };

        noteContents.push(finalNoteDetails);

        await writeFile(filePath, JSON.stringify(noteContents), {
          encoding: "utf8",
        });

        return null;
      } catch (error) {
        console.error(error);
      }
    }

    async update({
      noteDetails,
    }: {
      noteDetails: Partial<INote>;
    }): Promise<void> {
      try {
        const noteContents = await this.findAll();

        const note = noteContents.find((note) => note._id === noteDetails._id);

        const noteIndex = noteContents.findIndex(
          (note) => note._id === noteDetails._id
        );

        const finalNoteDetails = {
          ...noteDetails,
          updated_at: new Date(),
        };

        noteContents.splice(noteIndex, 1, {
          ...note,
          ...finalNoteDetails,
        });

        await writeFile(filePath, JSON.stringify(noteContents), {
          encoding: "utf8",
        });
      } catch (error) {
        console.error(error);
      }
    }

    async delete({ _id }: { _id: string }): Promise<void> {
      try {
        const noteContents = await this.findAll();

        const updatedNoteContents = noteContents.filter(
          (note) => note._id !== _id
        );

        await writeFile(filePath, JSON.stringify(updatedNoteContents), {
          encoding: "utf8",
        });
      } catch (error) {
        console.error(error);
      }
    }
  })();
}
