// model module
// contains db queries and functions that a controller will call
const dbpool = require('../db.js');

module.exports = class Thing {
  constructor (content, user_id) {
    this.content = content;
    this.user_id = user_id;
  }

  static async getAll() {
    let query =
        'SELECT * ' +
        'FROM test_table';
    return await dbpool.query(query);
  }
};
