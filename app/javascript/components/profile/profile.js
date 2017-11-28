import React from 'react';
import ReactDOM from 'react-dom';
import './profile.sss';
import tmpProfileImg from './tmpProfileImg.png'

const Profile = (props) => {
  
  const profileCard = props.profileCard.map(item => {
    return (
    <div className="profileInfo">
      <img src={item.avatar} className='profile__image' />
      <div className='profile__credentialsContainer'>
        <div className='profile__credentials'>
        <div className='profile__nameEmailWrap'>
          <span className='profile__personName'>
            {item.name}
          </span>
          <span className='profile__personEmail'>
            {item.email}
          </span>
        </div>
        <div className='profile__personPosition'>
          {item.title}
        </div>
        <div className='profile__personAddress'>
          {item.address}
        </div>
        </div>
        <div className='profile__filterBtnContainer'>
          <button className='profile__filterBtn'>
            SKIP SELECTION
          </button>
        </div>
    
      </div>
    
    </div>)
  })
  
  
  return profileCard;
};

export default Profile;