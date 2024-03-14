import { createContext } from "react";
import { Note } from "./models";

export interface AppContextModel {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

const AppContext = createContext<AppContextModel>({
  notes: [],
  setNotes: () => {},
});

export default AppContext;