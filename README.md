# psqljs
_A minimal sql generator for nodejs and postgres_

## Get Started

```javascript
// Require the module
var sql = require('psqljs'),
    select = sql.select,
    insert = sql.insert;
```

### Select

```javascript
// select * from users;
select().from('users').toString();

// select id from users;
select('id').from('users').toString();

// select id, name from users;
select('id', 'name').from('users').toString();
```

### Where

```js
// { text: "select * from users where id = $1", values: [1] }
select().from('users').where('id = ?', 1).toString()

// { text: "select * from users where firstName = $1 and lastName = $2", values: ['Johnny', 'Appleseed'] }
select().from('users').where('firstName = ?', 'Johnny').where('lastName = ?', 'Appleseed').toString();

// { text: "select * from users where firstName = $1 or lastName = $2", values: ['Johnny', 'Appleseed'] }
select().from('users').where('firstName = ? or lastName = ?', 'Johnny', 'Appleseed').toString();
```

### Insert

```js
// { text: "insert into users (firstName, lastName)", values: ['Johnny', 'Appleseed'] }
insert('users', { firstName: 'Johnny', lastName: 'Appleseed' }).toString();
```

### Update

```js
// { text: "update users set firstName = $1 where firstName = $2", values: ['Sally', 'Johnny'] }
update('users', { firstName: 'Sally' }).where('firstName = ?', 'Johnny').toString();
```


## Run the Tests

```bash
$ npm test
```