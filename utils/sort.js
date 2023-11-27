export const nestedSort =
  (prop1, prop2 = null, direction = "asc") =>
  (e1, e2) => {
    const a = prop2 ? e1[prop1][prop2] : e1[prop1],
      b = prop2 ? e2[prop1][prop2] : e2[prop1],
      sortOrder = direction === "asc" ? 1 : -1;
    return a < b ? -sortOrder : a > b ? sortOrder : 0;
  };
