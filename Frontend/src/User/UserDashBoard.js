import React, { useState ,useEffect} from 'react';
import SearchFlight from './SearchFlight';
import FlightStatus from './FlightStatus';
import NavBar from './UserNavbar';
import bgImage from '../Images/bgDashboard.jpg';
import QmImage from '../Images/quotation-marks.png'
import './BookingComponent.css';
// import { useParams} from 'react-router-dom';


const UserDashboard = () => {
    const [userName] = useState('');
    const [activeTab, setActiveTab] = useState('search-flight');
    // const { userId } = useParams();

    const userId = localStorage.getItem('userId');
    console.log('new userid ', userId);

    
    // Sample feedback data
    const feedbackData = [
        {
            id: 1,
            comment: "Amazing service! Loved the experience.",
            user: "John Doe",
            image: "path_to_user_image_1.jpg"
        },
        {
            id: 2,
            comment: "Best airline I've traveled with. Highly recommended.",
            user: "Jane Smith",
            image: "path_to_user_image_2.jpg"
        },
        {
            id: 1,
            comment: "Amazing service! Loved the experience.",
            user: "John Doe",
            image: "path_to_user_image_1.jpg"
        },
      
    ];


    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    }

    return (
        <div>
            {/* Include the NavBar component */}
            <NavBar userName={userName} userId={userId} />

            {/* Image with text */}
            <div style={{ textAlign: 'center', marginTop: '0' }}>
                {/* Add your image */}
                <img src={bgImage} alt="Avio to the sky" style={{ width: '100%', height: '663px' }} />
                {/* Text */}
                <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', letterSpacing: '1rem' }}>
                    Avio, to the sky!
                </h1>
            </div>

            {/* Add booking component */}
            <div className="booking-component">
                {/* <div className="container"> */}
                    {/* Tabs for Book a flight and Flight status */}
                    <ul className="custom-nav-tabs">
                        {/* Book a Flight tab */}
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'search-flight' ? 'active' : ''}`}
                                onClick={() => handleTabChange('search-flight')}
                                href="#book-tab-flights"
                            >
                                <span className="nav-tab-icon bw-ic-tab-ft"></span>
                                <label>Search flight</label>
                            </a>
                        </li>
                        {/* Flight status tab */}
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'flight-status' ? 'active' : ''}`}
                                onClick={() => handleTabChange('flight-status')}
                                href="#book-tab-flightstatus"
                            >
                                <span className="nav-tab-icon bw-ic-tab-fs"></span>
                                <label>Flight status</label>
                            </a>
                        </li>
                    </ul>

                    {/* Content for Book a flight and Flight status */}
                    <div className="custom-tab-content">
                        {/* Render BookFlight or FlightStatus based on activeTab state */}
                        {activeTab === 'search-flight' && <SearchFlight />}
                        {activeTab === 'flight-status' && <FlightStatus />}
                    </div>
                {/* </div> */}
            </div>
            {/* About Us section */}
            <div className="about-us-section">
                <div className="about-us-content">
                <h2 style={{textAlign:'center'}}>About Us</h2>
                <p>We are a premier airline company committed to providing exceptional travel experiences.
                        Welcome to our premier airline reservation system! At [Airline Name], <br />we pride ourselves on delivering unparalleled travel experiences to our passengers. With a steadfast commitment to reliability, comfort, and convenience, we <br />have positioned ourselves as a leading choice for domestic and international travel.

                        Established with a vision to redefine air travel, our airline boasts a fleet <br />of modern aircraft equipped with state-of-the-art amenities, ensuring safe and enjoyable journeys for our passengers. From economy to business class, <br />we strive to exceed expectations by offering a range of seating options tailored to varying preferences and budgets.
                </p>
                </div>
              
            </div>
            
            {/* What our clients say! */}
            <h2 style={{ textAlign: 'center' }}>What our clients say!</h2>

            {/* Feedback containers */}
            <div className="feedback-container">
                {feedbackData.map((feedback) => (
                    <div key={feedback.id} className="individual-feedback">
                        <span><img src={QmImage} alt="quotation" style={{ width: '35px', height: '40px' }} /></span>

                        <div className="feedback-content">
                            <p>{feedback.comment}</p>
                        </div>
                        <div className="user-details">
                            <img src={feedback.image} alt={feedback.user} />
                            <span>{feedback.user}</span>
                        </div>
                    </div>
                ))}
            </div>            

        </div>
       
    );
};

export default UserDashboard;
