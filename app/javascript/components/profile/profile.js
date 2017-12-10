import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Profile.sss';
import markText from '../markText';

const SelectBtn = (props) => {
  const selectBtnClassNames = classNames(
    'profile__filterBtnContainer',
    { 'profile__filterBtnContainer-selected': props.isSelected },
  );
  return (
    <div className={selectBtnClassNames}>
      <button
        onClick={
          (e) => {
            e.preventDefault();
            props.clickHandle(props.id);
          }
        }
        className="profile__filterBtn"
      >
        {props.isSelected ? 'SKIP SELECTION' : 'MARK AS SIUTABLE'}
      </button>
    </div>
  );
};

const ShowMoreBtn = (props) => {
  if (props.isLeftToDisplay) {
    return (
      <button
        className="profile__showMoreBtn"
        onClick={
          (e) => {
            e.preventDefault();
            props.clickHandle();
          }
        }
      >
      Show more...
      </button>
    );
  }

  return null;
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showedCards: this.props.showedCards };
    // this.showMoreBtnClick = this.showMoreBtnClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ showedCards: newProps.showedCards });
  }

  render() {
    const profileCard = this.props.profileCard.map((item, index) => {
      const isSelected = this.props.selectedProfiles.includes(item.id);
      const markedCard = this.props.searchQuery.length > 0 ?
        markText(item, this.props.searchQuery, 'matchedText', this.props.excludedInSearch)
        : item;
      const profileEntriesContainerClassNames = classNames(
        'profile__profileEntriesContainer',
        { 'profile__profileEntriesContainer-selected': isSelected },
      );
        return (
          <div className={profileEntriesContainerClassNames} key={markedCard.id}>
            <img src={markedCard.avatar} alt={markedCard.name} className="profile__image" />
            <div className="profile__credentialsContainer">
              <div className="profile__credentials">
                <div className="profile__nameEmailWrap">
                  <span className="profile__personName">
                    {markedCard.name}
                  </span>
                  <span className="profile__personEmail">
                    {markedCard.email}
                  </span>
                </div>
                <div className="profile__personPosition">
                  {markedCard.title}
                </div>
                <div className="profile__personAddress">
                  {markedCard.address}, {markedCard.city}
                </div>
              </div>
              <SelectBtn
                clickHandle={this.props.onClickSelectBtn}
                id={markedCard.id}
                isSelected={isSelected}
              />
            </div>
          </div>
        );
    });

    const restCards = (this.state.searchResultLength - this.state.showedCards) < 25 ?
      this.state.searchResultLength - this.state.showedCards
      : 25;

    return (
      <div>
        {profileCard}
        <ShowMoreBtn clickHandle={this.props.onClickShowMore} isLeftToDisplay={this.props.isLeftToDisplay} />
      </div>);
  }
}

SelectBtn.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  clickHandle: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

ShowMoreBtn.propTypes = {
  restCards: PropTypes.number.isRequired,
  clickHandle: PropTypes.func.isRequired,
};

Profile.propTypes = {
  profileCard: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string.isRequired,
  clickHandle: PropTypes.func.isRequired,
};

export default Profile;
