const request = require('supertest');
const { before } = require('mocha')
const { expect } = require('chai');

const express = require('express');
const bodyParser = require("body-parser");

const db = require('../db')
require("dotenv").config();

const partyRouter = require('./party');
const userRouter = require('./user');


describe('/user', function () {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/party', partyRouter);
  app.use('/user', userRouter);

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
      const response = await request(app).get('/user/ping');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('pong');
    });
  });

  describe('GET /party', function () {
    it('should return the user\'s current party', async function () {
      // create a party to join
      const partyResponse = await request(app)
        .post('/party/create')
        .send({
          host: 'testUser1',
          name: 'testPartyGETusers',
          type: 'remote',
        })
        .set('Content-Type', 'application/json')
      const party_id = partyResponse.body.party.id

      users = ['testUserGet2', 'testUserGet3', 'testUserGet4']

      // join the party with users
      await Promise.all(
        users.map(async (u) => {
          await request(app)
            .post('/party/join')
            .send({
              user: u,
              party_id: party_id,
            })
        })
      )

      // get the user's party
      const checkResponse = await request(app)
        .get('/user/party')
        .query({ user: 'testUserGet2' })
      expect(checkResponse.body.party.id).to.equal(party_id);
    });
  });

});