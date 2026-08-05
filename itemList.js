const list = document.getElementById("itemList");
const info = document.getElementById("info");

for (const name in items) {

    const card = document.createElement("div");
    card.className = "ghost-card";

    card.innerHTML = `
        <img class="item-icon" src="${items[name].icon}" alt="${name}">
        <span>${name}</span>
    `;

    card.onclick = () => {

        document.querySelectorAll(".ghost-card").forEach(c => {
            c.classList.remove("active");
        });

        card.classList.add("active");

        const item = items[name];

        info.innerHTML = `
<h1>${name}</h1>

<hr>

<p class="item-description">${item.description}</p>

<div class="ghost-details">

    <div class="item-image-box">

        <img class="item-photo"
             src="${item.image}"
             alt="${name}">

    </div>

</div>
`;
    };

    list.appendChild(card);

}