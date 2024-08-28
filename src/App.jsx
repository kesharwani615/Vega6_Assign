/* eslint-disable no-unused-vars */
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Input_Display from "./Page/Input_Display";
import Add_Caption from "./Page/Add_Caption";



const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Input_Display />} />
      <Route path="/Add_Caption/:id" element={<Add_Caption />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;