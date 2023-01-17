//verif quantité != 0 et au dessus de 100 et <100
//ajouter produit au local storage(inspecter / appli / local storage clé  et  valeur)

//je cherche l'id de l'url du produit
var queryStringUrlId = window.location.search;
//console.log(queryStringUrlId)

//je récupere l'id de l'url avec .get
let urlSearchParams = new URLSearchParams(queryStringUrlId);
//console.log(urlSearchParams)

let urlId = urlSearchParams.get("id");
//console.log(urlId)

//via fetch, je récupere les datas du produits avec l'id
fetch(`http://localhost:3000/api/products/${urlId}`)
    .then((data) => {
        return data.json();
    }).then((completeData) => {
        console.log(completeData);

        //querySelector() retourne le premier Element dans le document correspondant au sélecteur
        //création et initialisation dans baliseImg => ajout de baliseImg à l'élément .item__img
        let baliseImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(baliseImg);
        //console.log(document.querySelector(".item__img").appendChild(baliseImg));
        baliseImg.src = completeData.imageUrl;
        baliseImg.alt = completeData.altTxt;
        //console.log(baliseImg.alt)

        let baliseH1 = document.getElementById("title");
        baliseH1.innerText = completeData.name;
        //console.log(baliseH1)

        let baliseSpan = document.getElementById("price");
        baliseSpan.innerText = completeData.price;
        //console.log(baliseSpan)

        let baliseDescription = document.getElementById("description");
        baliseDescription.innerText = completeData.description;
        //console.log(baliseDescription)

        let baliseCouleur = document.querySelector("#colors");
        //boucle qui renvoie le nombre de couleur dispo dans l'élément option 
        for (let i = 0; i < completeData.colors.length; i++) {
            let optCouleur = document.createElement("option");
            optCouleur.textContent = completeData.colors[i];
            optCouleur.value = completeData.colors[i];
            baliseCouleur.appendChild(optCouleur);
        }


    }).catch((error) => {
        console.log(error);
    })


//détecter les click sur les btn selection couleur quantité et ajouter au panier 
const button = document.querySelector('#addToCart');
button.addEventListener('click', (event) => {
    event.preventDefault();
    // alert('Bouton cliqué')
    let baliseCouleur = document.querySelector("#colors");
    let choixCouleur = baliseCouleur.value;
    let productQuantity = document.querySelector("#quantity").value;

    console.log(`couleur : ${choixCouleur} - Quantité :  ${productQuantity}`);

    //creation du produit qui sera ajouté au panier
    let article = {
        id: urlId,
        color: choixCouleur,
        quantity: parseInt(productQuantity),
    };

    //vérife que l'user a bien séléctionné une couleur et une quantité comprise entre 1 et 100
    if (article.color == '') {
        alert('Vous devez choisir une couleur')
    } else if (article.quantity < 1 || article.quantity > 100) {
        alert('Vous devez choisir une quantité entre 1 et 100')
    } else {


        //si la donnée n'existe pas (null), je return un panier vide (tableau vide)
        let panierStorage = JSON.parse(localStorage.getItem("panier"));
        if (panierStorage == null) {
            panierStorage = [];
        }

        //à l'aide d'une variable temoin, dans la boucle => vérif si l'article est déjà présent dans l'index du panier (id et color de l'article)
        let temoin = false;
        panierStorage.forEach((oneArticle, index) => {
            if (article.id == oneArticle.id && article.color == oneArticle.color) {
                panierStorage[index].quantity += article.quantity;
                temoin = true;
            }
        });

        //si l'article existe dans le localstorage, on l'ajoute au panier 
        if (temoin == false) {
            panierStorage.push(article);
        }

        //le panier (clé) est dans le local storage 
        localStorage.setItem("panier", JSON.stringify(panierStorage));
        alert("L'article est ajouté au panier")
    }
})








