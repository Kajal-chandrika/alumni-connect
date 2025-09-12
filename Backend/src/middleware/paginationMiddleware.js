export const paginate = (model) => {
  return async (req, res, next) => {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    req.pagination = { limit, offset };
    next();
  };
};
