import { useContext } from "react";
import AppContext from "../AppContext";
import Box from '@mui/material/Box';
import Activity from "./Activity";
import Status from "./Status";
import { Styles } from "../models";

export default function FeedList() {
  const { notes } = useContext(AppContext);

  return (
    <Box sx={styles.wrapper}>
      {notes.map((note) => (
        <Box key={note.id} sx={styles.note}>
          <Status timestamp={note.timestamp} type={note.type} />
          <Activity note={note} />
        </Box>
      ))}
    </Box>
  );
}

const styles: Styles = {
  wrapper: { display: "flex", gap: "20px", flexDirection: "column" },
  note: { display: "flex", gap: "30px" }
}