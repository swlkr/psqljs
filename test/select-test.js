var chai = require('chai'),
    expect = chai.expect,
    sql = require('../lib/psql');

describe('select', function() {
  it('should generate a select statement with an asterisk with no arguments', function() {
    expect(sql.select().from('users').toQuery().text).to.equal('select * from users');
  });
});