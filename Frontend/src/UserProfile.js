import React from 'react';
import UserNavbar from './UserNavbar';
import './UserProfile.css'; // Styling for UserProfile component
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams(); 

    // Function to update user profile
    const handleProfileUpdate = async () => {
        // Make an API call to update the user profile
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Include updated profile data
                }),
            });

            // Handle response as needed
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    return (
        <div className="user-profile-container">
            <UserNavbar />

            <div className="main-container">
                {/* Left side - Takes 75% of the space */}
                <div className="content-left">
                    {/* Your main content goes here */}
                </div>

                {/* Right side - Takes rest of the space */}
                <div className="sidebar-right">
                    {/* Sidebar content goes here */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
