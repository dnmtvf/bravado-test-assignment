import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
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
      return Object.assign(acc, { [key]: <span>{preStr}<span className={className}>{markedStr}</span>{postStr}</span> });
    }
     return Object.assign(acc, { [key]: value });
  }, {})

  return markedElem;
}

const SelectBtn = (props) => {
  const containerClasses = classNames('profile__filterBtnContainer', {'profile__filterBtnContainer-selected': props.isSelected});
  return (
    <div className={containerClasses}>
      <button
      onClick={(e) => {
          e.preventDefault();
          props.clickHandle(props.id);
          }
          }
       className='profile__filterBtn'>
        {props.isSelected ? 'SKIP SELECTION' : 'MARK AS SIUTABLE'}
      </button>
    </div>
  )
}

const ShowMoreBtn = (props) => {
if(props.restCards > 0) {
  return (
<button
className='ShowMoreBtn'
onClick={
(e) => {
  e.preventDefault();
  // this.setState((prevState, props) => ({ showedCards: prevState.showedCards + restCards }));
  props.clickHandle(props.restCards);
}
}
>Show more...</button>
)
}

return null;
}

class Profile extends React.Component {

  constructor(props) {
      super(props);
      this.state = { showedCards: 25, searchResultLength: null };
      console.log(this.props.profileCard.length)
      this.showMoreBtnClick = this.showMoreBtnClick.bind(this);
    }

  componentWillReceiveProps(newProps){
  this.setState({ showedCards: 25 });
  this.setState({ searchResultLength: newProps.profileCard.length });
}

showMoreBtnClick(restCards) {
  this.setState((prevState, props) => ({ showedCards: prevState.showedCards + restCards }));
}

render() {

  const profileCard = this.props.profileCard.map((item, index) => {
    const isSelected = this.props.selectedCards.includes(item);
    const markedCard = this.props.searchQuery.length > 0 ? markText(item, this.props.searchQuery, 'searchActive', ['avatar', 'id']) : item;
    const profileInfoClasses = classNames('profileInfo', {'profileInfo-selected': isSelected});
    if(index <= this.state.showedCards) {
    return (
    <div className={profileInfoClasses} key={markedCard.id}>
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
          {markedCard.address}, {markedCard.city}
        </div>
        </div>
        <SelectBtn clickHandle={this.props.clickHandle} id={markedCard.id} isSelected={isSelected} />

      </div>

    </div>
  )
}
  })

  const restCards = (this.state.searchResultLength - this.state.showedCards) < 25 ? this.state.searchResultLength - this.state.showedCards : 25;
  return <div>

  {profileCard}
  <ShowMoreBtn clickHandle={this.showMoreBtnClick} restCards={restCards} />

  </div>
}
};

// <ShowMoreBtn clickHandle={showMoreBtnClick} restCards={restCards} />

export default Profile;
