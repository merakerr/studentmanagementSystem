import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Student from "./Components/Student/Student";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
