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

psql.prototype.where = function(str) {
  // Switch ? with $x
  var index = this.values.length;
  var whereString = str;
  for (var i = 0; i !== str.length; i++) {
    if(str[i] === '?') {
      whereString = whereString.replace('?', '$' + (++index));
    }
  }

  this.query += ' where ' + whereString;

  // Remove first argument, get the values of the next N arguments
  delete arguments['0'];
  if(this.values) {
    this.values = this.values.concat(Object.values(arguments));
  } else {
    this.values = Object.values(arguments);
  }

  return this;
};

psql.prototype.update = function(table, args) {
  var columns = Object.keys(args);
  this.values = Object.values(args);

  var placeholders = [];

  for(var i = 0; i !== this.values.length; i++) {
    placeholders.push(columns[i] + ' = $' + (i + 1));
  }

  this.query = 'update ' + table + ' set ' + placeholders.join(', ');

  return this;
};

psql.prototype.returning = function() {
  if(arguments.length === 0) {
    this.query += ' returning *';
  } else {
    var columns = Object.values(arguments);
    this.query += ' returning ' + columns.join(', ');
  }

  return this;
};

psql.prototype.toQuery = function() {
  return {
    text: this.query,
    values: this.values
  };
};

module.exports = new psql();
