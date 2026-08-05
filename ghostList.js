const list = document.getElementById("ghostList");
const info = document.getElementById("info");

for (const name in ghosts) {

    const card = document.createElement("div");
    card.className = "ghost-card";
    card.textContent = name;

    card.onclick = () => {

        document.querySelectorAll(".ghost-card").forEach(c => {
            c.classList.remove("active");
        });

        card.classList.add("active");

        const ghost = ghosts[name];

       info.innerHTML = `
<h1>${name}</h1>

<hr>

<p>${ghost.description}</p>

<div class="ghost-details">

    <div class="evidence-box">

        <h3>Улики</h3>

       <div class="evidence-list">
    ${ghost.evidence.map(e => `<div class="evidence-item">${e}</div>`).join("")}
</div>
    </div>

   <img class="ghost-photo" src="${ghost.image}" alt="${name}">

</div>
`;
    };

    list.appendChild(card);

}