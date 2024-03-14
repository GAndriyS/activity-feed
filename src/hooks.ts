import AppContext from "./AppContext";
import { MutableRefObject, useContext, useEffect, useState } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { Note } from "./models";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("applicationNotes");
    const parsed = saved && JSON.parse(saved) as Note[];
    const sorted = parsed && parsed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return sorted || [];
  });

  const updateNotes = (notes: Note[]) => {
    const sorted = notes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    localStorage.setItem("applicationNotes", JSON.stringify(sorted));
    setNotes(sorted);
  }

  return [notes, updateNotes] as const;
}

export function useDeleteNote() {
  const { notes, setNotes } = useContext(AppContext);

  return (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  }
}

export function useFormatTimestamp() {
  return (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const now = new Date();

    const diffDays = differenceInDays(now, date);
    if (diffDays > 0) return `${diffDays}d`;

    const diffHours = differenceInHours(now, date);
    if (diffHours > 0) return `${diffHours}hr`;

    const diffMinutes = differenceInMinutes(now, date);
    if (diffMinutes > 0) return `${diffMinutes}min`;

    return "Now";
  }
}

export function useOutsideClick(ref: MutableRefObject<any>, onOutsideClick: () => void) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
}