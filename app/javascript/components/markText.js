import React from 'react';

export default (card, markStr, className, exclude) => {
  const profileEntries = Object.entries(card);
  const markedEntries = profileEntries.reduce((acc, i) => {
    const key = i[0];
    const value = i[1];
    if (exclude.includes(key)) {
      return Object.assign(acc, { [key]: value });
    }
    const inIndex = value.toLowerCase().indexOf(markStr.toLowerCase());
    if (inIndex !== -1) {
      const preStr = value.substr(0, inIndex);
      const markedStr = value.substr(inIndex, markStr.length);
      const postStr = value.substr(inIndex + markStr.length);
      return Object.assign(
        acc,
        { [key]: <span>{preStr}<span className={className}>{markedStr}</span>{postStr}</span> },
      );
    }
    return Object.assign(acc, { [key]: value });
  }, {});

  return markedEntries;
};
