import useLocalStorage from "./useLocalStorage";
import { Board, BoardMetadata } from "../types/types";

export function useBoardsList() {
  const [boards, setBoards] = useLocalStorage<BoardMetadata[]>("boards", []);

  const addBoard = (newBoard: BoardMetadata) => {
    setBoards((prevBoards) => [...prevBoards, newBoard]);
    
    // Create entry for the new board
    try {
      const initialBoardData: Board = {
        ...newBoard,
        lists: [],
      };
      localStorage.setItem(
        `board-${newBoard.id}`,
        JSON.stringify(initialBoardData)
      );
    } catch (error) {
      console.error("Failed to save the board:", error);
    }
  };

  const updateBoard = (id: string, updatedBoard: Partial<BoardMetadata>) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === id ? { ...board, ...updatedBoard } : board
      )
    );
  };

  const deleteBoard = (id: string) => {
    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));

    // Remove the board's detailed state
    try {
      localStorage.removeItem(`board-${id}`);
    } catch (error) {
      console.error("Failed to delete the board:", error);
    }
  };

  return {
    boards,
    addBoard,
    updateBoard,
    deleteBoard,
  };
}