process.env.NODE_ENV = 'test';
let chai = require('chai')
let mongoose = require("mongoose");
let Note = require('../../api/models/noteModel');
const { expect } = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Notes', () => {
    afterEach((done) => { //Before each test we empty the database
        Note.deleteOne({}, (err) => {
           done();
        });
    });

    describe('/GET homepage', () => {
        it('it should render the homepage', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });  
        })  
    });

    describe('/POST create note', () => {
        it('it should Create a new note', (done) => {
        chai.request(server)
            .post('/create')
            .send({note : "test"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql(null)
                res.body.should.have.property('url').be.a('string')
                done();
            });
        });
    });

    describe('/GET read a note?', () => {
        it('it should rendere a page', (done) => {
        chai.request(server)
            .get('/read/test/test')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET destroy a note', () => {
        it('it should destroy a note', (done) => {
        chai.request(server)
            .get('/read/test/test/destroy')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
});
