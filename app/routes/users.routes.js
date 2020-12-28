module.exports = app => {
    const users = require('../controllers/users.controllers');
    app.post("/api/login", users.Login);
    app.get('/api/users',users.getAlluser)
  };