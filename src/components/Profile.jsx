import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

const Profile = () => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage')
    if (savedImage) {
      setImage(savedImage)
    }
  }, [])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (image) {
      localStorage.setItem('profileImage', image)
      alert('Profile changes saved!')
    } else {
      alert('Please upload an image before saving.')
    }
  }

  return (
    <>
      <div className="navbar">
        <div className="logo">WAOW</div>
        <div className="nav-links">
          <a href="home">Home</a>
          <a href="profile" className="active">Profile</a>
          <a href="category">Category</a>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <h2>Profile</h2>
          <div className="profile-card-content">
            <div className="profile-info">
              <div className="profile-field">
                <strong>Username</strong>
                <span>Arivio</span>
              </div>
              <div className="profile-field">
                <strong>Email</strong>
                <span>arivio@example.com</span>
              </div>
              <div className="profile-field">
                <strong>Phone</strong>
                <span>086517265378</span>
              </div>
              <div className="profile-field">
                <strong>Location</strong>
                <span>Malang, Jawa Timur</span>
              </div>
            </div>
            <div className="profile-picture">
              <div className="camera-icon">
                <label htmlFor="imageUpload">
                  <Icon icon="mdi:camera" width="25" height="25" />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <img
                className="profile-img"
                src={
                  image ||
                  'https://i.pinimg.com/736x/99/d0/7f/99d07f72ea74f29fe21833964704cdc9.jpg'
                }
                alt="Profile"
              />
            </div>
          </div>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  )
}
export default Profile