import {useState} from 'react'
import axios from 'axios'
import { getAuth } from "firebase/auth";

export const TripForm = ({setGeneratedSchedule, saveButtonStatus, handleTripData}) => {

    const [tripDetails, setTripDetails] = useState("")
    const [preferences, setPreferences] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const auth = getAuth()
    const userid = auth.currentUser?.uid

    const handleSubmit = (e) => {
        e.preventDefault()
        const tripData = {
            prompt: tripDetails,
            preferences: preferences
        };

        setIsGenerating(true);

        axios.post('https://trip-generator-ae034424eb9d.herokuapp.com/generate-trip', tripData, {
            headers: {
                'Content-Type': 'application/json',
                'User-ID': userid
            }
        })
            .then(response => {
                // Check if the response contains the 'generated_schedule' property
                if (response.data && response.data.generated_schedule) {
                    setGeneratedSchedule(response.data.generated_schedule);
                    handleTripData(tripData, response.data.generated_schedule)
                
        
                } else {
                  console.error("Invalid response data format:", response.data);
                }
                setIsGenerating(false);
              })
              .catch(error => {
                console.error("Error sending data to backend:", error);
              });
    }

    
    return (
        <form className="prompt-form" onSubmit={handleSubmit} method="post">
            <label className="form-label" htmlFor="prompt">Enter your destination and duration (up to 4 days)</label>
            <br/>
            <input
                className="prompt-input"
                type="text"
                id="trip-details"
                value={tripDetails}
                onChange={(e) => setTripDetails(e.target.value)}
                placeholder="eg. New York, 3 days"
                required
            />
            <br/>
            <label className="form-label" htmlFor="prompt">Enter your preferences (optional)</label>
            <br/>
            <input
                className="prompt-input"
                type="text"
                id="preferences"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="eg. relaxing, foodie, shopping"
            />
            <br/>
            <button className="generate-button" type="submit" disabled={saveButtonStatus === "Schedule Saved!" || isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Schedule'}
            </button>
        </form>
    )
}

