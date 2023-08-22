// api url
const api_url = "http://localhost:2000/category";


async function GetAllCategory(url) {
		// Storing response
		const response = await fetch(url);
		// Storing data in form of JSON
		var data = await response.json();
		//console.log(data);
		if (response) {
			//hideloader();
		}
		ShowAllCategory(data)
}
	GetAllCategory(api_url);
function ShowAllCategory(data) {
	var table = ``
    for (let key of data){
		console.log(key)
		table += `<p>${key.category}</p>`;
	}

	table += "";
	document.getElementById("MenuRight").innerHTML = table;
}