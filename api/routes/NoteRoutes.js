'use strict';
module.exports = function(app) {
  var noteController = require('../controllers/noteController');

  app.route('/')
      .get((req, res) => res.render('home'));

  app.route('/create')
    .post(noteController.create_a_note);

  app.route('/read/:key/:pass')
    .get(noteController.read_a_note)
    
  app.route('/read/:key/:pass/destroy')
    .get(noteController.destroy_a_note)
};
