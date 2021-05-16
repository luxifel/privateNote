'use strict';

const util = require('../helpers/utils');


var mongoose = require('mongoose'),
  Note = mongoose.model('Note');


exports.create_a_note = function(req, res) {
  const key = util.guid();
  const pass = util.guid();
  let plainTextNote = req.body.note;
  let note = util.encrypt(plainTextNote, key + pass);
  const url = (process.env.PUBLIC_URL || '') + `/read/${key}/${pass}`;
  var newNote = new Note(
    {
      key: key, 
      note: note
    }
  );
  newNote.save(function(err, resp) {
    if (err)
      res.json({error: 'Error creating note, please try again later.'});
    res.json({url, error: null});
  });
};

exports.read_a_note = function(req, res) {
  const {key, pass} = req.params;
  const query = Note.where({key : key})
  query.findOne(function(err, result) {
    let message = '';
    let note = null;
    if (err || !result) {
      message = 'Could not find note, perhaps it has already been destroyed?';
      res.render('read', {note, message});
    } else {
        const destroyUrl = `/read/${key}/${pass}/destroy`;
        res.render('areyousure', {destroyUrl});
    }
  });
};

exports.destroy_a_note = function(req, res) {
  const {key, pass} = req.params;
  const query = Note.where({key : key})
  query.findOneAndDelete((err, result)  => {
    let message = '';
    let note = null;
    if (err || !result) {
      message = 'Could not find note, perhaps it has already been destroyed?';
      res.render('read', {note, message});
    } else {
      note = util.decrypt(result.note, key + pass);
      const ascii = util.isASCII(key + pass);
      message = 'Note has been destroyed.';
      if (ascii) {
        res.render('read', {note, message});
      } else {
        message = 'Incorrect URL parameters. Note has been destroyed.'
        res.render('read', {note: null, message})
      }
    }
  });
}
