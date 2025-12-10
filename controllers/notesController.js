const { v4: uuidv4 } = require('uuid');

// Простое "хранилище" заметок в памяти
let notes = [
  { id: '1', title: 'Первая заметка', content: 'Текст первой заметки' },
  { id: '2', title: 'Вторая заметка', content: 'Текст второй заметки' }
];

// GET /api/notes
// Поддерживает ?title=часть_заголовка
exports.getNotes = (req, res) => {
  const { title } = req.query;

  let result = notes;

  if (title) {
    const lowerTitle = title.toLowerCase();
    result = result.filter((note) =>
      note.title.toLowerCase().includes(lowerTitle)
    );
  }

  res.json(result);
};

// GET /api/notes/:id
exports.getNoteById = (req, res) => {
  const { id } = req.params;
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ message: 'Заметка не найдена' });
  }

  res.json(note);
};

// POST /api/notes
exports.createNote = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: 'Поля title и content обязательны' });
  }

  const newNote = {
    id: uuidv4(),
    title,
    content
  };

  notes.push(newNote);

  res.status(201).json(newNote);
};

// PUT /api/notes/:id
exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const noteIndex = notes.findIndex((n) => n.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Заметка не найдена' });
  }

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: 'Поля title и content обязательны' });
  }

  notes[noteIndex] = { ...notes[noteIndex], title, content };

  res.json(notes[noteIndex]);
};

// DELETE /api/notes/:id
exports.deleteNote = (req, res) => {
  const { id } = req.params;

  const noteIndex = notes.findIndex((n) => n.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Заметка не найдена' });
  }

  const deleted = notes[noteIndex];
  notes = notes.filter((n) => n.id !== id);

  res.json({ message: 'Заметка удалена', note: deleted });
};
