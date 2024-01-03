import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const AllMemes = () => {
    const [meme, setMeme] = useState([]);
    useEffect(() => {
        const fetchMemes = async () => {
            try {
            const response = await axios.get('http://localhost:5000/memes/');
            const data = response.data;
            setMeme(data);
            console.log(data);
            } catch (error) {
            console.log(error);
            setMeme(null);
            }
        };
        fetchMemes();
    }, []);

    return (
        <>
          <div className="DisplayAll-Container-Main bg-dark">
            <div className="DisplayAll-Title">All Memes</div>
            <div className="DisplayAll-Cards-Container">
              {meme && meme.length > 0 ? (
                meme.map((meme) => (
                  <Card
                    key={meme.id}
                    image={`http://localhost:5000/uploads/${meme.image}`}
                    description={meme.description}
                    memeId={meme.id}
                  />
                ))
              ) : (
                <p className="DisplayAll-Title">No memes available</p>
              )}
            </div>
          </div>
        </>
    );
}

export default AllMemes;