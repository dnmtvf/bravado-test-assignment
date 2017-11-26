import React from 'react';
import ReactDOM from 'react-dom';
import './profile.sss';
import tmpProfileImg from './tmpProfileImg.png'

const Profile = (props) => {
  return (
    <div className="profileInfo">
      <img src={tmpProfileImg} className='profile__image' />
      <div className='profile__credentialsContainer'>
        <div className='profile__credentials'>
        <div className='profile__nameEmailWrap'>
          <span className='profile__personName'>
            Josie Waters
          </span>
          <span className='profile__personEmail'>
            alex@fisherking.co
          </span>
        </div>
        <div className='profile__personPosition'>
          Investor Integration Supervisor
        </div>
        <div className='profile__personAddress'>
          22745 O'Kon Parks, Ernsermouth
        </div>
        </div>
        <div className='profile__filterBtnContainer'>
          <button className='profile__filterBtn'>
            SKIP SELECTION
          </button>
        </div>
      
      </div>
      
    </div>
  );
};

export default Profile;