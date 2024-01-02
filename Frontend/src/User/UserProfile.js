import React, { useState } from 'react';
import UserNavbar from './UserNavbar';
import './UserProfile.css'; // Styling for UserProfile component
import { useParams, Link } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    // Check the data type of userId
    const userID = parseInt(useParams().userId, 10);
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        age: 0,
        gender: '',
        mobileNumber: '',
        nationality: '',
        passportNumber: '',
        passportExpiry: '',
    });
    // const userType = typeof userID;

    // console.log('user type',userType);
    const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
    const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);
    const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
    const [userImage, setUserImage] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [travelInfo, setTravelInfo] = useState({
        nationality: '',
        passportNumber: '',
        passportExpiry: '',
    });

    const fetchUserData = () => {
        fetch(`http://localhost:3000/Users/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Add additional parameters if needed
        })
            .then((response) => response.json())
            .then((userData) => {
                setUser({
                    userId: userData.userId,
                    name: userData.name,
                    username: userData.username,
                    email: userData.email,
                    age: userData.age,
                    gender: userData.gender,
                    mobileNumber: userData.mobileNumber,
                    nationality: userData.nationality,
                    passportNumber: userData.passportNumber,
                    passportExpiry: userData.passportExpiry,
                    // Update other fields according to the received data structure
                });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };

    // Call fetchUserData when the component mounts
    fetchUserData();

    const handlePasswordChange = () => {
        setShowChangePasswordPopup(true);
    };

    const handleClosePopup = () => {
        setShowChangePasswordPopup(false);
        // Reset password fields when closing the popup
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };


    const handleSaveChanges = () => {

        // Make a fetch call here to update the password
        if (newPassword !== confirmPassword) {
            // Show an alert or any validation message
            alert("New password and confirm password don't match");
            return;
        }

        fetch(`http://localhost:3000/users/${userID}/changePassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword, newPassword }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle success or display messages accordingly
                console.log('Password updated:', data);
                handleClosePopup();
            })
            .catch((error) => {
                console.error('Error updating password:', error);
                // Handle error or display messages accordingly
            });
    };


    const handleEditProfile = () => {
        setShowEditProfilePopup(true);
    };

    const handleTravelInfoSave = () => {
        // Save travel document information to the user model using the userID
        fetch(`http://localhost:3000/users/${userID}/addTravelInfo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(travelInfo),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Travel information saved:', data);
                setShowEditProfilePopup(false);
            })
            .catch((error) => {
                console.error('Error saving travel information:', error);
            });
    };

    const handleDeleteAccount = () => {
        setShowDeleteAccountPopup(true);
    };

    const confirmDeleteAccount = () => {
        // Make a fetch call to delete the user account
        fetch(`http://localhost:3000/users/${userID}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    // User deleted successfully, navigate to login page
                    setShowDeleteAccountPopup(false);
                    // Perform redirection to login page
                    // Replace this with your routing logic
                    window.location.href = '/login'; // Example: Redirect to login
                } else {
                    // Handle error cases here
                    console.error('Error deleting account');
                }
            })
            .catch((error) => {
                console.error('Error deleting account:', error);
            });
    };


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUserImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };


    return (
        <div>
            <UserNavbar />
            <h1 style={{ textAlign: 'center' }}>Profile</h1>
            <div className="profile-container">
                {/* Left Side */}
                <div className="left-container">
                    <div className="profile-image">
                        <img src={userImage || 'path_to_default_image'} alt="Profile" style={{ width: '65px', height: '65px', borderRadius: '50%', }} />
                    </div>
                    <div className="user-details">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><a href="#" onClick={handlePasswordChange}>Change Password?</a></p>
                        <Link to={`/BookingHistory/${userId}`}>Booking History</Link>
                        {/* <p><a href={`/BookingHistory/${userID}`}>Booking History</a></p> */}
                    </div>
                </div>
                {/* Right Side */}
                <div className="right-container">
                    <div className="edit-button">
                        <div className="right-content">
                            <button style={{ width: '120px' }} onClick={handleEditProfile}>Edit</button>
                        </div>
                    </div>
                    <div className="personal-details">
                        <h2>Personal Details</h2>
                        <hr />
                        <div className="profile-image">
                            <img src={userImage || 'path_to_default_image'} alt="Profile" style={{ width: '65px', height: '65px', borderRadius: '50%', marginTop: '5px', }} />
                        </div>
                        <input type="file" onChange={handleImageUpload} accept="image/*"
                            style={{
                                border: 'none', /* Remove the border */
                                outline: 'none', /* Remove the outline on focus */
                                marginTop: '12px',
                                marginBottom: '5px',
                                // Additional styles as needed
                            }} />
                        <p>Name: {user.name}</p>
                        <p>Age: {user.age}</p>
                        <p>Gender: {user.gender}</p>
                        {/* Contact Details */}
                        <h2>Contact Details</h2>
                        <hr />
                        <p>Email: {user.email}</p>
                        <p>Mobile: {user.mobileNumber}</p>
                        {/* Travel Documents */}
                        <h2>Travel Documents</h2>
                        <hr />
                        <h4>Passport Information</h4>
                        <p>Nationality: {user.nationality}</p>
                        <p>Passport Number: {user.passportNumber}</p>
                        <p>Expiry Date: {user.passportExpiry}</p>
                        {/* Display travel document details */}
                    </div>
                    {/* Account Settings */}
                    <div className="account-settings">
                        <h2>Account Settings</h2>
                        <hr />
                        <a href="#" onClick={handleDeleteAccount} className="delete-account-link">
                            Delete Account
                        </a>
                    </div>
                </div>
            </div>

            {/* Popups */}
            {showChangePasswordPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>
                            &times;
                        </span>
                        <h2>Change Password</h2>
                        <label>Old Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Enter existing password"
                        />
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter new password"
                        />
                        <div>
                            <button onClick={handleSaveChanges}>Save Changes</button>
                            <button onClick={handleClosePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditProfilePopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={() => setShowEditProfilePopup(false)}>
                            &times;
                        </span>
                        <h2>Add Travel Document Info</h2>
                        <label>Nationality</label>
                        <input
                            type="text"
                            value={travelInfo.nationality}
                            onChange={(e) => setTravelInfo({ ...travelInfo, nationality: e.target.value })}
                        />
                        <label>Passport Number</label>
                        <input
                            type="text"
                            value={travelInfo.passportNumber}
                            onChange={(e) => setTravelInfo({ ...travelInfo, passportNumber: e.target.value })}
                        />
                        <label>Passport Expiry</label>
                        <input
                            type="date"
                            value={travelInfo.passportExpiry}
                            onChange={(e) => setTravelInfo({ ...travelInfo, passportExpiry: e.target.value })}
                        />
                        <div>
                            <button onClick={handleTravelInfoSave}>Save Changes</button>
                            <button onClick={() => setShowEditProfilePopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteAccountPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={() => setShowDeleteAccountPopup(false)}>
                            &times;
                        </span>
                        <h2>Delete Account</h2>
                        <p>Are you sure you want to delete your account?</p>
                        <div>
                            <button onClick={confirmDeleteAccount}>Yes</button>
                            <button onClick={() => setShowDeleteAccountPopup(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
