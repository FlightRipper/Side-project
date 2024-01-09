import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useAuthContext } from '../hooks/useAuthContext';

const AllMemes = () => {
 const { user } = useAuthContext();
 const [meme, setMeme] = useState([]);
 const [sortByDate, setSortByDate] = useState(false);

 const fetchMemes = async () => {
   try {
     const response = await axios.get('http://localhost:5000/memes/', {
       headers: {
         Authorization: `Bearer ${user.token}`,
       },
     });
     let data = response.data;
     if (sortByDate) {
       data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
     }
     setMeme(data);
     console.log(data);
   } catch (error) {
     console.log(error);
     setMeme(null);
   }
 };

 useEffect(() => {
   fetchMemes();
 }, [sortByDate]);

 return (
   <>
     <div className="DisplayAll-Container-Main bg-dark">
       <div className="DisplayAll-Title">All Memes</div>
       <button className="Filter-latest" onClick={() => setSortByDate(!sortByDate)}>Filter By Latest</button>
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
