import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import PersonIcon from '@mui/icons-material/Person';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import theme from "../theme";
import { useFormatTimestamp } from "../hooks";
import { NoteType } from '../models';

type Props = {
  timestamp?: string;
  type?: NoteType;
}

export default function Status({ timestamp, type }: Props) {
  const formatTimestamp = useFormatTimestamp();

  const statusIcon = {
    [NoteType.message]: <ChatBubbleIcon fontSize="small" sx={styles.icon}/>,
    [NoteType.phone]: <PhoneIcon fontSize="small" sx={styles.icon} />,
    [NoteType.coffee]: <LocalCafeIcon fontSize="small" sx={styles.icon} />,
    [NoteType.beer]: <SportsBarIcon fontSize="small" sx={styles.icon} />,
    [NoteType.meetingNote]: <PersonIcon fontSize="small" sx={styles.icon} />
  };

  const definedStatus = <>
    <Typography sx={styles.timestamp}>{formatTimestamp(timestamp as string)}</Typography>
    {statusIcon[type as NoteType]}
  </>

  const undefinedStatus = <FormatListBulletedIcon fontSize="small" sx={styles.icon} />;

  return (
    <Box sx={styles.wrapper}>
      { type ? definedStatus : undefinedStatus }
    </Box>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: "20px",
    justifyContent: "flex-end",
    paddingTop: "15px",
    width: "100px"
  },
  icon: {
    borderRadius: "50%",
    color: theme.palette.grey[500],
    border: `2px solid ${theme.palette.grey[300]}`,
    padding: "7px",
    backgroundColor: theme.palette.background.default
  },
  timestamp: {
    marginTop: "7px",
    textAlign: "right"
  }
}