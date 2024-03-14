import { NoteType } from "../models";

export const noteTypeToAction = {
  [NoteType.message]: "added a note to",
  [NoteType.phone]: "had a call with",
  [NoteType.coffee]: "had a coffee with",
  [NoteType.beer]: "had a beer with",
  [NoteType.meetingNote]: "had a meeting with"
}
