
const news_url = "http://localhost:2000/news_test";
const detail_url =  "http://localhost:2000/news/";

async function GetAllContentNews(url) {
  // Storing response
  const response = await fetch(url);
  // Storing data in form of JSON
  var data = await response.json();
  //console.log(data);
  if (response) {
    //hideloader();
  }
  ShowALLContentNews(data)
}

GetAllContentNews(news_url)

  function ShowALLContentNews(data) {
	var table = ``
    for (let key of data){
		console.log(key)
		table += `
      <div class="card" style="width: 18rem; float: left; margin-right: 10px; margin-top:10px;">
        <img src="${key.frontmatter.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${key.frontmatter.title}</h5>
          <p class="card-text">${key.frontmatter.summary}</p> 
          <div id="${key.slug}">
            <a href="#" onclick="GetDetailContentNews(1)" class="btn btn-primary">More</a>
            <el-button @click="visible=true">More</el-button>
          </div>
        </div>
        <script>
          new Vue({
            el: '#${key.slug}',
            data: function() {
            return { visible: false }
            }
          }) 
          </script>
       </div>`
      ;
	}

	table += "";
	document.getElementById("Naki").innerHTML = table;
}

async function GetDetailContentNews(id) {
  const uri = detail_url + "ebony"
  
  const response = await fetch(uri);

  var data = await response.json();

  ShowDetailContentNews()
  console.log(data)  
  //var content = `<hr></hr>`
  //document.getElementById("Naki").innerHTML = content;
}


function ShowDetailContentNews(){
	var table = ``
    
	table += `
    <el-dialog :visible.sync="visible" title="test" width="90%">
            
    <div class="row">
      <div class="col-4">
        <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end">
          <nav class="nav nav-pills flex-column">
            <a class="nav-link" href="#item-1">Item 1</a>
            <nav class="nav nav-pills flex-column">
              <a class="nav-link ms-3 my-1" href="#item-1-1">Item 1-1</a>
              <a class="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
            </nav>
            <a class="nav-link" href="#item-2">Item 2</a>
            <a class="nav-link" href="#item-3">Item 3</a>
            <nav class="nav nav-pills flex-column">
              <a class="nav-link ms-3 my-1" href="#item-3-1">Item 3-1</a>
              <a class="nav-link ms-3 my-1" href="#item-3-2">Item 3-2</a>
            </nav>
          </nav>
        </nav>
      </div>
    
      <div class="col-8">
        <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0">
          <div id="item-1">
            <h4>Item 1</h4>
            <p>...</p>
          </div>
          <div id="item-1-1">
            <h5>Item 1-1</h5>
            <p>...</p>
          </div>
          <div id="item-1-2">
            <h5>Item 1-2</h5>
            <p>...</p>
          </div>
          <div id="item-2">
            <h4>Item 2</h4>
            <p>...</p>
          </div>
          <div id="item-3">
            <h4>Item 3</h4>
            <p>...</p>
          </div>
          <div id="item-3-1">
            <h5>Item 3-1</h5>
            <p>...</p>
          </div>
          <div id="item-3-2">
            <h5>Item 3-2</h5>
            <p>...</p>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>


    `;
	
	table += "";



	document.getElementById("Naki").innerHTML = table;

}