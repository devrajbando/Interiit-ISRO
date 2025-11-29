import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./Pages/Chat.jsx";
import Home from "./Pages/Home.jsx";
import './index.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/chat"
            element={
              <>
                <Chat />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
