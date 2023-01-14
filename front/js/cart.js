var queryStringUrlId = window.location.search;

//je récupere l'id de l'url avec .get
let urlSearchParams = new URLSearchParams(queryStringUrlId);

let urlId = urlSearchParams.get("id");

let panierStorage = JSON.parse(localStorage.getItem("panier"));
panierStorage.forEach((panier, index) => {
    console.log(panierStorage);


    fetch(`http://localhost:3000/api/products/${panierStorage[index].id}`)
        .then((data) => {
            return data.json();
        }).then((completeData) => {
            console.log(completeData);

            //affiche panier
            let articlePanier = document.querySelector("#cart__items");

            let baliseArticle = document.createElement("article");
            baliseArticle.className = "cart__item";
            baliseArticle.setAttribute("data-id", panierStorage[index].id);
            baliseArticle.setAttribute("data-color", panierStorage[index].color);
            console.log(baliseArticle.setAttribute("data-id", panierStorage[index].id));
            articlePanier.appendChild(baliseArticle);

            let divPanierImg = document.createElement("div");
            baliseArticle.appendChild(divPanierImg);
            divPanierImg.className = "cart__item__img";

            let baliseImg = document.createElement("img");
            baliseImg.src = completeData.imageUrl;
            baliseImg.alt = completeData.altTxt;
            divPanierImg.appendChild(baliseImg);
            console.log(baliseImg);

            let divPanierContenuDescription = document.createElement("div");
            baliseArticle.appendChild(divPanierContenuDescription);
            divPanierContenuDescription.className = "cart__item__content__description";

            let divPanierContenu = document.createElement("div");
            baliseArticle.appendChild(divPanierContenu);
            divPanierContenu.className = "cart__item__content";

            let baliseH2 = document.createElement("h2");
            divPanierContenuDescription.appendChild(baliseH2);
            baliseH2.innerText = completeData.name;

            let baliseCouleur = document.createElement("p");
            divPanierContenuDescription.appendChild(baliseCouleur);
            baliseCouleur.textContent = panierStorage[index].color;

            let balisePrice = document.createElement("p");
            divPanierContenuDescription.appendChild(balisePrice);
            balisePrice.innerText = completeData.price + " €";

            let divParamContenu = document.createElement("div");
            baliseArticle.appendChild(divParamContenu);
            divParamContenu.className = "cart__item__content__settings";

            let divParamContenuQuantite = document.createElement("div");
            divParamContenu.appendChild(divParamContenuQuantite);
            divParamContenuQuantite.className = "cart__item__content__settings__quantity";

            let baliseQuantite = document.createElement("p");
            baliseQuantite.textContent = "Qté: ";
            divParamContenuQuantite.appendChild(baliseQuantite);

            let inputQuantity = document.createElement("input");
            inputQuantity.value = panierStorage[index].quantity;
            inputQuantity.className = "inputQuantity";
            inputQuantity.setAttribute("type", "number");
            inputQuantity.setAttribute("name", "inputQuantity");
            inputQuantity.setAttribute("min", "1");
            inputQuantity.setAttribute("max", "100");
            divParamContenuQuantite.appendChild(inputQuantity);

            let divParamContenuEffacer = document.createElement("div");
            divParamContenu.appendChild(divParamContenuEffacer);
            divParamContenuEffacer.className = "cart__item__content__settings__delete";

            let baliseEffacer = document.createElement("p");
            baliseEffacer.className = "deleteItem";
            baliseEffacer.textContent = "Supprimer";
            divParamContenuEffacer.appendChild(baliseEffacer);

            let spanQuantity = document.getElementById("totalQuantity");
            spanQuantity.innerText = recupTotalQuantity();

            /*
                        let price = completeData.price;
                        let quantity = parseInt(completeData.value);
                        let total = 0;
                        let panier = recupPanier();
            
                        for (let kanap of panier) {
                            total += kanap.quantity * kanap.price;
                        }
                        console.log(total);
            */

            let spanPrice = document.getElementById("totalPrice");
            spanPrice.innerText = JSON.stringify(recupPanier());
            console.log(spanPrice.innerText);


            let btnSupp = document.getElementsByClassName("deleteItem");
            console.log(btnSupp);

            console.log(recupPanier());
            console.log(recupTotalQuantity());


        }).catch((error) => {
            console.log(error);
        })



})

//je recupere le contenu de la clé panier dans une variable panier
//si la donnée n'existe pas => null alors je return un panier vide (tableau vide) 
//sinon panier existe, je retourne mon panier et JSON.parse() transforme la chaine de caractere en objet ou tableau
function recupPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier);
    }
}

//pour retourner la quantité de produit du panier
function recupTotalQuantity() {
    let panier = recupPanier();
    let nombre = 0;
    for (let product of panier) {
        nombre += product.quantity;
    }
    return nombre;
}

function recupTotalPrix() {
    let panier = recupPanier();
    let total = 0;
    for (let product of panier) {
        total += product.quantity * product.price;
    }
    return total;
}
console.log(recupTotalPrix());