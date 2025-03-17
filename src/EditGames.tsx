/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation,useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

interface VideoGame {
    id?: number;
    title: string;
    genre: string;
    releaseYear: number;
}



function EditGames() {
    const { id } = useParams();
    const gameId = id ? parseInt(id, 10) : undefined; // Convert id to number
    const navigate = useNavigate();
    const location = useLocation();  // Retrieve passed state

  
    // Set initial state with passed game data or default values
    const [game, setGame] = useState<VideoGame>(
        location.state?.game || { title: "", genre: "", releaseYear: new Date().getFullYear() }
    );


    const [error] = useState<string | null>(null);

    useEffect(() => {
        console.log("URL id:", id, "Converted id:", gameId); // Debugging
        if (!location.state?.game && gameId) {
            axios.get(`http://localhost:7025/api/videogames/${gameId}`)
                .then((response) => {
                    if (!response.data || response.data.length === 0) {
                        alert("No data received!");
                    } else {
                        console.log("Data Received:", response.data);
                        alert("Data received successfully!");
                        setGame(response.data);
                    }

                })
                .catch((error) => {
                    console.error("Error fetching games:", error);
                    alert("Error fetching data: " + error.message);
                });
        }
    }, [gameId, location.state?.game]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGame(prev => ({
            ...prev,
            [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value.trim()
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting game data:", game);

        try {
            if (gameId)
            {
                await axios.put(`https://localhost:7025/api/VideoGames/${gameId}`, game);
            }
            else
            {
                await axios.post("https://localhost:7025/api/VideoGames", game);

            }
            navigate("/");}
        catch (error: any) {
            if (error.response) {
                console.error("Validation Errors:", error.response.data.errors);
            } else {
                console.error("Error saving game:", error.message);
            }
            }
    };
 

    return (
        <Container>
            <h1>{id? "Edit Game" : "Add New Game"}</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                        type="number"
                        name="Id"
                        value={game.id}
                        onChange={handleChange}
                        disabled  
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={game.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        type="text"
                        name="genre"
                        value={game.genre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Release Year</Form.Label>
                    <Form.Control
                        type="number"
                        name="releaseYear"
                        value={game.releaseYear}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="success">Save</Button>
            </Form>
        </Container>
    );
}

export default EditGames;