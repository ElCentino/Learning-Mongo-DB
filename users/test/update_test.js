const assert = require('assert')
const User = require('../src/user')

describe('Updating Records', () => {

    let joe;

    beforeEach(done => {

        joe = new User({ name: 'Joe'});

        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {

        operation
            .then(() => User.find({}))
            .then(users => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('updates instance sets and save', done => {

        joe.set('name', 'Alex');
        assertName(joe.save(), done);
            
    });

    it('a model instance can update', done => {
       
        assertName(joe.update({ name: 'Alex' }), done);
    });
});