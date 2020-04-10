const express = require("express");
const db = require("./actionModel");

const router = express.Router();

router.get('/', (req, res) => {
    db.get(req.query)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.error(error.message);
      res.status(500).json({
        message: 'Error retrieving the actions',
      })
    })
  });

  router.get('/:id', (req, res) => {
      db.get(req.params.id)
      .then(action => {
          if(action) {
              res.status(200).json(action);
          } else (
              res.status(404).json({ message: 'action not found' })
          )
      })
      .catch(error => {
          console.error(error.message);
          res.status(500).json({
              message: "error retrieving the action"
          })
      })
  })

  router.post('/', (req, res) => {
      db.insert(req.body)
      .then(action => {
          res.status(201).json(action);
      })
      .catch(error => {
          console.error(error.message);
          res.status(500).json({
              message: 'error adding the action'
          })
      })
  })

  router.delete('/:id', (req, res) => {
      db.remove(req.params.id)
      .then(count => {
          if (count > 0) {
              res.status(200).json({ message: 'the action has been removed' })
          } else {
              res.status(404).json({ message: 'the action could not be found' })
          }
      })
      .catch(error => {
          console.error(error.message);
          res.status(500).json({
              errorMessage: 'error deleting action'
          })
      })
  })

  router.put('/:id', (req, res) => {
      const changes = req.body
      db.update(req.params.id, changes)
      .then(action => {
          if(action) {
              res.status(200).json(action);
          } else {
              res.status(404).json({ message: 'action not found' })
          }
      })
      .catch(error => {
        console.error(error.message);
        res.status(500).json({
            errorMessage: 'error updating the project'
        })
    })
  })

module.exports = router;