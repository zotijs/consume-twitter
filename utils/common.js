const sortObjByKey = obj =>
  Object.keys(obj)
    .sort()
    .reduce((acc, val) => ({ ...acc, [val]: obj[val] }), {});

module.exports = {
  sortObjByKey
};
