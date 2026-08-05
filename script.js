const ghosts = [
    {
        name: "Alienson",
        evidence: ["Peeing", "freezing", "Inscription"]

    },
    {
        name: "Arsen",
        evidence: ["Pigging", "emf", "Peeing"]
    },
    {
        name: "Artyom",
        evidence: ["emf", "Pigging", "freezing"]
    },
        {
        name: "Blitz",
        evidence: ["ThrowingBottle", "MonkeyRot", "emf"]
    },
        {
        name: "Bran",
        evidence: ["spiritbox", "ThrowingBottle", "Peeing"]
    },
        {
        name: "Chormecalo",
        evidence: ["freezing", "Pigging", "MonkeyRot"]
    },
        {
        name: "Chresol",
        evidence: ["ThrowingBottle", "MonkeyRot", "spiritbox"]
    },
        {
        name: "Chupakabra",
        evidence: ["ThrowingBottle", "Peeing", "emf"]
    },
        {
        name: "Croy",
        evidence: ["spiritbox", "emf", "freezing"]
    },
        {
        name: "Daunessa",
        evidence: ["freezing", "MonkeyRot", "emf"]
    },
        {
        name: "Dima",
        evidence: ["ThrowingBottle", "Pigging", "Inscription"]
    },
        {
        name: "Eibra",
        evidence: ["freezing", "Peeing", "Pigging"]
    },
        {
        name: "Ghoul",
        evidence: ["Inscription", "Peeing", "ThrowingBottle"]
    },
        {
        name: "Greshm",
        evidence: ["MonkeyRot", "spiritbox", "Pigging"]
    },
    
        {
        name: "Hrasch",
        evidence: ["ThrowingBottle", "MonkeyRot", "Peeing"]
    },
              {
        name: "Itacher",
        evidence: ["emf", "Inscription", "ThrowingBottle"]
    },
             
       
        {
        name: "Limera",
        evidence: ["spiritbox", "freezing", "Inscription"]
    },
              
        {
        name: "Nelsi",
        evidence: ["emf", "Peeing", "MonkeyRot"]
    },
       
              {
        name: "Oninoni",
        evidence: ["emf", "Inscription", "Peeing"]
    },
       
        {
        name: "Shaoran",
        evidence: ["Inscription", "Pigging", "MonkeyRot"]
    },
        {
        name: "Skinwalker",
        evidence: ["Inscription", "MonkeyRot", "spiritbox"]
    },
        {
        name: "Stalker",
        evidence: ["MonkeyRot", "Pigging", "ThrowingBottle"]
    },
        {
        name: "Styopa",
        evidence: ["spiritbox", "Inscription", "Peeing"]
    },
       {
        name: "Svintus",
        evidence: ["Peeing", "Pigging", "Inscription"]
    },
           {
        name: "Tvar",
        evidence: ["emf", "Inscription", "MonkeyRot"]
    },
          
        {
        name: "Vova",
        evidence: ["freezing", "Pigging", "ThrowingBottle"]
    },
      
        {
        name: "ZhirnaTvar",
        evidence: ["MonkeyRot", "Pigging", "Peeing"]
    }
 
    
    
   
];

const evidences = document.querySelectorAll(".evidence");
const ghostList = document.getElementById("PossibleGhosts");

// =======================
// Клики по уликам
// =======================

evidences.forEach(evidence => {

    evidence.addEventListener("click", (event) => {

        event.preventDefault();

        let state = Number(evidence.dataset.state);

        state = (state + 1) % 3;

        evidence.dataset.state = state;
        localStorage.setItem(
    "evidence_" + evidence.dataset.id,
    state
);

        evidence.classList.remove("selected", "excluded");

        if (state === 1) {
            evidence.classList.add("selected");
        } else if (state === 2) {
            evidence.classList.add("excluded");
        }

        updateGhosts();

    });

});

// =======================
// Обновление списка призраков
// =======================

function updateGhosts() {

    const selected = [];
    const excluded = [];

    evidences.forEach(e => {

        const state = Number(e.dataset.state);

        if(state === 1){
            selected.push(e.dataset.id);
        }

        if(state === 2){
            excluded.push(e.dataset.id);
        }

    });

    document.querySelectorAll("#PossibleGhosts li").forEach(li => {

        const ghost = ghosts.find(g => g.name === li.dataset.name);

        const hasSelected = selected.every(ev =>
            ghost.evidence.includes(ev)
        );

        const hasExcluded = excluded.some(ev =>
            ghost.evidence.includes(ev)
        );

        li.classList.remove("ghost-disabled");

        li.style.display = "";

        // Крестик → убрать полностью
        if(hasExcluded){

            li.style.display = "none";

            return;

        }

        // Кружок → сделать серым
        if(!hasSelected){

            li.classList.add("ghost-disabled");

        }

    });

}


console.log(ghosts);
console.log(ghosts.length);
ghosts.forEach(ghost => {

    const li = document.createElement("li");

    li.textContent = ghost.name;

    li.dataset.name = ghost.name;

    ghostList.appendChild(li);

});
document.querySelectorAll("#PossibleGhosts li").forEach(li => {

    const saved = localStorage.getItem("ghostState_" + li.dataset.name);

    if (saved === "1") {

        li.dataset.state = "1";
        li.classList.add("ghost-selected");

    }

    if (saved === "2") {

        li.dataset.state = "2";
        li.classList.add("ghost-crossed");

    }

});
evidences.forEach(evidence => {

    const saved = localStorage.getItem(
        "evidence_" + evidence.dataset.id
    );

    if(saved !== null){

        evidence.dataset.state = saved;

        if(saved == 1){
            evidence.classList.add("selected");
        }

        if(saved == 2){
            evidence.classList.add("excluded");
        }

    }

});
updateGhosts();

function checkResult(){

        const rightPage = document.querySelector(".right");
        const rouletteGhost = localStorage.getItem("rouletteGhost");
        const selectedGhost = localStorage.getItem("selectedGhost");

        const result = document.getElementById("leaveResult");

        if (!selectedGhost) {

            result.innerHTML = `
            <div class="journal-warning">
            
            
               <div class="warning-text">
                   Призрак не выбран
               </div>
            
            </div>   
`;

            return;

        }

        if (!rouletteGhost) {

            result.innerHTML = `
            <div class="journal-warning">

    

    <div class="warning-text">
        Призрака нет(рулетка не прокручена)
    </div>

</div>
`;

            return;

        }
console.log("rouletteGhost =", JSON.stringify(rouletteGhost));
console.log("selectedGhost =", JSON.stringify(selectedGhost));
console.log("===", rouletteGhost === selectedGhost);
console.log("trim ===", rouletteGhost.trim() === selectedGhost.trim());
console.log("length:", rouletteGhost.length, selectedGhost.length);
        if (rouletteGhost === selectedGhost) {

            rightPage.innerHTML = `
<div class="result-page">

    <div class="result-content">

        <h1 class="result-title">Результат</h1>

        <h2 class="result-status success">✓ Верно</h2>

        <div class="result-label">
            Призрак:
        </div>

        <div class="result-value">
            ${rouletteGhost}
        </div>

        <hr>

        <div class="result-label">
            Ви вибрали:
        </div>

        <div class="result-value">
            ${selectedGhost}
        </div>

    </div>

    

</div>
`;



        } else {

           rightPage.innerHTML = `
<div class="result-page">

    <div class="result-content">

        <h1 class="result-title">Результат</h1>

        <h2 class="result-status fail">✗ Неверно</h2>

        <div class="result-label">
            Призрак:
        </div>

        <div class="result-value">
            ${rouletteGhost}
        </div>

        <hr>

        <div class="result-label">
            Ви вибрали:
        </div>

        <div class="result-value">
            ${selectedGhost}
        </div>
    </div>

    

    

</div>
`;


        }

    };


const leaveBtn = document.getElementById("leaveBtn");

if (leaveBtn) {

    leaveBtn.onclick = () => {

    document
        .getElementById("leaveConfirm")
        .classList
        .remove("hidden");

};

}
document.querySelectorAll("#PossibleGhosts li").forEach(li => {

    // Загружаем сохранённое состояние
    const saved = localStorage.getItem("ghostState_" + li.dataset.name);

    if (saved) {

        li.dataset.state = saved;

        if (saved === "1")
            li.classList.add("ghost-selected");

        if (saved === "2")
            li.classList.add("ghost-crossed");

    } else {

        li.dataset.state = "0";

    }

    li.addEventListener("click", () => {

        let state = Number(li.dataset.state);

        // ======================
        // Был обычный → выбран
        // ======================

        if (state === 0) {

            const previous =
                localStorage.getItem("selectedGhost");

            if (previous) {

                const prevLi =
                    document.querySelector(
                        `[data-name="${previous}"]`
                    );

                if (prevLi) {

                    prevLi.dataset.state = "0";

                    prevLi.classList.remove("ghost-selected");

                    localStorage.removeItem(
                        "ghostState_" + previous
                    );

                }

            }

            state = 1;

            li.classList.add("ghost-selected");

            localStorage.setItem(
                "selectedGhost",
                li.dataset.name
            );

            localStorage.setItem(
                "ghostState_" + li.dataset.name,
                "1"
            );

        }

        // ======================
        // Был выбран → зачёркнут
        // ======================

        else if (state === 1) {

            state = 2;

            li.classList.remove("ghost-selected");
            li.classList.add("ghost-crossed");

            localStorage.removeItem("selectedGhost");

            localStorage.setItem(
                "ghostState_" + li.dataset.name,
                "2"
            );

        }

        // ======================
        // Был зачёркнут → обычный
        // ======================

        else {

            state = 0;

            li.classList.remove("ghost-crossed");

            localStorage.removeItem(
                "ghostState_" + li.dataset.name
            );

        }

        li.dataset.state = state;

    });

});
document.getElementById("confirmNo").onclick = () => {

    document
        .getElementById("leaveConfirm")
        .classList
        .add("hidden");

};

document.getElementById("confirmYes").onclick = () => {

    document
        .getElementById("leaveConfirm")
        .classList
        .add("hidden");

    checkResult();

};