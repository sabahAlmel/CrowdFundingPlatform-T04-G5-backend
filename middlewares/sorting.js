export function sortData(req, res, next) {
  const { criteria, order } = req.query;
  let sort;
  if (criteria) {
    sort = [[criteria, order || "ASC"]];
    console.log(...sort);
  } else {
    sort = [];
  }
  req.sort = sort;
  next();
}
