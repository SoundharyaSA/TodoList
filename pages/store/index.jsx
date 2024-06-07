import { atom } from "recoil";

export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const filterState = atom({
  key: "filterState",
  default: "all",
});