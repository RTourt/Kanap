//recup id dans url (get param url)
//fetch pour recup un seul produit (produit qui correspond a l'id)
// afficher tte les info du produit sur la page
//
// detecter le click sur btn au panier
//verif quantité != 0 et au dessus de 100 et <100
// verif la couleur selectionner
//ajouter produit au local storage(inspecter / appli / local storage clé  et  valeur)

//je cherche l'id de l'url du produit
var queryStringUrlId = window.location.search;
console.log(queryStringUrlId);

//je récupere l'id de l'url
let urlSearchParams = new URLSearchParams(queryStringUrlId);
console.log(urlSearchParams);

let UrlId = urlSearchParams.get("id");
console.log(UrlId);

//Je récupere les infos du produits via l'id
fetch(`http://localhost:3000/api/products/${UrlId}`)
    .then((data) => {
        return data.json()
    }).then((completeData) => {
        console.log(completeData);

        //La méthode querySelector() retourne le premier Element dans le document correspondant au sélecteur
        //après avoir créer img et initialisé dans la baliseImgOnly
        //J'ajoute baliseImgOnly à l'élément .item__img
        let baliseImgOnly = document.createElement("img");
        document.querySelector(".item__img").appendChild(baliseImgOnly);
        //console.log(document.querySelector(".item__img").appendChild(baliseImgOnly));
        baliseImgOnly.src = completeData.imageUrl;
        console.log(baliseImgOnly.src);
        baliseImgOnly.alt = completeData.altTxt;
        //console.log(baliseImgOnly.alt);

        let baliseH1 = document.getElementById("title");
        baliseH1.innerText = completeData.name;
        //console.log(baliseH1);

        let baliseSpan = document.getElementById("price");
        baliseSpan.innerText = completeData.price;
        //console.log(baliseSpan);

        let baliseDescription = document.getElementById("description");
        baliseDescription.innerText = completeData.description;
        //console.log(baliseDescription);

        let baliseOption = document.getElementById("colors");

        //boucle qui renvoie le nombre de couleur dispo dans l'élément option 
        for (let i = [0]; i < completeData.colors.length; i++) {
            let optCouleur = document.createElement("option");
            optCouleur.textContent = completeData.colors[i];
            baliseOption.appendChild(optCouleur);
            //console.log(baliseOption.appendChild(optCouleur));
        }



    }).catch((error) => {
        console.log(error);
    })