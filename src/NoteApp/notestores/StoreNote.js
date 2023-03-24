import { configureStore } from "@reduxjs/toolkit";
import noteReducers from "./NoteSlice";

const noteStore = configureStore({
  reducer: {
    notes: noteReducers,
  },
});

export default noteStore;
