// variable contenant la chaine des paramètres de l'url
var queryStringUrlId = window.location.search;

// récupèration de l'id de l'url avec .get
let urlSearchParams = new URLSearchParams(queryStringUrlId);
let id = urlSearchParams.get("id");

// utilisation de fetch, récupèration des données du produits avec l'id
fetch(`http://localhost:3000/api/products/${id}`)
    .then((data) => {
        return data.json();
    }).then((completeData) => {
        console.log(completeData);

        // création de l'élément img, initialisation de la variable baliseImg et on ajoute baliseImg à l'élément portant la class .item__img
        let baliseImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(baliseImg);
        baliseImg.src = completeData.imageUrl;
        baliseImg.alt = completeData.altTxt;

        let baliseH1 = document.getElementById("title");
        baliseH1.innerText = completeData.name;

        let baliseSpan = document.getElementById("price");
        baliseSpan.innerText = completeData.price;

        let baliseDescription = document.getElementById("description");
        baliseDescription.innerText = completeData.description;

        let baliseCouleur = document.querySelector("#colors");

        // la boucle for renvoie le nombre de couleur disponible dans l'élément option 
        for (let i = 0; i < completeData.colors.length; i++) {
            let optCouleur = document.createElement("option");
            optCouleur.textContent = completeData.colors[i];
            optCouleur.value = completeData.colors[i];
            baliseCouleur.appendChild(optCouleur);
        }


    }).catch((error) => {
        console.log(error);
    })

// utilisation de addEventListener pour détecter le clic de l'utilisateur sur le bouton ajouter au panier 
// preventDefault fait en sorte que l'action par defaut de l'event ne soit pas pris en compte par le navigateur
const button = document.querySelector('#addToCart');
button.addEventListener('click', (event) => {
    event.preventDefault();
    let baliseCouleur = document.querySelector("#colors");
    let choixCouleur = baliseCouleur.value;
    let productQuantity = document.querySelector("#quantity").value;

    console.log(`couleur : ${choixCouleur} - Quantité :  ${productQuantity}`);

    // creation d'un objet article et parseInt convertit une chaine en nombre entier     
    let article = {
        id: id,
        color: choixCouleur,
        quantity: parseInt(productQuantity),
    };

    // condition pour vérifier que l'utilisateur a bien séléctionné une couleur et une quantité comprise entre 1 et 100
    if (article.color == '') {
        alert('Vous devez choisir une couleur')
    } else if (article.quantity < 1 || article.quantity > 100) {
        alert('Vous devez choisir une quantité entre 1 et 100')
    } else {
        // panierStorage contient l'objet localStorage qui permet de manipuler les données, utilisation de JSON.parse() pour convertir du JSON en objet JS et avec getItem je récupère la clé panier
        let panierStorage = JSON.parse(localStorage.getItem("panier"));
        // condition si la donnée n'existe pas, on retourne un tableau
        if (panierStorage == null) {
            panierStorage = [];
        }
        // à l'aide d'une variable temoin dans la boucle forEach, on vérifie si l'article est déjà présent dans l'index du panier
        // si présent, on retourne temoin true
        let temoin = false;
        panierStorage.forEach((oneArticle, index) => {
            if (article.id == oneArticle.id && article.color == oneArticle.color) {
                panierStorage[index].quantity += article.quantity;
                temoin = true;
            }
        });

        // si temoin false, on ajoute l'article au panier 
        if (temoin == false) {
            panierStorage.push(article);
        }

        // panier est mis à jour dans le localStorage et on convertit panierStorage qui est un objet javascript en JSON avec JSON.stringify 
        localStorage.setItem("panier", JSON.stringify(panierStorage));
        alert(`${article.quantity}` + " Article(s) ajouté(s) au panier")
    }
})








