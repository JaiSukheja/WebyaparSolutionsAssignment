import React, { useRef, ChangeEvent, useState, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import './User.css';
import axios from 'axios';

const User: React.FC = () => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const uploadButtonRef = useRef<HTMLButtonElement | null>(null);
    const cropperRef = useRef<Cropper | null>(null);
    const [showImage, setShowImage] = useState<boolean>(false);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [view, setView] = useState(false);
    const [accepted, setAccepted] = useState(false);  
    const [user, setUser]:any = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        axios.get(`http://localhost:4444/user/${userId}`)
        .then(function (response) {
            setUser(response.data)
            setAccepted(user?.isAccepeted)
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }, [view,user,accepted])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file && !croppedImage) {
            setShowImage(false);
        } else {
            setShowImage(true);
        }

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const image = imageRef.current;
                const uploadButton = uploadButtonRef.current;
                if (image) {
                    image.src = event.target?.result as string;
                    const cropper = new Cropper(image, {
                        aspectRatio: 0,
                        viewMode: 0,   
                        ready() {
                            if (uploadButton) {
                                uploadButton.style.display = 'block';
                            }
                        },
                    });
                    cropperRef.current = cropper;
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const handleUpload = () => {
        const cropper = cropperRef.current;

        if (cropper) {
            const croppedCanvas = cropper.getCroppedCanvas();
            const croppedImageDataURL = croppedCanvas.toDataURL()
            setCroppedImage(croppedImageDataURL);
            setShowImage(false);
            cropper.destroy();
            cropperRef.current = null;
            const uploadButton = uploadButtonRef.current;
            if (uploadButton) {
                uploadButton.style.display = 'none';
            }
        }
    };

    const handleSubmit = () => {
        const userId = localStorage.getItem('userId')
        axios.put(`http://localhost:4444/user/update/${userId}`, {
            Name: name,
            profilePicture: croppedImage,
        })
        .then(function (response) {
            console.log(response);
            setShowImage(false);
            setCroppedImage(null);
            setName("");
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <div className="UserPage">
            <div onClick={()=>{
                setView(!view)
            }} className="ViewUsersViewButton">
               {!view ? "View" : "Back"}
            </div>
            <div className="UserContainer">
                <div className="UserInput">
                    <div className="UserInputField">
                        <label htmlFor="input" className="UserInputLabel">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="UserInputField">
                        <label htmlFor="input" className="UserInputLabel">
                            Photo
                        </label>
                        {!showImage && !croppedImage && (
                            <div className="CustomFileInput">
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e)}
                                    className="UserInputFile"
                                    required
                                />
                                <div className="DottedBorder">
                                    <span className="DottedText">Drag and drop or click to upload</span>
                                </div>
                            </div>
                        )}
                        {showImage && !croppedImage && (
                            <img ref={imageRef} className="UserImage" />
                        )}
                        {croppedImage && (
                            <img src={croppedImage} alt="Cropped" className="UserImage" />
                        )}
                    </div>

                    <div className="UserInputField">
                        <button
                            className="UserInputButton"
                            ref={uploadButtonRef}
                            style={{ display: 'none' }}
                            onClick={handleUpload}
                            >
                            Upload
                        </button>
                        {croppedImage && (
                            <button className="UserInputButton" onClick={handleSubmit}>
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div>
                {view && (
                    <div className='viewBoxContainer'>
                        <div className='viewBox'>
                            <div className='ViewNameContainer'>
                                <div className='viewLabel'>Name</div>
                                <div className='viewName'>{user?.Name}</div>
                            </div>
                            <div className='ViewImageContainer'>
                                <div className='viewLabel'>
                                    Photo
                                </div>
                                <img src={user?.profilePicture} alt="" className='viewImage'/>
                            </div>
                            <div className={accepted ? 'accepted': 'rejected'}>
                                {accepted ? 'Accepted by the Admin' : 'Not Accepted by Admin'}
                            </div>
                            <button
                                className="ViewUsersViewButton"
                                onClick={() => {
                                    localStorage.removeItem('userId')
                                    localStorage.removeItem('isAdmin')
                                    window.location.href = "/"
                            }}
                            >Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
