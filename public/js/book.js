function onSave(f) {
	if(f.name.value.trim() == "") {
		alert('도서명을 입력해주세요.');
		f.name.focus();
		return false;
	}
	return true;
}


function onRemove(id) {
	if(confirm('삭제하시겠습니까?')) {
		location.href = '(/list-route/remove/)'+id;
	}
}