import { TripForm } from "../components/TripForm"
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from "../config/firebase"
import { useState } from "react"
import DisplaySchedule from "../components/DisplaySchedule"
import axios from "axios";

export const Main = () => {
    const [user] = useAuthState(auth)
    const userid = auth.currentUser?.uid
    const [generatedSchedule, setGeneratedSchedule] = useState('')
    const [tripDetails, setTripDetails] = useState('');
    const [tripData, setTripData] = useState('');
    const [saveButtonStatus, setSaveButtonStatus] = useState('Save Schedule');

    const handleTripData = (tripData, generatedSchedule) => {
        setTripData(tripData);
        setGeneratedSchedule(generatedSchedule);
    }

    const handleSaveSchedule = async () => {
        try {
            const response = await axios.post('https://git.heroku.com/floating-sands-23715.git/add-schedules', 
                {
                    schedule_text: generatedSchedule,
                    trip_info: tripData.prompt,
                    preferences: tripData.preferences
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'User-ID': userid
                    }
                },
            );
            if (response.data && response.data.message) {
                setSaveButtonStatus('Schedule Saved!');
                console.log("Schedule saved!")
            } else {
                console.error("Invalid response data format:", response.data);
            }
        }
        catch (error) {
        console.error("Error saving schedule:", error);
    }
}  
    return (
        <>
        <div>
            <TripForm setGeneratedSchedule={setGeneratedSchedule} setTripDetails={setTripDetails} saveButtonStatus={saveButtonStatus} tripDetails={tripDetails} handleTripData={handleTripData}/>
            <p>Tip: Add your preferences to generate the perfect schedule</p>
            <p>Refresh and click the Generate button again if the schedule doesn't display properly</p>
            <p>Login to save schedules!</p>
            

            {generatedSchedule && (
                <div>
                    <h2>Generated Schedule:</h2>
                    <DisplaySchedule generatedSchedule={generatedSchedule}/>
                </div>
            )}
        </div>
        <div>
            {user && generatedSchedule && (
                <button onClick={() => handleSaveSchedule(tripDetails, generatedSchedule)} className="save-button" type="submit" disabled={saveButtonStatus === 'Schedule Saved!'}>
                    {saveButtonStatus}
                </button>
            )}
        </div>
        </>
    )

}

 