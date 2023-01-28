// utilisation de la methode fetch pour faire ma requête http avec le chemin de la ressource en argument
// fetch retourne une promesse contenant une reponse et on indique le format de la reponse souhaité avec .json
// les données json doivent encore être traitées, on ajoute une autre instruction .then avec une fonction qui a en argument completeData
// la boucle forEach affiche les éléments de mon tableau et on place en paramêtre product
// product va me permettre d'appeller une fonction sur chaque élément de mon tableau d'éléments
fetch("http://localhost:3000/api/products")
    .then((data) => {
        return data.json();
    })
    .then((completeData) => {
        console.log(completeData);
        var items = document.getElementById("items");

        completeData.forEach(function (product) {
            // console.log(product);

            let baliseA = document.createElement("a")
            baliseA.setAttribute("href", "./product.html?id=" + product._id);
            items.appendChild(baliseA);

            let baliseArticle = document.createElement("article");
            baliseA.appendChild(baliseArticle);

            let baliseImg = document.createElement("img");
            baliseImg.setAttribute("src", product.imageUrl);
            baliseImg.setAttribute("alt", product.altTxt);
            baliseArticle.appendChild(baliseImg);

            let baliseH3 = document.createElement("h3");
            baliseH3.setAttribute("class", "productName");
            baliseH3.innerText = product.name;
            baliseArticle.appendChild(baliseH3);

            let baliseDescription = document.createElement("p");
            baliseDescription.setAttribute("class", "productDescription");
            baliseDescription.innerText = product.description;
            baliseArticle.appendChild(baliseDescription);

        });
        // dans le bloc catch, on traite les erreurs et on affiche l'erreur rencontrée si on en rencontre une
    }).catch((error) => {
        console.log(error);
    })


