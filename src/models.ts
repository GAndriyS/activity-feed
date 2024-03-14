import { SxProps } from "@mui/system";

export type Styles = { [key: string]: SxProps };

export type Note = {
  timestamp: string;
  author: string;
  target: string;
  type: NoteType;
  content: string;
  id: string;
}

export enum NoteType {
  message = "message",
  phone = "phone",
  coffee = "coffee",
  beer = "beer",
  meetingNote = "meetingNote",
}