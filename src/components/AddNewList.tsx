import { Add, CloseRounded } from "@mui/icons-material";
import { alpha, Button, IconButton, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useBoard } from "../hooks/useBoard";
import { List as ListType } from "../types/types";

interface AddNewListProps {
  boardId: string;
}

const AddNewList = ({ boardId }: AddNewListProps) => {
  const { addList } = useBoard(boardId);
  const [newListTitle, setNewListTitle] = useState("");
  const [isAddingList, setIsAddingList] = useState(false);

  const createList = (title: string) => {
    if (newListTitle.trim()) {
      const newList: ListType = {
        id: Date.now().toString(),
        title,
        createdAt: new Date().toISOString(),
        cards: [],
      };
      addList(newList);
    }
  };

  const handleSubmit = () => {
    if (newListTitle.trim()) {
      createList(newListTitle);
      setNewListTitle("");
    }
  };

  // disable editing
  const handleClose = () => {
    setIsAddingList(false);
    setNewListTitle("");
  };

  // enable editing
  const handleOpen = () => {
    setIsAddingList(true);
    // setTimeout(() => {

    // });
  };

  return isAddingList ? (
    <Paper
      elevation={0}
      sx={{
        minWidth: 250,
        p: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "#ececec" : theme.palette.background.paper,
      }}
    >
      <TextField
        placeholder="Enter list title..."
        variant="outlined"
        color="primary"
        value={newListTitle}
        onChange={(e) => setNewListTitle(e.target.value)}
        size="small"
        margin="dense"
        fullWidth
        autoFocus
      />
      <Button variant="contained" sx={{ mt: 1 }} onClick={handleSubmit}>
        Add list
      </Button>
      <IconButton onClick={handleClose} sx={{ mt: 1 }}>
        <CloseRounded />
      </IconButton>
    </Paper>
  ) : (
    <Paper
      elevation={0}
      sx={{
        minWidth: 250,
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? alpha("#ececec", 0.5)
            : alpha(theme.palette.background.paper, 0.5),
      }}
    >
      <Button
        startIcon={<Add />}
        sx={{
          color: "text.primary",
          justifyContent: "flex-start",
          px: 2,
          py: 1,
        }}
        fullWidth
        onClick={handleOpen}
      >
        Add new list
      </Button>
    </Paper>
  );
};

export default AddNewList;