import React from 'react';

const breakEmail = email => `${email.substr(0, email.indexOf('@'))}${'\u00ad'}${email.substr(email.indexOf('@'))}`;

export default (obj, subStr, className, exclude) => {
  if (subStr === '') {
    return { ...obj, email: breakEmail(obj.email) };
  }
  const profileEntries = Object.entries(obj);
  const highlighted = profileEntries.reduce((acc, i) => {
    const key = i[0];
    const value = key === 'email' ? breakEmail(i[1]) : i[1];
    if (exclude.includes(key)) {
      return { ...acc, [key]: value };
    }
    const startIndex = value.toLowerCase().indexOf(subStr.toLowerCase());
    if (startIndex !== -1) {
      const preStr = value.substr(0, startIndex);
      const highlightedStr = value.substr(startIndex, subStr.length);
      const postStr = value.substr(startIndex + subStr.length);
      return {
        ...acc,
        [key]: <span>{preStr}<span className={className}>{highlightedStr}</span>{postStr}</span>,
      };
    }
    return { ...acc, [key]: value };
  }, {});

  return highlighted;
};
