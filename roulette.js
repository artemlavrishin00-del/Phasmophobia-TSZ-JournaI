const rouletteList = document.getElementById("rouletteList");
const info = document.getElementById("info");

const names = Object.keys(ghosts);

for (let i = 0; i < 5; i++) {

    names.forEach(name => {

        const div = document.createElement("div");

        div.className = "roulette-item";

        div.textContent = name;

        rouletteList.appendChild(div);

    });

}

const spinBtn = document.getElementById("spinBtn");

let spinning = false;

spinBtn.onclick = () => {

    if (spinning) return;

    spinning = true;

    const winner = Math.floor(Math.random() * names.length);

// сколько элементов ниже первого находится стрелка
const pointerOffset = 4;

// призрак, на которого реально указывает стрелка
const selected = (winner + pointerOffset) % names.length;

const offset = ((names.length * 3) + winner) * 60;

    rouletteList.style.transform = `translateY(-${offset}px)`;

    setTimeout(() => {
        localStorage.setItem("rouletteGhost", names[selected]);
        const ghost = ghosts[names[selected]];

        info.innerHTML = `
<h1>${names[selected]}</h1>

<hr>

<p>${ghost.description}</p>

<div class="ghost-details">

    <div class="evidence-box">

        <h3>Улики</h3>

        <div class="evidence-list">
            ${ghost.evidence.map(e => `<div class="evidence-item">${e}</div>`).join("")}
        </div>

    </div>

    <img class="ghost-photo" src="${ghost.image}" alt="${names[winner]}">

</div>
`;
        
        spinning = false;

    }, 6000);

};