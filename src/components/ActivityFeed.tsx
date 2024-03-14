import Box from "@mui/material/Box";
import { Styles } from "../models";
import theme from "../theme";
import FeedList from "./FeedList";
import InputField  from "./InputField";

export default function ActivityFeed() {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.feed}>
        <InputField />
        <FeedList />
      </Box>
      <Box sx={styles.line}/>
    </Box>
  );
}

const styles: Styles = {
  wrapper: {
    width: "60%",
    padding: "50px",
    position: "relative"
  },
  feed: {
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "relative"
  },
  line: {
    position: "absolute",
    height: "100%",
    width: "1px",
    backgroundColor: theme.palette.grey[300],
    top: 0,
    left: "130px",
    zIndex: 1
  }
}