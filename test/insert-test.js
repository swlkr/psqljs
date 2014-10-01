var chai = require('chai'),
    expect = chai.expect,
    sql = require('../lib/psql');

describe('insert', function() {
  it('should generate an insert statement', function() {
    expect(sql.insert('users', { firstName: 'Johnny', lastName: 'Appleseed' }).toQuery())
      .to.deep.equal({text: 'insert into users (firstName, lastName) values ($1, $2)', values: ['Johnny', 'Appleseed']});
  });
});