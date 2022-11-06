const { expect } = require('chai');
const express = require('express');
const mongoose = require('mongoose');
const { PartyModel } = require('../models/party');
const { PostModel } = require('../models/post');

const router = express.Router();

// sanity check
router.get('/ping', (req, res) => {
  res.send('pong')
})

// Create a party
router.post('/create', async (req, res) => {
  // Retrieves all followers of a user
  const { host, name, type } = req.body;
  console.log(host, name, type);
  console.log(req);
  if (host && name && type) {
    try {
      const newParty = new PartyModel({ host, name, type });
      await newParty.save();
      res.status(200).json({
        party: {
          ...newParty.toJSON(),
          id: newParty._id,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).send('database error');
    }
  } else {
    res.status(400).send('requires params: host, name, type')
  }
});

router.get('/', async (req, res) => {
  const { party_id } = req.query;
  if (party_id) {
    try {
      const party = await PartyModel.findById(party_id);

      if (party) {
        res.status(200).json({
          'party': {
            ...party.toJSON(), id: party._id
          }
        });
      } else {
        res.status(204).json({
          'party': undefined
        })
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('database error');
    }
  } else {
    res.status(400).send('requires params: party_id')
  }
});

router.post('/remove', async (req, res) => {
  const { party_id } = req.body;
  if (party_id) {
    try {
      await PartyModel.deleteOne({ _id: party_id })
      res.status(200).send('deleted')
    } catch (e) {
      console.error(e);
      res.status(500).send('database error')
    }
  } else {
    res.status(400).send('requires params: party_id')
  }
})

router.post('/join', async (req, res) => {
  const {user, party_id} = req.body;
  if(user && party_id) {
    try {
      let party = await PartyModel.findById(party_id);
      if(party) {
        party.attendees.push(user);
        await party.save();
        res.status(200).send()
      } else {
        res.status(400).send('no party found')
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('database error');
    }
  } else {
    res.status(400).send('requires params: user, party_id')
  }
})

router.post('/leave', async (req, res) => {
  const {user, party_id} = req.body;
  if(user && party_id) {
    try {
      let party = await PartyModel.findById(party_id);
      if(party) {
        party.attendees = party.attendees.filter(x => x != user)
        await party.save();
        res.status(200).send()
      } else {
        res.status(400).send('no party found')
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('database error');
    }
  } else {
    res.status(400).send('requires params: user, party_id')
  }
})

router.get('/users', async (req, res) => {
  const { party_id } = req.query;
  if (party_id) {
    try {
      const party = await PartyModel.findById(party_id);

      if (party) {
        res.status(200).json({
          'users': party.attendees
        });
      } else {
        res.status(204).json({
          'party': undefined
        })
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('database error');
    }
  } else {
    res.status(400).send('requires params: party_id')
  }
});

module.exports = router;
