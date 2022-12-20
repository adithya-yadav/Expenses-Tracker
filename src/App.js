import Nav from "./components/Nav";
import { ContextProvider } from "./store/ContextApi";


function App() {
  return (
    <>
      <ContextProvider>
          <Nav/>
      </ContextProvider>
    </>
  );
}

export default App;
