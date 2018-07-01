const assert = require('assert');
const { expect } = require('chai');
const User = require('../src/user');

describe('Finds a user and operates on it as an instance', () => {

    let joe;

    beforeEach(done => {

        joe = new User({
            name: 'Joe',
            postCount: 0
        });

        joe.save()
            .then(() => done());
    });

    it('Ensures that a user is present', done => {

        User.findOne({ name: 'Joe' })
            .then(user => {
                expect(user.name).to.equal('Joe');
                done();
            });
    });

    it('finds and deletes a user as an instance', done => {

        User.findOne({name: 'Joe'})
            .then(user => {
                user.remove()
                    .then(() => User.findOne({name: 'Joe'}))
                    .then(user => {
                        expect(user).to.equal(null);
                        done();
                    });
            });
    });
});

