//via fetch => requête http  
//.then => fonction avec en paramètre la réponse data et json() => converti la réponse au format json
//les données json doivent encore être traitées, j'ajoute une autre instruction .then avec une fonction qui a en argument completeData
//la boucle forEach => affiche les éléments de mon tableau et je place en paramêtre product
//le paramètre product va me permettre d'appeller une fonction sur chaque élément de mon un tableau élément

fetch("http://localhost:3000/api/products")
    .then((data) => {
        return data.json();
    }).then((completeData) => {
        console.log(completeData);
        var items = document.getElementById("items");

        completeData.forEach(function (product) {
            console.log(product);

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

    }).catch((error) => {
        console.log(error);
    })


