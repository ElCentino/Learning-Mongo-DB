const assert = require('assert')
const User = require('../src/user')

describe('Updating Records', () => {

    let joe;

    beforeEach(done => {

        joe = new User({ name: 'Joe', postCount: 0 });

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

    it('a model class can update', done => {

        assertName(
            User.update({ name: 'Joe' }, { name: 'Alex'}),
            done
        );
    });

    it('a model class can find one and update', done => {

        assertName(
            User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
            done
        )
    });

    it('a model class can find an id and  update', done => {

        assertName(
            User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
            done
        )
    });

    xit('increments user\'s post count by one', done => {

        User.update({ name: 'Joe' }, { $inc: { postCount: 1 }})
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                assert(user.postCount === 1);
                done();
            });
    });
});