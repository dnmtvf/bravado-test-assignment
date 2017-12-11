import React from 'react';

export default (obj, subStr, className, exclude) => {
  if (subStr === '') {
    return { ...obj };
  }
  const profileEntries = Object.entries(obj);
  const highlighted = profileEntries.reduce((acc, i) => {
    const key = i[0];
    const value = i[1];
    if (exclude.includes(key)) {
      return Object.assign(acc, { [key]: value });
    }
    const startIndex = value.toLowerCase().indexOf(subStr.toLowerCase());
    if (startIndex !== -1) {
      const preStr = value.substr(0, startIndex);
      const highlightedStr = value.substr(startIndex, subStr.length);
      const postStr = value.substr(startIndex + subStr.length);
      return Object.assign(
        acc,
        { [key]: <span>{preStr}<span className={className}>{highlightedStr}</span>{postStr}</span> },
      );
    }
    return Object.assign(acc, { [key]: value });
  }, {});

  return highlighted;
};
