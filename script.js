document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const searchBar = document.getElementById("searchBar");
    const linksList = document.getElementById("links-list");

    // Cargar links desde JSON
    fetch("links.json")
        .then(response => response.json())
        .then(data => {
            renderLinks(data.links);
        })
        .catch(error => console.error("Error cargando los enlaces:", error));

    function renderLinks(links) {
        linksList.innerHTML = "";
        links.forEach(link => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = link.url;
            a.textContent = link.name;
            a.target = "_blank";
            li.appendChild(a);
            linksList.appendChild(li);
        });
    }

    // Filtrar links en tiempo real
    searchBar.addEventListener("keyup", function () {
        const query = searchBar.value.toLowerCase();
        const links = linksList.getElementsByTagName("li");
        for (let link of links) {
            const text = link.textContent.toLowerCase();
            link.style.display = text.includes(query) ? "block" : "none";
        }
    });

    // Alternar modo oscuro
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
    });

    // Mantener el modo oscuro al recargar
    if (localStorage.getItem("dark-mode") === "true") {
        body.classList.add("dark-mode");
    }
});
