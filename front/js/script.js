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
        let data1 = "";
        completeData.map((values) => {
            data1 += `<a href="./product.html?id=42">
    <article>
      <img src=${values.imageUrl} alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName">${values.name}</h3>
      <p class="productDescription">${values.description}</p>
    </article>
  </a>`
        });
        document
            .getElementById("items")
            .innerHTML = data1;
    }).catch((error) => {
        console.log(error);
    })


