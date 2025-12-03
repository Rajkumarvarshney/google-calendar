import React from 'react';
import { useFestivals } from '../hooks/useFestivals';
import { format } from 'date-fns';
import { AiOutlineCalendar } from 'react-icons/ai';

const FestivalsSidebar = () => {
    const { festivals, isLoadingFestivals } = useFestivals();

    if (isLoadingFestivals) {
        return (
            <div className="festivals-sidebar">
                <h3 className="festivals-title">Upcoming Festivals</h3>
                <div className="festivals-loading">Loading...</div>
            </div>
        );
    }

    if (festivals.length === 0) {
        return (
            <div className="festivals-sidebar">
                <h3 className="festivals-title">Upcoming Festivals</h3>
                <div className="festivals-empty">No upcoming festivals</div>
            </div>
        );
    }

    return (
        <div className="festivals-sidebar">
            <h3 className="festivals-title">
                <AiOutlineCalendar /> Upcoming Festivals & Holidays
            </h3>
            <div className="festivals-list">
                {festivals.map((festival) => (
                    <div key={festival.id} className="festival-item">
                        <div className="festival-date">
                            {format(new Date(festival.date), 'MMM d')}
                        </div>
                        <div className="festival-content">
                            <div className="festival-name">{festival.title}</div>
                            {festival.localName && festival.localName !== festival.title && (
                                <div className="festival-local">{festival.localName}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FestivalsSidebar;

