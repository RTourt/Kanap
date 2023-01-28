// récupération de l'id de l'url avec .get
let urlSearchParams = new URLSearchParams(window.location.search);
let id = urlSearchParams.get("orderId");
console.log(id)

// verification que l'url contient un orderId et si c'est le cas on l'affiche
function verifCommandeId() {
    if (urlSearchParams.has('orderId')) {
        //afficher l'id de la commande
        let orderId = document.querySelector("#orderId")
        orderId.textContent = id
    } else {
        document.location.href = "./cart.html"
    }
}
// appel de la fonction de verification
verifCommandeId()