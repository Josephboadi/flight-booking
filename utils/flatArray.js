function flat(array) {
  var result = [];
  array?.forEach(function (a) {
    result.push(a);
    if (Array.isArray(a.submenus)) {
      result = result.concat(flat(a.submenus));
    }
  });
  return result;
}

export default flat;
