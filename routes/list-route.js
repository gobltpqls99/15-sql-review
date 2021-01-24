const express = require('express');
const router = express.Router();
const { connection } = require('../modules/mysql-conn');
const numeral = require('numeral');


//도시 리스트
router.get('/', (req, res) => {
	const sql = 'SELECT * FROM books ORDER BY id ASC';
	const onQuery = (err, r) => {
		res.render('book/create', { file: 'book', data: r });
	}
	connection.query(sql, onQuery);
});


//도시 등록
router.get('/create', (req, res) => {
	res.render('book/create', { file: 'book' });
});


//도시 등록(저장)
router.post('/save', (req, res) => {
	const { name, writer, wdate } = req.body;
	const sql = "INSERT INTO books SET name=?, writer=?, wdate=?";
	const value = [ name, writer, wdate ];
	const onQuery = (err, r) => {
		res.redirect('/book');
	}
	connection.query(sql, value, onQuery);
});

//도시 삭제
router.get('/remove/:id', (req, res) => {
	const sql = 'DELETE FROM books WHERE id='+req.params.id;
	const onQuery = (err, r) => {
		res.redirect('/book');
	}
	connection.query(sql, onQuery);
});







// 도시 수정
router.get('/update/:id', (req, res) => {
	const sql = 'SELECT * FROM books WHERE id='+req.params.id;
	const onQuery = (err, r) => {
		res.render('book/update', { file: 'books', r: r[0] });
	}
	connection.query(sql, onQuery);
});

router.post('/update', (req, res) => {
	const { name, writer, wdate, id } = req.body;
	const sql = 'UPDATE books SET name=?,writer=?,wdate=? WHERE id=?';
	const value = [ name, writer, wdate, id ];
	const onQuery = (err, r) => {
		res.redirect('/book');
	}
	connection.query(sql, value, onQuery);
});

module.exports = router;