const express = require('express');
const app = express();
const port = 3000;

// Lista de usuarios de ejemplo
const usuarios = [
  { id: 1, username: 'sa.gonzalezg', password: '2345' },
  { id: 2, username: 'na.quintana', password: '9658' },
];

// Ruta para obtener la lista de usuarios
app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.put('/api/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;

  const index = usuarios.findIndex((user) => user.id === userId);

  if (index !== -1) {
    usuarios[index] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});