import "./App.css";
import { useState, useEffect } from "react";
import {Route, Routes, useNavigate} from 'react-router-dom'
import * as BookAPI from "../src/BooksAPI";
import SearchPage from "./SearchPage";
import ListBook from "./ListBooks";

function App() {
  return (
    <Routes>
      <Route exact path="/" element = {<ListBook/>} />
      <Route path="/search" element = {<SearchPage/>}/>
    </Routes>
  );
}

export default App;
