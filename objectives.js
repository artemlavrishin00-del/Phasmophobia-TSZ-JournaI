const mediumObjectives = [

    "Найти комнату призрака",
    "Вижити 15 минут",
    "Спостерігати за гост івентом",
    "Зробити фото призрака во время охоти чи гост івента",
    "Завершити гру без смертей"

];

const easyObjectives = [

    "Зробити фото призрака до охоти",
    "Зробити фото предмета, з яким взаємодіяв призрак",
    "Вижити 10 минут",
    "Вижити охоту",
    "Зробити фотографію проклятого об'єкта"

];

function randomFrom(array){
    return array[Math.floor(Math.random() * array.length)];
}

function generateObjectives(){

    const objectives = {

        obj1: "★★★ Визначити призрака",

        obj2: "★★ " + randomFrom(mediumObjectives),

        obj3: "★ " + randomFrom(easyObjectives)

    };

    localStorage.setItem("journalObjectives", JSON.stringify(objectives));

    return objectives;
}

let objectives = JSON.parse(localStorage.getItem("journalObjectives"));

if (!objectives) {
    objectives = generateObjectives();
}

document.getElementById("obj1").innerHTML = objectives.obj1;
document.getElementById("obj2").innerHTML = objectives.obj2;
document.getElementById("obj3").innerHTML = objectives.obj3;