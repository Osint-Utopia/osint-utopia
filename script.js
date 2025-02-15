document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const searchBar = document.getElementById("searchBar");
    const linksList = document.getElementById("links-list");
    const resourcesList = document.getElementById("resources-list");
    const interestList = document.getElementById("interest-list");

    // Cargar links desde JSON
    fetch("links.json")
        .then(response => response.json())
        .then(data => {
            if (linksList) renderLinks(data.links, linksList);
            if (resourcesList) renderLinks(data.links.slice(0, 10), resourcesList); // 10 primeros para recursos
            if (interestList) renderLinks(data.links.slice(10, 20), interestList); // 10 siguientes para interés
        })
        .catch(error => console.error("Error cargando los enlaces:", error));

    function renderLinks(links, container) {
        container.innerHTML = "";
        links.forEach(link => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = link.url;
            a.textContent = link.name;
            a.target = "_blank";
            li.appendChild(a);
            container.appendChild(li);
        });
    }

    // Filtrar links en tiempo real
    if (searchBar) {
        searchBar.addEventListener("keyup", function () {
            const query = searchBar.value.toLowerCase();
            const links = document.querySelectorAll("li");
            links.forEach(link => {
                link.style.display = link.textContent.toLowerCase().includes(query) ? "block" : "none";
            });
        });
    }

    // Alternar modo oscuro
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            body.classList.toggle("dark-mode");
            localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
        });
    }

    // Mantener el modo oscuro al recargar
    if (localStorage.getItem("dark-mode") === "true") {
        body.classList.add("dark-mode");
    }
});
