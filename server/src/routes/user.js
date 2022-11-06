const express = require('express');
const { PartyModel } = require('../models/party')

const router = express.Router()

// sanity check
router.get('/ping', (req, res) => {
  res.send('pong');
})

// get current party
router.get('/party', async (req, res) => {
  const { user } = req.query;
  if (user) {
    try {
      const party = await PartyModel.findOne({ attendees: user })

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
    res.status(400).send('requires params: user')
  }
})


module.exports = router;