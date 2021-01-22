"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../modules/mysql-conn'),
    connection = _require.connection;

var numeral = require('numeral'); //도시 리스트


router.get('/', function (req, res) {
  var sql = 'SELECT * FROM books ORDER BY id ASC';

  var onQuery = function onQuery(err, r) {
    res.render('list/create', {
      file: 'list',
      data: r
    });
  };

  connection.query(sql, onQuery);
}); //도시 등록

router.get('/list', function (req, res) {
  res.render('list/create', {
    file: 'list'
  });
}); //도시 등록(저장)

router.post('/save', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      writer = _req$body.writer,
      wdate = _req$body.wdate;
  var sql = "INSERT INTO books SET name=?, writer=?, wdate=?";
  var value = [name, writer, wdate];

  var onQuery = function onQuery(err, r) {
    res.redirect('/list');
  };

  connection.query(sql, value, onQuery);
}); //도시 삭제

router.get('/remove/:id', function (req, res) {
  var sql = 'DELETE FROM books WHERE id=' + req.params.id;

  var onQuery = function onQuery(err, r) {
    res.redirect('/list');
  };

  connection.query(sql, onQuery);
}); // 도시 수정

router.get('/update/:id', function (req, res) {
  var sql = 'SELECT * FROM books WHERE id=' + req.params.id;

  var onQuery = function onQuery(err, r) {
    res.render('list/update', {
      file: 'list',
      r: r[0]
    });
  };

  connection.query(sql, onQuery);
});
router.post('/update', function (req, res) {
  var _req$body2 = req.body,
      name = _req$body2.name,
      writer = _req$body2.writer,
      wdate = _req$body2.wdate,
      id = _req$body2.id;
  var sql = 'UPDATE books SET name=?,writer=?,wdate=? WHERE id=?';
  var value = [name, writer, wdate, id];

  var onQuery = function onQuery(err, r) {
    res.redirect('/list');
  };

  connection.query(sql, value, onQuery);
});
module.exports = router;