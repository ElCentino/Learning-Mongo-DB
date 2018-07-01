const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    
    it('creates a subdocument', done => {

        const joe = new User({
            name: 'Joe',
            posts: [
                {
                    title: 'Post Title'
                }
            ] 
        });

        joe.save() 
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(user.posts[0].title === 'Post Title');
                done();
            });
    });

    it('Can add subdocuments to an existing record', done => {

        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {

                user.posts.push({
                    title: 'New Post'
                });

                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('Can remove subdocuments from an existing record - My Way', done => {

        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {

                user.posts.push({
                    title: 'New Post'
                });

                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {

                user.posts.splice(0, 1);

                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {

                assert(!user.posts[0]);
                done();
            });
    });

    it('can remove an existing subdocument', done => {

        const joe = new User({
            name: 'Joe',
            posts: [
                {
                    title: 'New Title'
                }
            ]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {

                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {

                assert(user.posts.length === 0);
                done();
            });
    });
});