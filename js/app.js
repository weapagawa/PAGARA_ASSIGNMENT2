// function displaymenu() {
//     $("#showmenu").show();
//
//     $.ajax({
//         url: 'http://127.0.0.1:5000/displaymenu',
//         type: "GET",
//         dataType: "json",
//         success: function (resp) {
//
//             if (resp.status === 'ok') {
//                 for (i = 0; i < resp.count; i++) {
//                     name = resp.entries[i].name;
//                     ingredients = resp.entries[i].ingredients;
//                     price = resp.entries[i].price;
//                     $("#showmenu").append(showmenu(name, ingredients, price));
//                 }
//             } else {
//                 $("#showmenu").html("");
//                 alert(resp.message);
//             }
//         }
//     });
// }
//
// function showmenu(name,ingredients, price){
//     return '<div class="table-wrapper">' +
//         '<table class="alt" id="tablenisya">' +
//         '<td>' + name + '</td>' +
//         '<td>' + ingredients + '</td>' +
//         '<td>' + price + ' Php ' +   '</td>' +
// 		"<td><a class='button small' class='wish' onclick='#();'>Order this</a><a data-toggle='modal' onclick='squarespaceModal' class='button small'>Brew</a></td>" +
//         '</div>' +
//         '</table>'
// }

function brewthis() {
	$.ajax(
		{
			url: 'http://127.0.0.1:5000/brewthis/',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
				'name': $("#name").val(),
                'coffee': $("#coffee").val(),
				'quantity': $("#quantity").val()
			}),
			type: "POST",
			dataType: "json",
			error: function (e) {
			},
			success: function (resp) {
                if (resp.status === 'ok') {
                	alert("Successfully posted!");
                     window.location.replace('brew_ok.html')

                 }
				else {
					alert("There must be wrong. Please review your form.")
				}

			}
		});
}

function displayorder() {
    $("#showorder").show();

    $.ajax({
        url: 'http://127.0.0.1:5000/displayorder/',
        type: "GET",
        dataType: "json",
        success: function (resp) {

            if (resp.status === 'ok') {
                for (i = 0; i < resp.count; i++) {
                    name = resp.entries[i].name;
                    coffee = resp.entries[i].coffee;
                    quantity = resp.entries[i].quantity;
                    $("#showorder").append(showorder(name, quantity));
                }
            } else {
                $("#showorder").html("");
                alert(resp.message);
            }
        }
    });
}

function showorder(name,quantity){
    return '<div class="table-wrapper">' +
        '<table class="alt" id="tablenisya">' +
        '<td>' + name + '</td>' +
        '<td>' + coffee + '</td>' +
        '<td>' + quantity + ' Cup of Coffee ' + '</td>' +
		// "<td><a data-toggle='modal' href='edit.html' class='button small'>Edit</a></td>" +
        '</div>' +
        '</table>'
}

function deleteorder() {
	$.ajax(
		{
			url: 'http://127.0.0.1:5000/deleteorder',
			contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                 'del': $("#del").val()
             }),
			type: "POST",
			dataType: "json",
			error: function (e) {
			},
			success: function (resp) {
                if (resp.status === 'ok') {
                	alert("Deleted!")
					window.location.replace('index.html')

                 }
				else {
					alert("ERROR")
				}

			}
		});
}

function editorder() {
	$.ajax(
		{
			url: 'http://127.0.0.1:5000/editorder',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
                'name': $("#name").val(),
                'coffee': $("#coffee").val(),
				'quantity': $("#quantity").val()
			}),
			type: "POST",
			dataType: "json",
			error: function (e) {
			},
			success: function (resp) {
                if (resp.status === 'ok') {
                	alert("Successfully Edited!")
                    window.location.replace('index.html')
                 }
				else {
					alert("There must be wrong. Please review your form.")
				}
			}
		});
}