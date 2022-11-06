const request = require('supertest');
const { before } = require('mocha')
const { expect } = require('chai');

const express = require('express');
const bodyParser = require("body-parser");

const db = require('../db')
require("dotenv").config();

const partyRouter = require('./party');


describe('/party router', function () {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(partyRouter);

  before(async function () {
    // initialize database connection
    if (!db.checkConnection()) {
      await db.initializeConnection();
    }
  });

  const testParty = {
    host: 'testUser1',
    name: 'testParty1',
    type: 'remote',
  }

  describe('GET /ping', function () {
    it('should respond with a \"pong\"', async function () {
      const response = await request(app).get('/ping');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('pong');
    });
  });

  describe('POST /create', function () {
    it('should return a created party', async function () {
      // send request
      const response = await request(app)
        .post('/create')
        .send(testParty)
        .set('Content-Type', 'application/json')

      // verify response
      expect(response.status).to.equal(200);
      expect(response.type).to.match(/json/);
      expect(response.body).to.have.key('party');

      // validate party data
      party = response.body.party;
      expect(party).to.include.keys(['id', 'name', 'type', 'host', 'attendees'])
      expect(party.id).to.not.be.null;
      expect(party.id).to.not.be.undefined;

      testParty.id = party.id;
    });
  });

  describe('GET /', function () {
    it('should find a party by id', async function () {
      // send request
      const response = await request(app)
        .get('/')
        .query({ party_id: testParty.id })

      expect(response.status).to.equal(200);
      expect(response.type).to.match(/json/);
      expect(response.body).to.have.key('party');

      party = response.body.party
      fields = ['host', 'name', 'type']
      fields.forEach(f => {
        expect(party[f]).to.equal(testParty[f]);
      });
    })
  });

  describe('POST /remove', function () {
    it('should remove the party from the database', async function () {
      // send request
      const response = await request(app)
        .post('/remove')
        .send({ party_id: testParty.id })
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(200);

      // try to retrieve 
      const response2 = await request(app)
        .get('/')
        .query({ party_id: testParty.id })

      expect(response2.status).to.equal(204);
    })
  })

  describe('POST /join', function () {
    it('should add a user to the attendees list', async function () {
      // create a party to join
      const partyResponse = await request(app)
        .post('/create')
        .send({
          host: 'testUser1',
          name: 'testParty2',
          type: 'remote',
        })
        .set('Content-Type', 'application/json')
      const party_id = partyResponse.body.party.id

      // join the party with another user
      await request(app)
        .post('/join')
        .send({
          user: 'testUser2',
          party_id: party_id,
        })

      // get the party and check details
      const checkResponse = await request(app)
        .get('/')
        .query({ party_id: party_id })
      expect(checkResponse.body.party.attendees).to.contain('testUser2')
    })
  })

  describe('POST /leave', function () {
    it('should remove a user from a party\'s attendees list', async function () {
      // create a party to join
      const partyResponse = await request(app)
        .post('/create')
        .send({
          host: 'testUser1',
          name: 'testParty3',
          type: 'remote',
        })
        .set('Content-Type', 'application/json')
      const party_id = partyResponse.body.party.id

      // join the party with a user
      await request(app)
        .post('/join')
        .send({
          user: 'testUser2',
          party_id: party_id,
        })

      // leave the party
      const leaveRequest = await request(app)
        .post('/leave')
        .send({
          user: 'testUser2',
          party_id: party_id,
        })
      expect(leaveRequest.status).to.equal(200);

      // get the party and check details
      const checkResponse = await request(app)
        .get('/')
        .query({ party_id: party_id })
      expect(checkResponse.body.party.attendees).to.not.contain('testUser2')
    })
  });

  describe('GET /users', function () {
    it('should return all attendees of a party', async function () {
      // create a party to join
      const partyResponse = await request(app)
        .post('/create')
        .send({
          host: 'testUser1',
          name: 'testPartyGETusers',
          type: 'remote',
        })
        .set('Content-Type', 'application/json')
      const party_id = partyResponse.body.party.id

      users = ['testUser2', 'testUser3', 'testUser4']

      // join the party with users
      await Promise.all(
        users.map(async (u) => {
          await request(app)
            .post('/join')
            .send({
              user: u,
              party_id: party_id,
            })
        })
      )

      // leave the party with a user
      const leaveRequest = await request(app)
        .post('/leave')
        .send({
          user: 'testUser3',
          party_id: party_id,
        })
      expect(leaveRequest.status).to.equal(200);

      // get the party and check details
      const checkResponse = await request(app)
        .get('/users')
        .query({ party_id: party_id })
      expect(checkResponse.body.users).to.deep.equal(['testUser2', 'testUser4'])
    })
  })

});