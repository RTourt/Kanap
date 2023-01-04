//via fetch je fais une requête http  
//then contient la fonction avec en paramètre la réponse data 
//la méthode json converti la réponse au format json
//les données json doivent encore être traitées, j'ajoute une autre instruction then avec une fonction qui a en argument completeData
//dans cette fonction, création de la variable data1 avec en valeur chaine de characteres
//pour afficher les éléments de mon tableau, la méthode map est adaptée et je place en paramêtre values
//le paramètre values va me permettre d'appeller une fonction sur chaque élément de mon un tableau élément

fetch("http://localhost:3000/api/products")
    .then((data) => {
        return data.json()
    }).then((completeData) => {
        console.log(completeData);
        var items = document.getElementById("items")

        //boucle sur tout products (completeData) chaque produit est rangé dans product
        completeData.forEach(function (product) {
            console.log(product)

            let baliseA = document.createElement("a")
            baliseA.setAttribute("href", "./product.html?id=" + product._id)
            items.appendChild(baliseA);

            let baliseArticle = document.createElement("article")
            baliseA.appendChild(baliseArticle);

            let baliseImg = document.createElement("img")
            baliseImg.setAttribute("src", product.imageUrl)
            baliseImg.setAttribute("alt", product.altTxt)
            baliseArticle.appendChild(baliseImg);

            let baliseH3 = document.createElement("h3")
            baliseH3.setAttribute("class", "productName")
            baliseH3.innerText = product.name
            baliseArticle.appendChild(baliseH3);

            let baliseDescription = document.createElement("p")
            baliseDescription.setAttribute("class", "productDescription")
            baliseDescription.innerText = product.description
            baliseArticle.appendChild(baliseDescription);

        });

    }).catch((error) => {
        console.log(error);
    })


