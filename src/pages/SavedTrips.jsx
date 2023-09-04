import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../config/firebase"
import { useState, useEffect } from "react"
import DisplaySchedule from "../components/DisplaySchedule"
import axios from "axios";


export const SavedTrips = () => {

    const [savedSchedules, setSavedSchedules] = useState([])
    const [user] = useAuthState(auth)
    const userid = auth.currentUser?.uid

    useEffect(() => {
        fetchSchedules();
    }, [user])

    const fetchSchedules = async () => {
        if (user) {
            try {
                const response = await axios.get('https://trip-generator-ae034424eb9d.herokuapp.com/get-schedules', {
                    headers: {
                        'User-ID': userid
                    }
                });
                if (response.data && response.data.schedules) {
                    setSavedSchedules(response.data.schedules);
                } else {
                    console.error("Invalid response data format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        }
    }

    const handleDelete = async (scheduleId) => {
        try {
            const response = await axios.delete(`https://trip-generator-ae034424eb9d.herokuapp.com/delete-schedule/${scheduleId}`, {
            headers: {
                'User-ID': userid
            }
        });
        if (response.status == 200) {
            const updatedSchedules = savedSchedules.filter((schedule) => schedule.id !== scheduleId);
            setSavedSchedules(updatedSchedules);
        } else {
            console.error("Failed to delete schedule")
        }
        } catch (error) {
            console.error("Error deleting schedule:", error);
        }     
    }

    return (
        <div>
            <h2 className="saved-header">Your Saved Trips</h2>
            {savedSchedules.length > 0 ? (
                <ul className="schedule-list">
                    {savedSchedules.map((schedule) => (
                        <li key={schedule.id}>
                            <p className="trip-info">{schedule.trip_info}</p>
                            <p>Preferences: {schedule.preferences}</p>
                            <DisplaySchedule generatedSchedule={schedule.schedule_text}/>
                            <button className="delete-button" onClick={() => handleDelete(schedule.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No saved schedules found.</p>
            )}
        </div>
    )
}
