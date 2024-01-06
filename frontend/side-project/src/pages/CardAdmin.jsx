import {React, useState } from "react";
import "./CardAdmin.css";
import "./custom.scss";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Card = ({ image, description, memeId, user, onDelete, onUpdate }) => {
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedImage, setUpdatedImage] = useState(image);
  const [show, setShow] = useState(false);
  const [didUpdate, SetdidUpdate] = useState(false);

  const [meme, setMeme] = useState({
    description: updatedDescription,
    image: updatedImage
  });

  const handleDescriptionChange = (event) => {
    setUpdatedDescription(event.target.value);
  };
  
  const handleImageChange = (event) => {
    setUpdatedImage(event.target.files[0]);
    SetdidUpdate(true)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('description', updatedDescription);

    if (didUpdate) {
      formData.append('image', updatedImage);
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/memes/${memeId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      onUpdate();
      console.log(response.data);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  const ondelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/memes/${memeId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <>
      <div className="card mb-3" key={memeId}>
        <div className="card__img__container">
          <img className="card__img" src={image}></img>
        </div>  
        <div className="card__descr-wrapper">
          <p className="card__title">
          {description}
        </p>
        <div className="card__buttons">
          <button className="button-Update" onClick={() => setShow(true)}> Update </button>
          <button className="button-Delete" onClick = {() => { onDelete(); ondelete(); }}> Delete </button>
        </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Meme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit} >
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={updatedDescription}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter image"
              onChange={handleImageChange}
            />
          </Form.Group>
          <Button variant="primary mt-3" className="SubmitButton" type="submit">
            Submit
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Card;