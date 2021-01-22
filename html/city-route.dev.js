"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../modules/mysql-conn'),
    connection = _require.connection;

var numeral = require('numeral'); // 도시 리스트


router.get('/', function (req, res) {
  var sql = 'SELECT * FROM books ORDER BY name ASC';

  var onQuery = function onQuery(err, r) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = r[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var v = _step.value;
        v.writer = numeral(v.writer).format('0,0');
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    res.render('list/create', {
      file: 'list',
      data: r
    });
  };

  connection.query(sql, onQuery);
}); // 도시 등록

router.get('/create', function (req, res) {
  res.render('list/create', {
    file: 'list'
  });
}); // 도시 등록(저장)

router.post('/save', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      writer = _req$body.writer,
      sdate = _req$body.sdate;
  var sql = "INSERT INTO books SET name=?,writer=?,sdate=?";
  var value = [name, writer, sdate];

  var onQuery = function onQuery(err, r) {
    res.redirect('/list');
  };

  connection.query(sql, value, onQuery);
}); // 도시 삭제

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
      file: 'city',
      r: r[0]
    });
  };

  connection.query(sql, onQuery);
});
router.post('/update', function (req, res) {
  var _req$body2 = req.body,
      name = _req$body2.name,
      writer = _req$body2.writer,
      sdate = _req$body2.sdate;
  var sql = 'UPDATE city SET name=?,writer=?,sdate=?';
  var value = [name, writer, sdate];

  var onQuery = function onQuery(err, r) {
    res.redirect('/list');
  };

  connection.query(sql, value, onQuery);
});
module.exports = router;