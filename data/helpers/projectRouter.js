const express = require("express");
const db = require("./projectModel");

const router = express.Router();

router.get('/', (req, res) => {
    db.get(req.query)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.error(error.message);
      res.status(500).json({
        message: 'Error retrieving the projects',
      })
    })
  });

router.get('/:id', (req, res) => {
    db.get(req.params.id)
    .then(project => {
        if(project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'project not found' })
        }
    })
    .catch(error => {
        console.error(error.message);
        res.status(500).json({
            message: "error retrieving the project"
        })
    })
})

router.post('/', (req, res) => {
    db.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(error => {
        console.error(error.message);
        res.status(500).json({
            message: 'Error adding the project'
        })
    })
});

router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'the project has been removed' });
        } else {
            res.status(404).json({ message: 'the project could not be found' });
        }
    })
    .catch(error => {
        console.error(error.message);
        res.status(500).json({
            errorMessage: 'error deleting the project'
        })
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    db.update(req.params.id, changes)
    .then(project => {
        if(project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'project not found' })
        }
    })
    .catch(error => {
        console.error(error.message);
        res.status(500).json({
            errorMessage: 'error updating the project'
        })
    })
})

router.get("/:id", (req, res) => {
    db.getProjectActions(project_id) 
    .then(project => {
        if(project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'project not found' })
        }
    })
    .catch(error => {
        console.error(error.message);
        res.status(500).json({
          message: 'Error retrieving the project actions',
        });
      });
})

module.exports = router;