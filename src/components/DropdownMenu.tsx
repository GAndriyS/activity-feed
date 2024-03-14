import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { MouseEvent, useState } from "react";
import theme from "../theme";

type Props = {
  onDelete: () => void;
}

export default function DropdownMenu({ onDelete }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    onDelete();
    handleClose();
  }

  return (
    <Box>
      <IconButton size="small" sx={styles.icon} onClick={handleClick}>
        <ArrowDropDownIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={styles.menu}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </ Box>
  );
}

const styles = {
  icon: {
    color: theme.palette.grey[400],
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: "6px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,
      borderColor: theme.palette.primary.main
    }
  },
  button: { color: theme.palette.background.default },
  menu: { zIndex: 3 }
}