import React, { useState } from 'react';
import axios from 'axios';
import './form.css'

const Popup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        data: {
            room_id: '',
            block_name: '',
            allocated_number: '',
            max_capacity: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to your backend server
            const response = await axios.post('http://localhost:5000/room/createNewRoom', formData);
            console.log('Room created:', response.data);
            onClose(); // Close the modal after successful submission
        } catch (error) {
            console.error('Error creating room:', error.response);
            // Handle error here
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className='hd'>Room Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="room_id">Room ID:</label>
                        <input type="text" id="room_id" name="room_id" value={formData.data.room_id} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="block_name">Block Name:</label>
                        <input type="text" id="block_name" name="block_name" value={formData.data.block_name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="allocated_number">Allocated Students:</label>
                        <input type="number" id="allocated_number" name="allocated_number" value={formData.data.allocated_number} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="max_capacity">Max Capacity:</label>
                        <input type="number" id="max_capacity" name="max_capacity" value={formData.data.max_capacity} onChange={handleChange} required />
                    </div>
                    <button className="cb" type="submit">Create Room</button>
                </form>
            </div>
        </div>
    );
};

export default Popup;