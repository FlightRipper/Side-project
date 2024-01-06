import { React, useState, useEffect} from "react";
import "./admin.css";
import { useAuthContext } from '../hooks/useAuthContext';
import jwt_decode from 'jwt-decode';
import Card from "./CardAdmin";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AdminPage = () => {

    const { user } = useAuthContext();
    const token = user.token; // Get the token from the user object
    const decodedToken = jwt_decode(token);
    // console.log(decodedToken);
    const userId = decodedToken.id
    const [updatedDescription, setUpdatedDescription] = useState([]);
    const [updatedImage, setUpdatedImage] = useState([]);
    // console.log(userId);
    const [meme, setMeme] = useState([]);
    const [show, setShow] = useState(false);
    const handleDelete = (deletedMemeId) => {
        setMeme(prevMeme => prevMeme.filter(meme => meme.id !== deletedMemeId));
    };

    const handleDescriptionCreate = (event) => {
        setUpdatedDescription(event.target.value);
    };
      
    const handleImageCreate = (event) => {
        setUpdatedImage(event.target.files[0]);
    };

    // const handleUpdate = async () => {}

    const handleUpdate = async (updatedMemeId) => {
        const fetchMemes = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/memes/${userId}`,{
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              });
            // console.log(userId)
            const data = response.data;
            setMeme(data);
            } catch (error) {
            console.log(error);
            setMeme(null);
            }
        };
        fetchMemes();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', updatedDescription);
        formData.append('image', updatedImage);
        try {
            const response = await axios.post(
              `http://localhost:5000/memes/${decodedToken.id}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
            console.log(response);
            setShow(false);
        } catch (error) {
            console.log(error);
            setShow(true);
        }

        const fetchMemes = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/memes/${userId}`,{
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              });
            // console.log(userId)
            const data = response.data;
            setMeme(data);
            } catch (error) {
            console.log(error);
            setMeme(null);
            }
        };
        fetchMemes();
    };

    useEffect(() => {
        const fetchMemes = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/memes/${userId}`,{
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              });
            // console.log(userId)
            const data = response.data;
            setMeme(data);
            } catch (error) {
            console.log(error);
            setMeme(null);
            }
        };
        fetchMemes();
    }, [userId]);

    return(
        <>
            <div className="admin-Main">
                <div className="Dashboard-outside d-flex flex-column align-items-center justify-content-center">
                    <div className="DisplayAll-Title">Your Memes</div>
                    <button className="admin-Main-Create" onClick={() => setShow(true)}>Create</button>
                    <div className="DisplayAllAdmin-Cards-Container">
                    {meme && meme.length > 0 ? (
                        meme.map((meme) => (
                        <Card
                            key={meme.id}
                            image={`http://localhost:5000/uploads/${meme.image}`}
                            description={meme.description}
                            memeId={meme.id}
                            user = {user}
                            onDelete={() => handleDelete(meme.id)}
                            onUpdate={() => handleUpdate(meme.id)}
                        />
                        ))
                    ) : (
                        <p className="DisplayAll-Title">No memes available</p>
                    )}
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Create Meme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit} >
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter description"
                    required = {true}
                    onChange={handleDescriptionCreate}
                    />
                </Form.Group>
                <Form.Group controlId="formImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                    type="file"
                    placeholder="Enter image"
                    required = {true}
                    onChange={handleImageCreate}
                    />
                </Form.Group>
                <Button variant="primary mt-3" className="SubmitButton" type="submit">
                    Submit
                </Button>
                </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdminPage