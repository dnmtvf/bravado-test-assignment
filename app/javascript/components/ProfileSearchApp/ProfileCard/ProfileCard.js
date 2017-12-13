import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ProfileCard.sss';

const SelectBtn = (props) => {
  const selectBtnClassNames = classNames(
    'ProfileCard-SelectBtnContainer',
    { 'ProfileCard-SelectBtnContainer-selected': props.isSelected },
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
        className="ProfileCard-SelectBtn"
      >
        {props.isSelected ? 'SKIP SELECTION' : 'MARK AS SIUTABLE'}
      </button>
    </div>
  );
};

const ProfileCard = props => (
  <div className={classNames('ProfileCard', { 'ProfileCard-selected': props.profileCredentials.isSelected })}>
    <div className="ProfileCard-IcoContainer">
      <img src={props.profileCredentials.avatar} alt={props.profileCredentials.name} className="ProfileCard-Ico" />
    </div>
    <div className="ProfileCard-Name">
      {props.profileCredentials.name}
    </div>
    <div className="ProfileCard-Email">
      {props.profileCredentials.email}
    </div>
    <div className="ProfileCard-JobTitle">
      {props.profileCredentials.title}
    </div>
    <div className="ProfileCard-Address">
      {props.profileCredentials.address}, {props.profileCredentials.city}
    </div>
    <SelectBtn
      clickHandle={props.onClickSelectBtn}
      id={props.profileCredentials.id}
      isSelected={props.profileCredentials.isSelected}
    />
  </div>
);

SelectBtn.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  clickHandle: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

ProfileCard.propTypes = {
  // profileCredentials: PropTypes.objectOf(PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  //   PropTypes.bool])).isRequired,

  onClickSelectBtn: PropTypes.func.isRequired,
};

export default ProfileCard;
