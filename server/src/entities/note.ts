import INote from "../interfaces/note";

export default class Note implements INote {
  public readonly _id: string;
  public readonly title: string;
  public readonly content: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor({ _id, title, content, created_at, updated_at }: INote) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
