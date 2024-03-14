import { Card, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import theme from '../theme';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import { useContext, useRef, useState } from 'react';
import AppContext from '../AppContext';
import Status from './Status';
import { useOutsideClick } from '../hooks';
import { NoteType } from '../models';
import { v4 as uuidv4 } from 'uuid';

export default function InputField() {
  const [type, setType] = useState(NoteType.message);
  const [content, setContent] = useState('');
  const { notes, setNotes } = useContext(AppContext);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setIsFocused(false));

  const author = "Andrii Gorbatiuk";
  const target = "Milton Romaguera";

  const now = new Date();
  const addNote = () => {
    const note = {
      timestamp: now.toString(),
      type,
      content,
      author,
      target,
      id: uuidv4()
    }

    setNotes([...notes, note]);
    setContent('');
  }

  return (
    <Box sx={styles.wrapper}>
      <Status />
      <Card sx={styles.container}
        ref={wrapperRef}
        onFocus={() => setIsFocused(true)}
        data-testid="card"
      >
        <TextField
          multiline
          minRows={isFocused ? 3 : 1}
          placeholder={`Add a note about ${target}`}
          sx={styles.textField}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {isFocused && <Box sx={styles.footer}>
          <Box sx={styles.icons}>
            <IconButton
              data-testid="btn-message"
              size="small"
              sx={styles.icon(type === NoteType.message)}
              onClick={() => setType(NoteType.message)}
            >
              <ChatBubbleIcon fontSize="small" />
            </IconButton>
            <IconButton
              data-testid="btn-phone"
              size="small"
              sx={styles.icon(type === NoteType.phone)}
              onClick={() => setType(NoteType.phone)}
            >
              <PhoneIcon fontSize="small" />
            </IconButton>
            <IconButton
              data-testid="btn-coffee"
              size="small"
              sx={styles.icon(type === NoteType.coffee)}
              onClick={() => setType(NoteType.coffee)}
            >
              <LocalCafeIcon fontSize="small" />
            </IconButton>
            <IconButton
              data-testid="btn-beer"
              size="small"
              sx={styles.icon(type === NoteType.beer)}
              onClick={() => setType(NoteType.beer)}
            >
              <SportsBarIcon fontSize="small" />
            </IconButton>
            <IconButton
              data-testid="btn-meetingNote"
              size="small"
              sx={styles.icon(type === NoteType.meetingNote)}
              onClick={() => setType(NoteType.meetingNote)}
            >
              <PersonIcon fontSize="small" />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            color="success"
            size="small"
            sx={styles.button}
            onClick={addNote}
            data-testid="btn-submit"
          >Submit</Button>
        </Box>}
      </Card>
    </Box>
  );
}

const styles = {
  wrapper: { display: "flex", gap: "30px" },
  container: {
    padding: "15px",
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: "1"
  },
  textField: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
    '& .MuiInputBase-root': {
      '&.Mui-focused': {
        '& fieldset': {
          borderColor: theme.palette.success.main
        },
      },
    },
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icons: {
    gap: "6px",
    display: "flex"
  },
  icon(isActive: boolean) {
    return {
      color: isActive ? theme.palette.background.default : theme.palette.grey[400],
      backgroundColor: isActive ? theme.palette.primary.main : theme.palette.background.default,
      border: isActive ? `1px solid ${theme.palette.background.default}` : `1px solid ${theme.palette.grey[400]}`,
      padding: "6px",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
        opacity: isActive ? 0.7 : 1,
        borderColor: theme.palette.primary.main
      }
    };
  },
  button: { color: theme.palette.background.default }
}