export const RegexCard = (str) => {
  const regex = /^\d{16}$/gm;
  let m;
  let f = false;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m.forEach((match, groupIndex) => {
      f = true;
    });
  }
  return f;
};

export const RegexExpiry = (str) => {
  const regex = /^[0|1]\d\/202\d$/gm;
  let m;
  let f = false;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m.forEach((match, groupIndex) => {
      f = true;
    });
  }
  return f;
};

export const RegexCVV = (str) => {
  const regex = /^\d{3}$/gm;
  let m;
  let f = false;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m.forEach((match, groupIndex) => {
      f = true;
    });
  }
  return f;
};
