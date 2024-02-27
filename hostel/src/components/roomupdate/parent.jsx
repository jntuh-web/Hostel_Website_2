import React, { useState } from 'react';
import axios from 'axios';
import './roomupdt.css';
import RoomUpdate from './roomupdt'; // Import the RoomUpdate 

const ParentComponent = () => {
    // Example room data
    const existingRoomData = {
        _id: '', // Assuming you have the room ID
        room_id: '',
        block_name: '',
        allocated_number: '',
        max_capacity: ''
    };

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleUpdateClick = () => {
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    return (
        <div>
            {/* Button to trigger the update modal */}
            <button className='newbtn' onClick={handleUpdateClick}>Update Room</button>
            {/* Render the RoomUpdate component with props */}
            {showUpdateModal &&
                <RoomUpdate
                    onClose={handleCloseUpdateModal}
                    existingRoomData={existingRoomData}
                />
            }
        </div>
    );
};

export default ParentComponent;




