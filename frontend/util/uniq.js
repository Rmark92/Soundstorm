const uniq = (arr) => {
  const res = [];
  arr.forEach( el => {
    if (!res.includes(el)) {
      res.push(el);
    }
  });
  return res;
};
