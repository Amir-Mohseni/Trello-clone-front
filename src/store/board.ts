import { reactive, computed } from "vue";
import { removeBoardLists } from "./list";
import {
  initializSocket,
  addBoardForAll,
  removeBoardForAll,
  addedSomeoneToBoard,
  removedSomeoneFromBoard,
} from "@/WebSocket/main";

const Board = reactive({
  AllBoards: [] as Array<any>,
  ActiveBoard: {
    id: "",
    name: "",
    color: "",
    icon: "",
    owner: "",
    members: [],
  },
  loading: true,
});

export const buildActiveBoard = (data: any) => {
  data = JSON.parse(JSON.stringify(data));
  Board.ActiveBoard.id = data._id || "";
  Board.ActiveBoard.name = data.name || "";
  Board.ActiveBoard.color = data.color || "";
  Board.ActiveBoard.icon = data.icon || "programming";
  Board.ActiveBoard.owner = data.owner || "";
  Board.ActiveBoard.members = data.members || 0;
};

export const emptyActiveBoard = () => {
  Board.ActiveBoard.id = "";
  Board.ActiveBoard.name = "";
  Board.ActiveBoard.color = "";
  Board.ActiveBoard.icon = "";
  Board.ActiveBoard.owner = "";
};

// export const loadingBoards = () => (Board.loading = true);

export const buildAllBoards = (data: Array<any>) => {
  Board.AllBoards = data || [];
  Board.loading = false;
  initializSocket();
};

export const emptyAllBoards = () => {
  Board.AllBoards = reactive([]);
};

export const addBoard = (board: any, broadCast: Boolean = true) => {
  console.log("adding a board to store:");
  console.log(board);
  console.log(broadCast);
  Board.AllBoards.push(board);
  if (broadCast) addBoardForAll(board);
};

export const removeBoard = (id: string, broadCast: Boolean = true) => {
  const index = Board.AllBoards.findIndex((board) => board._id === id);
  const removedBoard = Board.AllBoards[index];

  Board.AllBoards.splice(index, 1);
  removeBoardLists(id);

  if (broadCast) removeBoardForAll(id);
  else return removedBoard;
};

export const addMemberToBoard = (member: any) => {
  const id = Board.ActiveBoard.id;
  Board.ActiveBoard.members.push(member);
  const index = Board.AllBoards.findIndex((board) => board._id === id);
  Board.AllBoards[index].members.push(member);
  addedSomeoneToBoard(id, member);
};

export const removeMemberFromBoard = (member: any) => {
  const id = Board.ActiveBoard.id;
  const memberIndex = Board.ActiveBoard.members.findIndex(
    (member) => member._id === member._id
  );
  Board.ActiveBoard.members.splice(memberIndex, 1);
  const index = Board.AllBoards.findIndex((board) => board._id === id);
  Board.AllBoards[index].members.splice(memberIndex, 1);
  removedSomeoneFromBoard(id, member);
};

export const addMemberToBoardWS = (boardName: string, member: any) => {
  const boardIdx = Board.AllBoards.findIndex(
    (board) => board.name === boardName
  );

  Board.AllBoards[boardIdx].members.push(member);

  if (
    Board.ActiveBoard.id.length &&
    Board.AllBoards[boardIdx]._id === Board.ActiveBoard.id
  ) {
    Board.ActiveBoard.members.push(member);
  }
};

export const removeMemberFromBoardWS = (boardName: string, member: any) => {
  const boardIdx = Board.AllBoards.findIndex(
    (board) => board.name === boardName
  );
  const memberIdx = Board.AllBoards[boardIdx].members.findIndex(
    (member: any) => member._id === member._id
  );

  Board.AllBoards[boardIdx].members.splice(memberIdx, 1);

  if (
    Board.ActiveBoard.id.length &&
    Board.AllBoards[boardIdx]._id === Board.ActiveBoard.id
  ) {
    Board.ActiveBoard.members.splice(memberIdx, 1);
  }
};

export const editBoard = (newBoard: any) => {
  const index = Board.AllBoards.findIndex((board) => board._id === newBoard.id);

  Board.AllBoards[index].name = newBoard.name;
  Board.AllBoards[index].color = newBoard.color;
  Board.AllBoards[index].icon = newBoard.icon;
  Board.ActiveBoard.name = newBoard.name;
  Board.ActiveBoard.color = newBoard.color;
  Board.ActiveBoard.icon = newBoard.icon;
};

export const activeBoard = computed(() => Board.ActiveBoard);
export const allBoards = computed(() => Board.AllBoards);
export const isLoading = computed(() => Board.loading);
