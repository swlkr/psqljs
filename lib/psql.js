require('./utils');

function psql() {
  this.query = null;
  this.values = [];
}

psql.prototype.select = function() {
  this.query = 'select ';
  this.values = [];

  if(arguments.length === 0) {
    this.query += '*';
  } else {
    this.query += Array.prototype.slice.call(arguments).join(", ");
  }

  return this;
};

psql.prototype.from = function(table) {
  this.query = this.query + ' from ' + table;
  this.values = [];
  return this;
};

psql.prototype.insert = function(table, args) {
  var columns = Object.keys(args);
  this.values = Object.values(args);

  var placeholders = [];

  for (var i = 0; i !== this.values.length; i++) {
    placeholders.push('$' + (i + 1));
  }

  this.query = 'insert into ' + table + ' (' + columns.join(', ') + ') values (' + placeholders.join(', ') + ')';

  return this;
};

psql.prototype.toQuery = function() {
  return {
    text: this.query,
    values: this.values
  };
};

module.exports = new psql();