class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    // 1A) Filtering
    const queryObj = { ...this.queryStr };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log(JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // 2) Sorting
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    // 3) Field Limiting
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields); // projecting
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    // 4) Pagination
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // page=2&limit=10, 1-10,
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
