import makeCreateDirIfNotExists from "./make-create-dir-if-not-exists";

const createDirIfNotExists = makeCreateDirIfNotExists({
  filePath: `${process.env.ROOT_PATH}/${process.env.FILE_NAME}`,
});

export { createDirIfNotExists };
