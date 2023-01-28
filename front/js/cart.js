// variable contenant la chaine des paramètres de l'url
var queryStringUrlId = window.location.search;

// récupération de l'id de l'url avec .get
let urlSearchParams = new URLSearchParams(queryStringUrlId);
let id = urlSearchParams.get("id");

// déclaration d'un prix total à 0 par defaut
let totalPrice = 0;

// panierStorage contient la clé panier qui est dans le localStorage et on applique un JSON.parse() pour le convertir en objet JS
// getItem retourne la valeur associée à la clé panier dans le localStorage
// forEach permet d'itérer sur les propriétés de panierStorage (array) 
let panierStorage = JSON.parse(localStorage.getItem("panier"));
panierStorage.forEach((panier, index) => {
    console.table(panierStorage);

    // récupération des informations des produits du panier via l'id dans le localStorage 
    fetch(`http://localhost:3000/api/products/${panierStorage[index].id}`)
        .then((data) => {
            return data.json();
        }).then((completeData) => {
            console.log(completeData);

            // déclaration des variables pour rendre visible les éléments du panier
            let articlePanier = document.querySelector("#cart__items");

            let baliseArticle = document.createElement("article");
            baliseArticle.className = "cart__item";
            baliseArticle.setAttribute("data-id", panier.id);
            baliseArticle.setAttribute("data-color", panier.color);
            articlePanier.appendChild(baliseArticle);
            // console.log("data-color", panier.color);

            let divPanierImg = document.createElement("div");
            divPanierImg.className = "cart__item__img";
            baliseArticle.appendChild(divPanierImg);

            let baliseImg = document.createElement("img");
            baliseImg.src = completeData.imageUrl;
            baliseImg.alt = completeData.altTxt;
            divPanierImg.appendChild(baliseImg);

            let divPanierContenu = document.createElement("div");
            divPanierContenu.className = "cart__item__content";
            baliseArticle.appendChild(divPanierContenu);

            let divPanierContenuDescription = document.createElement("div");
            divPanierContenuDescription.className = "cart__item__content__description";
            divPanierContenu.appendChild(divPanierContenuDescription);

            let baliseH2 = document.createElement("h2");
            baliseH2.innerText = completeData.name;
            divPanierContenuDescription.appendChild(baliseH2);

            let baliseCouleur = document.createElement("p");
            baliseCouleur.textContent = panier.color;
            divPanierContenuDescription.appendChild(baliseCouleur);

            let balisePrice = document.createElement("p");
            balisePrice.innerText = completeData.price + " €";
            divPanierContenuDescription.appendChild(balisePrice);

            // calcul pour obtenir le prix total du panier
            // le prix unitaire de l'article * la quantité d'article dans le panier et le resultat de chaque article se cumule dans le prix total 
            totalPrice += completeData.price * panier.quantity;
            //console.log(totalPrice)

            let divParamContenu = document.createElement("div");
            divParamContenu.className = "cart__item__content__settings";
            baliseArticle.appendChild(divParamContenu);

            let divParamContenuQuantite = document.createElement("div");
            divParamContenuQuantite.className = "cart__item__content__settings__quantity";
            divParamContenu.appendChild(divParamContenuQuantite);

            let baliseQuantite = document.createElement("p");
            baliseQuantite.textContent = "Qté: ";
            divParamContenuQuantite.appendChild(baliseQuantite);

            let inputQuantity = document.createElement("input");
            inputQuantity.value = panier.quantity;
            inputQuantity.className = "inputQuantity";
            inputQuantity.setAttribute("type", "number");
            inputQuantity.setAttribute("name", "itemQuantity");
            inputQuantity.setAttribute("min", "1");
            inputQuantity.setAttribute("max", "100");
            divParamContenuQuantite.appendChild(inputQuantity);


            let divParamContenuEffacer = document.createElement("div");
            divParamContenuEffacer.className = "cart__item__content__settings__delete";
            divParamContenu.appendChild(divParamContenuEffacer);

            let baliseEffacer = document.createElement("p");
            baliseEffacer.className = "deleteItem";
            baliseEffacer.textContent = "Supprimer";
            divParamContenuEffacer.appendChild(baliseEffacer);

            // pour effectuer la suppression de l'article lors du click via splice et setItem met à jour le panier
            baliseEffacer.addEventListener("click", function () {
                panierStorage.splice(index, 1);
                localStorage.setItem("panier", JSON.stringify(panierStorage));
                alert("Le produit a été supprimé du panier");
                window.location.href = "cart.html";
            })

            // pour modifier la quantité de l'article
            inputQuantity.addEventListener("change", function () {
                panierStorage[index].quantity = parseInt(inputQuantity.value);
                localStorage.setItem("panier", JSON.stringify(panierStorage));
                alert("La quantité a été modifiée");
                window.location.href = "cart.html";
            })

            let spanQuantity = document.getElementById("totalQuantity");
            spanQuantity.innerText = recupTotalQuantity();
            console.log(recupTotalQuantity());

            let spanPrice = document.getElementById("totalPrice");
            spanPrice.innerText = totalPrice;
            console.log(spanPrice.innerText);


        }).catch((error) => {
            console.log(error);
        })

    // on recupere le contenu de la clé panier dans une variable panier
    // si la donnée n'existe pas => null alors je return un panier vide (tableau vide) 
    // sinon panier existe, je retourne mon panier en objet JS
    function recupPanier() {
        let panier = localStorage.getItem("panier");
        if (panier == null) {
            return [];
        } else {
            return JSON.parse(panier);
        }
    }

    // pour retourner la quantité totale de produit du panier
    // la boucle for of parcourt le panier, a chaque quantité de produit trouvé, la quantité s'additionne puis affecte la variable nombre 
    function recupTotalQuantity() {
        let panier = recupPanier();
        let nombre = 0;
        for (let product of panier) {
            nombre += product.quantity;
        }
        return nombre;
    }

})

/*************************formulaire de validation de commande**************************** */

// selection de btn envoyer formulaire
const btnEnvoyerForm = document.querySelector("#order");


// creation de la regEx pour la validation des champs         
let regExPrenomNomVille = new RegExp('^[a-zA-Z-]{2,30}$');
let regExAdresse = new RegExp(`^[a-zéèçàA-Z0-9.-_ ]{2,50}$`);
let regExEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');


// déclaration d'une variable pour chaque balise input et chaque balise message d'erreur
let inputPrenom = document.getElementById("firstName");
let messErrPrenom = document.getElementById("firstNameErrorMsg");

let inputNom = document.getElementById("lastName");
let messErrNom = document.getElementById("lastNameErrorMsg");

let inputAdresse = document.getElementById("address");
let messErrAdresse = document.getElementById("addressErrorMsg");

let inputVille = document.getElementById("city");
let messErrVille = document.getElementById("cityErrorMsg");

let inputEmail = document.getElementById("email");
let messErrEmail = document.getElementById("emailErrorMsg");



// création de fonction de validation pour chaque champ avec myInput en argument, .test() vérifie la correspondance entre le regEx et le champ
// si le champ respecte le regEx alors pas de message d'erreur, sinon on affiche un message d'erreur
// controle de validité du prenom
function prenomControle(myInput) {
    if (regExPrenomNomVille.test(myInput)) {
        // console.log("ok");        
        messErrPrenom.textContent = "";
        return true;
    } else {
        // console.log("ko");
        messErrPrenom.textContent = "Votre prenom n'est pas valide";
        return false;
    }
}

// controle de validité du prenom
function nomControle(myInput) {
    if (regExPrenomNomVille.test(myInput)) {
        messErrNom.textContent = "";
        return true;
    } else {
        messErrNom.textContent = "Votre nom n'est pas valide";
        return false;
    }
}

// controle de validité de la ville
function villeControle(myInput) {
    if (regExPrenomNomVille.test(myInput)) {
        messErrVille.textContent = "";
        return true;
    } else {
        messErrVille.textContent = "Votre ville n'est pas valide";
        return false;
    }
}

// controle de validité de la ville
function adresseControle(myInput) {
    if (regExAdresse.test(myInput)) {
        messErrAdresse.textContent = "";
        return true;
    } else {
        messErrAdresse.textContent = "Votre adresse n'est pas valide";
        return false;
    }
}

// controle de validité de la ville
function emailControle(myInput) {
    if (regExEmail.test(myInput)) {
        console.log("ok")
        messErrEmail.textContent = "";
        return true;
    } else {
        console.log("ko")
        messErrEmail.textContent = "Votre email n'est pas valide";
        return false;
    }
}

// détecter le click hors champs et activation des fonctions de validation
inputPrenom.addEventListener("change", function () {
    prenomControle(this.value);
});

inputNom.addEventListener("change", function () {
    nomControle(this.value);
});

inputVille.addEventListener("change", function () {
    villeControle(this.value);
});

inputAdresse.addEventListener("change", function () {
    adresseControle(this.value);
});

inputEmail.addEventListener("change", function () {
    emailControle(this.value);
});



// détécter le click pour l'envoi du formulaire
btnEnvoyerForm.addEventListener("click", (event) => {
    event.preventDefault();

    // recup des valeurs de chaque champ du formulaire
    const formValues = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
    };


    // declaration d'une variable par input
    let prenom = formValues.firstName;
    let nom = formValues.lastName;
    let adresse = formValues.address;
    let ville = formValues.city;
    let mail = formValues.email;
    // console.log(ville)


    // tableau pour stocker les id des produits
    let productId = [];
    for (let i = 0; i < panierStorage.length; i++) {
        productId.push(panierStorage[i].id)
    }
    //console.log(productId)

    // création d'un objet contenant les info du formulaire et les produits du panier
    let commandeObjet = {
        contact: formValues,
        products: productId,
    }

    // options du fetch
    let optionsFetch = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commandeObjet)
    }


    // controle de validité du formulaire avant l'envoie dans le local storage
    // vérifie si le panier est vide et si les input sont valid. Si tout est ok alors j'envoie le formulaire
    if (commandeObjet.products.length == 0) {
        alert("Votre paner est vide")
    } else if (prenomControle(prenom) == true && nomControle(nom) == true && villeControle(ville) == true && adresseControle(adresse) == true && emailControle(mail) == true) {

        // mettre l'objet formValues dans le localStorage
        localStorage.setItem("formValues", JSON.stringify(formValues))
        // console.log(formValues);
        console.log(commandeObjet)

        // envoie de l'object sur l'api via fetch() sur l'url/order
        // récup les options et le tableau avec contact + id que l'on doit afficher sur la dernière page
        // clear permet de supprimer tous les objets du localStorage
        // document.location.href contient le chemin de la page de confirmation de la commande vers laquel on sera redirigé
        fetch(`http://localhost:3000/api/products/order`, optionsFetch)
            .then((data) => {
                return data.json();
            })
            .then((order) => {
                localStorage.clear();
                document.location.href = `./confirmation.html?orderId=${order.orderId}`;
            })
            .catch((error) => {
                alert("Aucune information retrouvée sur l'API")
            })
    } else {
        alert("Le formulaire est incomplet ou incorrect")
    }
})




