import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import theme from "../theme";
import { noteTypeToAction } from "./constants";
import DropdownMenu from "./DropdownMenu";
import { useDeleteNote } from "../hooks";
import { memo, useState } from "react";
import { Note, Styles } from '../models';

type Props = {
  note: Note;
}

const Activity = memo(({ note }: Props) => {
  const { type, content, author, target } = note;
  const [isHovered, setIsHovered] = useState(false);

  const deleteNote = useDeleteNote();

  const userName = "Andrii Gorbatiuk";

  return (
    <Card sx={styles.wrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={styles.card}>
        <Box sx={styles.status}>
          <Typography color="primary" sx={styles.emphasizedText}>{author === userName ? "You" : author}</Typography>
          <Typography>{noteTypeToAction[type]}</Typography>
          <Typography color="primary" sx={styles.emphasizedText}>{target}</Typography>
        </Box>
        <Typography>{content}</Typography>
      </Box>
      {isHovered && <DropdownMenu onDelete={() => deleteNote(note.id)} />}
    </Card >
  )
});

export default Activity;

const styles: Styles = {
  wrapper: {
    padding: "15px",
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flex: 1,
  },
  card: { width: "calc(100% - 50px)" },
  status: { display: "flex", gap: "4px" },
  emphasizedText: { fontWeight: "700" }
}