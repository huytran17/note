import makeNoteFs from "./make-note-fs";

const noteFs = makeNoteFs({
  filePath: `${process.env.ROOT_PATH}/${process.env.FILE_NAME}`,
});

export { noteFs };
