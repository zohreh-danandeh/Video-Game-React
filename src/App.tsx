
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowGames from "./ShowGames";
import EditGames from "./EditGames";
import { Container } from "react-bootstrap";

function App() {

    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/" element={<ShowGames />} />
                    <Route path="/edit/:id?" element={<EditGames />} />
                </Routes>
            </Container>
        </Router>
  )
}

export default App
