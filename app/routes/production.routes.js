module.exports = app => {
    const production = require('../controllers/production.controllers');
    app.get("/api/submit/production", production.findAll);
    app.post("/api/submit/production",production.create);
    app.delete("/api/submit/production",production.delete)
    app.get("/api/submit/production/:customerId", production.findOne);
    app.put('/api/submit/production/:productionId',production.update);
    app.get("/api/getting/production",production.getmysql)
    app.get('/api/getting/production/:getimg',production.getimg)
    app.post('/api/getting/production',production.createImg)
  };