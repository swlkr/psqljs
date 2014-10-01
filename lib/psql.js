function psql() {
  this.query = null;
  this.values = [];
}

psql.prototype.select = function() {
  this.query = 'select *';
  return this;
};

psql.prototype.from = function(table) {
  this.query = this.query + ' from ' + table;
  return this;
};

psql.prototype.toQuery = function() {
  // build query and return it
  return {
    text: this.query,
    values: this.values
  };
};

module.exports = new psql();