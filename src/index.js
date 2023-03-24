import ReactDOM from "react-dom/client";
import "./index.css";

import App from './App';
import store from './store/StoreIndex';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-bootstrap/dist/react-bootstrap";

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import NoteApp from './NoteApp/NoteApp';
import noteStore from './NoteApp/notestores/StoreNote';

// import TodoApp from "../src/TodoApp/TodoApp";
// import { ContextProvider } from "./TodoApp/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("temp"));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>

  // <Provider store={noteStore}>
  //     <NoteApp/>
  // </Provider>

  // <ContextProvider>
  //   <TodoApp />
  // </ContextProvider>
);
