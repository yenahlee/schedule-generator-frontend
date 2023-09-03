const formatSchedule = (scheduleText) => {
    
    const startIndex = scheduleText.indexOf('Day 1');
    if (startIndex === -1) {
        return null;
    }

    const formattedText = scheduleText.substring(startIndex);
    const days = formattedText.split('Day');
    const formattedDays = days
        .filter(Boolean)
        .map((day) => day.trim())
        .map((day, index) => {
            const [dayTitle, ...activities] = day.split('\n');
            const editedDayTitle = 'Day ' + dayTitle;
            const filteredActivities = activities.filter(item => item.trim() !== '')
            return (
                <div key={index}>
                    <h3>{editedDayTitle}</h3>
                    <ul className="activity-list">
                        {filteredActivities.map((activity, activityIndex) => (
                            <li key={activityIndex}>{activity}</li>
                        ))}
                    </ul>
                </div>
            )
        })
        return (
            <div>
                {formattedDays}
            </div>
        );
  
};

const DisplaySchedule = ({ generatedSchedule }) => {
    const formattedSchedule = formatSchedule(generatedSchedule);

    return (
        <div>
            {formattedSchedule}
        </div>
    );
};

export default DisplaySchedule;
    


