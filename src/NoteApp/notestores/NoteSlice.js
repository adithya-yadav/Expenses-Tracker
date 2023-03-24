import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    noteDetails: "",
  },
  reducers: {
    createNote(state, action) {
      if(action.payload.body === ""){
        let undefinedBodyNote = action.payload
        undefinedBodyNote.body = "undefined"
        state.notes.push(undefinedBodyNote)
      }else{
        state.notes.push(action.payload);
      }
    },
    showNoteInDetail(state, action) {
      state.noteDetails = action.payload;
    },
    updateNote(state, action) {
      var ind = state.notes.findIndex(note=>note.id === action.payload.id);
      state.notes[ind].title = action.payload.title;
      state.notes[ind].body = action.payload.body;
      state.notes[ind].date = action.payload.date;

    },
    deleteNote(state,action){
      var ind = state.notes.findIndex(note=>note.id === action.payload)
      state.notes.splice(ind,1)
    }
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;
