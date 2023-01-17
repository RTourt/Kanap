var queryStringUrlId = window.location.search;

//je récupere l'id de l'url avec .get
let urlSearchParams = new URLSearchParams(queryStringUrlId);

let urlId = urlSearchParams.get("id");
var totalPrice = 0;


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
            baliseArticle.setAttribute("data-id", panier.id);
            baliseArticle.setAttribute("data-color", panier.color);
            console.log(baliseArticle.setAttribute("data-id", panier.id));
            articlePanier.appendChild(baliseArticle);

            let divPanierImg = document.createElement("div");
            baliseArticle.appendChild(divPanierImg);
            divPanierImg.className = "cart__item__img";

            let baliseImg = document.createElement("img");
            baliseImg.src = completeData.imageUrl;
            baliseImg.alt = completeData.altTxt;
            divPanierImg.appendChild(baliseImg);

            let divPanierContenu = document.createElement("div");
            baliseArticle.appendChild(divPanierContenu);
            divPanierContenu.className = "cart__item__content";

            let divPanierContenuDescription = document.createElement("div");
            divPanierContenu.appendChild(divPanierContenuDescription);
            divPanierContenuDescription.className = "cart__item__content__description";

            let baliseH2 = document.createElement("h2");
            divPanierContenuDescription.appendChild(baliseH2);
            baliseH2.innerText = completeData.name;

            let baliseCouleur = document.createElement("p");
            divPanierContenuDescription.appendChild(baliseCouleur);
            //  baliseCouleur.textContent = panierStorage[index].color;
            baliseCouleur.textContent = panier.color;

            let balisePrice = document.createElement("p");
            divPanierContenuDescription.appendChild(balisePrice);
            balisePrice.innerText = completeData.price + " €";
            totalPrice += completeData.price * panier.quantity;


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
            inputQuantity.value = panier.quantity;
            inputQuantity.className = "inputQuantity";
            inputQuantity.setAttribute("type", "number");
            inputQuantity.setAttribute("name", "itemQuantity");
            inputQuantity.setAttribute("min", "1");
            inputQuantity.setAttribute("max", "100");
            divParamContenuQuantite.appendChild(inputQuantity);
            inputQuantity.addEventListener("change", function () {
                panierStorage[index].quantity = inputQuantity.value;
                localStorage.setItem("panier", JSON.stringify(panierStorage));
                alert("la quantité a été modifier");
                window.location.href = "cart.html";
            })



            let divParamContenuEffacer = document.createElement("div");
            divParamContenu.appendChild(divParamContenuEffacer);
            divParamContenuEffacer.className = "cart__item__content__settings__delete";

            let baliseEffacer = document.createElement("p");
            baliseEffacer.className = "deleteItem";
            baliseEffacer.textContent = "Supprimer";
            divParamContenuEffacer.appendChild(baliseEffacer);
            baliseEffacer.addEventListener("click", function () {
                panierStorage.splice(index, 1);
                localStorage.setItem("panier", JSON.stringify(panierStorage));
                alert("ce produit a été supprimer du panier");
                window.location.href = "cart.html";
            })

            let spanQuantity = document.getElementById("totalQuantity");
            spanQuantity.innerText = recupTotalQuantity();


            let spanPrice = document.getElementById("totalPrice");
            spanPrice.innerText = totalPrice;
            console.log(spanPrice.innerText);




        }).catch((error) => {
            console.log(error);
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


    /************************************************************** */


    /**************************formulaire de commande************************************* */

    //selection de btn envoyer formulaire
    const btnEnvoyerForm = document.querySelector("#order");
    console.log(btnEnvoyerForm);

    //add eventListener
    btnEnvoyerForm.addEventListener("click", (e) => {
        e.preventDefault();

        //recup des valeurs du formulaire
        const formValues = {
            prenom: document.querySelector("#firstName").value,
            nom: document.querySelector("#lastName").value,
            adresse: document.querySelector("#address").value,
            ville: document.querySelector("#city").value,
            email: document.querySelector("#email").value,
        };


        //mettre l'objet formValues dans le localStorage
        localStorage.setItem("formValues", JSON.stringify(formValues));


        console.log(formValues);

        //mettre les values du form et mettre les produits select dans un objet a envoyer au server
        const aEnvoyer = {
            panierStorage,
            formValues
        }
        console.log(aEnvoyer);



    })

    /*************************formulaire validation******************************** */
    /*
        let baliseForm = document.createElement('form');
        baliseForm.setAttribute("class", "cart_order__form");
    
        let divFormPanierCommande = document.createElement('div');
        divFormPanierCommande.setAttribute("class", "cart__order__form__question");
        baliseForm.appendChild(divFormPanierCommande);
    
        let divBtnFormPanierCommande = document.createElement('div');
        divBtnFormPanierCommande.setAttribute("class", "cart__order__form__submit");
        baliseForm.appendChild(divBtnFormPanierCommande);
    
        let inputPrenom = document.createElement("input");
        inputPrenom.setAttribute("name", "firstName");
        divFormPanierCommande.appendChild(inputPrenom);
    
        let inputNom = document.createElement("input");
        inputNom.setAttribute("name", "lastName");
        divFormPanierCommande.appendChild(inputNom);
    
        let inputAdresse = document.createElement("input");
        inputAdresse.setAttribute("name", "address");
        divFormPanierCommande.appendChild(inputAdresse);
    
        let inputVille = document.createElement("input");
        inputVille.setAttribute("name", "city");
        divFormPanierCommande.appendChild(inputVille);
    
        let inputEmail = document.createElement("input");
        inputEmail.setAttribute("name", "email");
        divFormPanierCommande.appendChild(inputEmail);
    
        let msgErrPrenom = document.createElement("p");
        msgErrPrenom.setAttribute("id", "firstNameErrorMsg");
        divFormPanierCommande.appendChild(msgErrPrenom);
    
        let msgErrNom = document.createElement("p");
        msgErrNom.setAttribute("id", "lastNameErrorMsg");
        divFormPanierCommande.appendChild(msgErrNom);
    
        let msgErrAdresse = document.createElement("p");
        msgErrAdresse.setAttribute("id", "addressErrorMsg");
        divFormPanierCommande.appendChild(msgErrAdresse);
    
        let msgErrVille = document.createElement("p");
        msgErrVille.setAttribute("id", "cityErrorMsg");
        divFormPanierCommande.appendChild(msgErrVille);
    
        let msgErrEmail = document.createElement("p");
        msgErrEmail.setAttribute("id", "emailErrorMsg");
        divFormPanierCommande.appendChild(msgErrEmail);
    
        let inputCommander = document.createElement("input");
        inputCommander.setAttribute("id", "order");
        divBtnFormPanierCommande.appendChild(inputCommander);
    
        console.log(baliseForm);
        console.log(baliseForm.email);
    */


    //ecouter la modif de l'email
    baliseForm.email.addEventListener("change", function () {
        validEmail(this);
    });

    const validEmail = function (inputEmail) {
        //creation de la regExp pour la validation de l'email
        let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

        let p = inputEmail.nextElementSibling;

        //test de l'expresion reguliere
        if (emailRegExp.test(inputEmail.value)) {
            p.innerHTML = "Adresse Valide";
            p.classList.remove('text-danger')
            p.classList.add('text-success')
        } else {
            p.innerHTML = "Adresse Non Valide";
            p.classList.remove('text-success')
            p.classList.add('text-danger')
        }
        console.log(p)
    }
    //recuper et detect le click pour envoyer le form, 
    //definir une variable par champ regexp 
    //definir une variabl par valeur de chaque input
    //faire 5 if else : pour test le prenom avec regexp prenom, puis le nom, etc..
    //si tout est bon, on  creer un object qui contient le panier et les info du form
    //envoyer cette object sur l'api (fetch) sur url /order
    //recup de l'order id que l'on doit afficher sur la derniere page





})


