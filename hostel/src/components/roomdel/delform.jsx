import React from 'react'
import axios from 'axios';
import './delform.css'
import { useState } from 'react';
const Deleteform = () => {

    const [showModal, setShowModal] = useState(false);

    const handleDeleteRoomClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to your backend server
            const response = await axios.delete(`http://localhost:5000/room/deleteRoom${formData.room_id}`);
            console.log('Room deleted:', response.data);
            // Close the modal after successful submission
        } catch (error) {
            console.error('Error deleting room:', error.response);
            // Handle error here
        }
    };

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCloseModal}>&times;</span>
                    <p className='hd'>Do you want to delete?</p>
                    <div className='btn-cont'>
                        <button class='btn-btn-dark' className='delbtn' onSubmit={handleSubmit} onClick={handleDeleteRoomClick}>Delete</button>
                        <button class='btn-btn-dark' className='delbtn' onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deleteform
