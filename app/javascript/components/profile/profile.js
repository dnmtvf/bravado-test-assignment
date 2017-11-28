import React from 'react';
import ReactDOM from 'react-dom';
import './profile.sss';
import tmpProfileImg from './tmpProfileImg.png'

const markText = (card, markStr, className, exclude) => {
  const elements = Object.entries(card);
  const markedElem = elements.reduce((acc, i) => {
    const key = i[0];
    const value = i[1];
    if(exclude.includes(key)) {
      return Object.assign(acc, { [key]: value });
    }
    const inIndex = value.toLowerCase().indexOf(markStr.toLowerCase());
    
    if(inIndex != -1) {
      const preStr = value.substr(0, inIndex);
      const markedStr = value.substr(inIndex, markStr.length);
      const postStr = value.substr(inIndex + markStr.length);
      // console.log(`pre - ${preStr}`);
      // console.log(`mark - ${markedStr}`);
      // console.log(`post - ${postStr}`);
      // console.log(value.substr(inIndex, markStr.length));
      // return Object.assign(acc, { [key]: `${preStr}<span className=${className}>${markedStr}</span>${postStr}` });
      return Object.assign(acc, { [key]: <span>{preStr}<span className={className}>{markedStr}</span>{postStr}</span> });
    }
     return Object.assign(acc, { [key]: value });
  }, {})
  
  return markedElem;
  // console.log(markedElem);
}

const SelectBtn = (props) => {
  return (
    <div className='profile__filterBtnContainer'>
      <button
      onClick={(e) => {
          e.preventDefault();
          props.clickHandle(props.id);
          }
          }
       className='profile__filterBtn'>
        MARK AS SIUTABLE
      </button>
    </div>
  )
}

const UnselectBtn = (props) => {
  return (
    <div className='profile__filterBtnContainer-selected'>
      <button
      onClick={(e) => {
          e.preventDefault();
          props.clickHandle(props.id);
          }
          }
      className='profile__filterBtn'>
        SKIP SELECTION
      </button>
    </div>
  )
}



const Profile = (props) => {
  
  const profileCard = props.profileCard.map(item => {
    const markedCard = props.searchQuery.length > 0 ? markText(item, props.searchQuery, 'searchActive', ['avatar', 'id']) : item;
    return (
    <div className="profileInfo" key={markedCard.id}>
      <img src={markedCard.avatar} className='profile__image' />
      <div className='profile__credentialsContainer'>
        <div className='profile__credentials'>
        <div className='profile__nameEmailWrap'>
          <span className='profile__personName'>
            {markedCard.name}
          </span>
          <span className='profile__personEmail'>
            {markedCard.email}
          </span>
        </div>
        <div className='profile__personPosition'>
          {markedCard.title}
        </div>
        <div className='profile__personAddress'>
          {markedCard.address}
        </div>
        </div>
        {props.selectedCards.includes(item) ? <UnselectBtn clickHandle={props.clickHandle} id={markedCard.id} /> : <SelectBtn clickHandle={props.clickHandle} id={markedCard.id} />}
    
      </div>
    
    </div>)
  })
  
  
  return profileCard;
};

export default Profile;