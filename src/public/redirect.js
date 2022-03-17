function redirectToHost() {
    location.replace("./Host/index.html")
}

function redirectToPlayer() {
    if (document.getElementById("playerName").value != "") {
        window.sessionStorage.setItem("nomeUtente", document.getElementById("playerName").value)
        location.replace("./Client/index.html")
    } else {
        alert("Inserisci un nome");
    }
}