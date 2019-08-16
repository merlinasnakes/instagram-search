
var botonBuscar = document.getElementById('buscarHashtag');
botonBuscar.addEventListener('click', capturarInput);

function capturarInput() {
	var inputUsuario = document.getElementById('hashtagUsuario').value;

	traerImg (inputUsuario);

}

function traerImg (hashtag) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var infoImg = JSON.parse(this.responseText)

     console.log(infoImg);
     var edge = infoImg.graphql.hashtag.edge_hashtag_to_media.edges;

     var container = document.getElementById('container');
		while (container.firstChild) {
		    container.removeChild(container.firstChild);
		}

     for (var i = 0; i < edge.length; i++) {

     	var nodoLink = document.createElement('a');
     	nodoLink.setAttribute("href", infoImg.graphql.hashtag.edge_hashtag_to_media.edges[i].node.thumbnail_src);

     	var nodoIMG = document.createElement('img');
       	nodoIMG.setAttribute("src", infoImg.graphql.hashtag.edge_hashtag_to_media.edges[i].node.thumbnail_resources[0].src)
     	nodoLink.appendChild(nodoIMG);
    	container.appendChild(nodoLink); 
     	
     }


    }
 }
 	// aca se llama a open del xmlhttprequest. esto prepara el request al server
  xhttp.open("GET", "https://www.instagram.com/explore/tags/"+hashtag+"/?__a=1", true);
  // aca se llama al request al server, pero como es asincronico, no espera a que termine
  xhttp.send();
  // aca cuando haces console.log(xhttp), se mando el request pero todavia no termino.
  // para saber cuando termino de mandarse, se usa lo de arriba, el onreadystatechange


}


