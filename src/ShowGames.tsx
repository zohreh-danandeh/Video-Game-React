import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

interface VideoGame {
    id: number;
    title: string;
    genre: string;
    releaseYear: number;
}

function ShowGames() {
    const [games, setGames] = useState<VideoGame[]>([]);

    useEffect(() => {
        axios.get("https://localhost:7025/api/VideoGames")
            .then((response) => {
                if (!response.data || response.data.length === 0) {
                    alert("No data received!");
                } else {
                    console.log("Data Received:", response.data);
                    alert("Data received successfully!");
                    setGames(response.data);
                }

            })
            .catch((error) => {
                console.error("Error fetching games:", error);
                alert("Error fetching data: " + error.message);
            });
    }, []);

    const handleDelete = async (id: number) => {
        await axios.delete(`https://localhost:7025/api/VideoGames/${id}`);
        setGames(games.filter(game => game.id !== id));
    };



    if (!games) return "No post!"


    return (
        <div>
            <h1>Video Games List</h1>
            <Link to="/edit" className="btn btn-primary mb-3" style={{ marginBottom: "20px" }}>Add New  </Link>

            <Table style={{ borderSpacing: "15px" }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Release Year</th>
                        <th> Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.id }</td>
                            <td>{game.title}</td>
                            <td>{game.genre}</td>
                            <td>{game.releaseYear}</td>
                            <td>

                                <Link to={`/edit/${game.id}`} state={{ game }} className="btn btn-warning ms-3 mb-3" style={{ marginBottom: "20px" }}>     Edit </Link>    
                                 <Button variant="danger" onClick={() => handleDelete(game.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}



export default ShowGames;