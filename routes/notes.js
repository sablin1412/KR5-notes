const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// GET /api/notes?title=... - список заметок с фильтром по заголовку (req.query)
router.get('/', notesController.getNotes);

// GET /api/notes/:id - одна заметка (req.params)
router.get('/:id', notesController.getNoteById);

// POST /api/notes - создать заметку (body)
router.post('/', notesController.createNote);

// PUT /api/notes/:id - обновить заметку
router.put('/:id', notesController.updateNote);

// DELETE /api/notes/:id - удалить заметку
router.delete('/:id', notesController.deleteNote);

module.exports = router;
