import React from 'react'
import NavBar from '../navbar/NavBar'
import './room.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from 'axios'
import { useEffect, useState } from 'react';
import SideBar from '../sidebar/SideBar';
import Popup from '../popup/form';
// import RoomUpdate from '../roomupdate/roomupdt';
import ParentComponent from '../roomupdate/parent';
import RoomUpdate from '../roomupdate/roomupdt';
import Deleteform from '../roomdel/delform';
const Room = () => {

    const [roomdata, setRoomdata] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/room/getAllRooms');
                const data = await response.data
                console.log(data)
                if (data) {
                    // Assuming the response data is an array of room details
                    setRoomdata(data.message);
                } else {
                    setError(response.data.message || 'Failed to fetch data');
                }
            } catch (error) {
                setError('Error during data fetching: ' + error.message);
            }
        };

        fetchData();
    }, []);

    const handleDeleteRoomClick = () => {
        setShowDelModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDelModal(false);
    };

    const handleAddRoomClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUpdateRoomClick = (room) => {
        setSelectedRoom(room);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateForm = () => {
        setShowUpdateModal(false);
        setSelectedRoom(null);
    };

    const handleRoomUpdate = async (updatedRoomData) => {
        try {
            // Send updated room data to the backend server
            const response = await axios.put(`http://localhost:5000/room/updateRoom/${selectedRoom._id}`, updatedRoomData);
            console.log('Room updated:', response.data);
            // Close the update form after successful submission
            setShowUpdateModal(false);
            setSelectedRoom(null);
            // Refresh room data
            const refreshedData = await axios.get('http://localhost:5000/room/getAllRooms');
            setRoomdata(refreshedData.data.message);
        } catch (error) {
            console.error('Error updating room:', error.response);
            // Handle error here
        }
    };


    console.log(roomdata)
    return (
        <div className='main'>
            <div><NavBar /></div>
            <SideBar />
            <Deleteform />
            <div className='newroom'>
                <button type="button" className="btn btn-info" onClick={handleAddRoomClick}>Add new Room</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {
                roomdata.length > 0 ? (
                    <div className='header'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Hostel Name</th>
                                    <th>Room</th>
                                    <th>Max Capacity</th>
                                    <th>Allocated</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomdata.map((each, index) => (
                                    <tr key={each.id}>
                                        <td>{index + 1}</td>
                                        <td >{each.block_name}</td>
                                        <td>{each.room_id}</td>
                                        <td>{each.max_capacity}</td>
                                        <td>{each.allocated_number}</td>
                                        <td><button type="button" className="btn btn-info" onClick={() => handleUpdateRoomClick(each)}>Update</button></td>
                                        <td><button type="button" className="btn btn-info" >Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No hostel data available</p>
                )
            }
            {showModal && <Popup onClose={handleCloseModal} />}
            {showUpdateModal && <ParentComponent room={selectedRoom} onClose={handleCloseUpdateForm} onUpdate={handleRoomUpdate} />}
        </div >
    )
}
export default Room