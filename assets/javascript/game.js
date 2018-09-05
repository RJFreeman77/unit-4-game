
// set up character objects with stats. 
// when you click on a character
// other cards move to the enemies area. use the .append() function to move them to the other section. https://stackoverflow.com/questions/2596833/how-to-move-child-element-from-one-parent-to-another-using-jquery
// need a way to set that character as the current characer. 
// probably going to set up blank pc stat variables. then change those when the character is seleted
// have functions inside objects that set the global stat variables to the character's variables

// after enemy is defeated, change the div to display: none;

// have to put down display information about who was attacked. 


// General Game Variab;es
var pcHP = 0;
var pcAC = 0;
var enemyHP = 0;
var enemyCA = 0;
var isPCSelected = false;
var isEnemySelected = false;
var currentPC;
var currentEnemy;
isPcAlive = true;
isEnemyAlive = true;
isBothAlive = true;
enemiesRemaining = 3;

// jQuery Variables
var opponentsP = $("#opponents");

// Character Objects
var hotDogPrincess = {
    name: "Hot Dog Princess",
    healthPoints: 100,
    attackPoints: 3,
    counterAttack: 15,
    hasBattled: false,
    id: $("#hot-dog"),
    hpId: $("#hot-dog-hp"),
    moveOtherCards: function () {
        opponentsP.append($("#choose-goose"));
        opponentsP.append($("#war-elephant"));
        opponentsP.append($("#james-i"));
    },
}
var warElephant = {
    name: "Ancient Psychic Tandem War Elephant",
    healthPoints: 200,
    attackPoints: 12,
    counterAttack: 30,
    hasBattled: false,
    id: $("#war-elephant"),
    hpId: $("#war-elephant-hp"),
    moveOtherCards: function () {
        opponentsP.append($("#hot-dog"));
        opponentsP.append($("#choose-goose"));
        opponentsP.append($("#james-i"));
    },
}
var chooseGoose = {
    name: "Choose Goose",
    healthPoints: 150,
    attackPoints: 8,
    counterAttack: 20,
    hasBattled: false,
    id: $("#choose-goose"),
    hpId: $("#choose-goose-hp"),
    moveOtherCards: function () {
        opponentsP.append($("#hot-dog"));
        opponentsP.append($("#war-elephant"));
        opponentsP.append($("#james-i"));
    },
}
var james = {
    name: "James I",
    healthPoints: 80,
    attackPoints: 5,
    counterAttack: 10,
    hasBattled: false,
    id: $("#james-i"),
    hpId: $("#james-i-hp"),
    moveOtherCards: function () {
        opponentsP.append($("#hot-dog"));
        opponentsP.append($("#choose-goose"));
        opponentsP.append($("#war-elephant"));
    },
}

$(document).ready(function () {
    setCardHP();
    cardSelection();
    $("#restart").click(function () {
        reset();
    });
    // attack button actions
    $("#attack-button").click(function () {
        if (!isPCSelected) {
            $("#info-text-6").css("display", "inline");
        } else if (isPCSelected && !isEnemySelected) {
            infoHide();
            $("#info-text-4").css("display", "inline");
        } else {
            showInfo1();
            // attack logic
            enemyHP -= pcAC;
            pcAC += pcAC;
            checkLife();

            if (isEnemyAlive) {
                pcHP -= enemyCA;
                checkLife();
            } else if (!isEnemyAlive) {
                enemiesRemaining--;
                if (enemiesRemaining === 0) {
                    infoHide();
                    $("#info-text-5").css("display", "block");
                    $("#info-text-button").css("display", "block");
                }
            }


        }
    });


});

// Functions
function changePCStat(char) {
    currentPC = char;
    pcHP = currentPC.healthPoints;
    pcAC = currentPC.attackPoints;
    isPCSelected = true;
    currentPC.moveOtherCards();
    infoHide();
}
function changeEnemyStat(enem) {
    currentEnemy = enem;
    enemyHP = currentEnemy.healthPoints;
    enemyCA = currentEnemy.counterAttack;
    isEnemySelected = true;
    isEnemyAlive = true;
    $("#npc-enemies").append(currentEnemy.id);
    infoHide();
}
function setCardHP() {
    hotDogPrincess.hpId.text(hotDogPrincess.healthPoints);
    chooseGoose.hpId.text(chooseGoose.healthPoints);
    warElephant.hpId.text(warElephant.healthPoints);
    james.hpId.text(james.healthPoints);
}
function infoHide() {
    $(".info-text").css("display", "none");
}
function showInfo1() {
    $(".en-name-span").text(currentEnemy.name);
    $("#en-attack").text(enemyCA);
    $("#pc-attack").text(pcAC);
    currentPC.hpId.text(pcHP);
    currentEnemy.hpId.text(enemyHP);
    $("#info-text-1").css("display", "block");
}
function reset() {
    setCardHP();
    infoHide();
    isEnemyAlive = true;
    isPcAlive = true;
    isPCSelected = false;
    isEnemySelected = false;
    enemiesRemaining = 3;
    hotDogPrincess.id.css("display", "block");
    chooseGoose.id.css("display", "block");
    warElephant.id.css("display", "block");
    james.id.css("display", "block");
    $("#player-character").append(hotDogPrincess.id, chooseGoose.id, warElephant.id, james.id);
}
function checkLife() {
    if (pcHP > 0 && enemyHP > 0) {
        isBothAlive = true;
    } else if (pcHP > 0 && !(enemyHP > 0)) {
        infoHide();
        isEnemyAlive = false;
        isPcAlive = true;
        $("#info-text-3").css("display", "block");
        currentEnemy.id.css("display", "none");
        isEnemySelected = false;
    } else if (!(pcHP > 0) && enemyHP > 0) {
        infoHide();
        isEnemyAlive = true;
        isPcAlive = false;
        $("#info-text-2").css("display", "block");
        $("#info-text-button").css("display", "block");
    } else {
        console.log("something is wrong with the PC and/or Enemy Life")
    }
}
function cardSelection() {
    $("div").click(function () {
        if (!isPCSelected && !isEnemySelected) {
            switch ($(this).attr("id")) {
                case "hot-dog":
                    changePCStat(hotDogPrincess);
                    break;
                case "choose-goose":
                    changePCStat(chooseGoose);
                    break;
                case "war-elephant":
                    changePCStat(warElephant);
                    break;
                case "james-i":
                    changePCStat(james);
                    break;
            }
        } else if (isPCSelected && !isEnemySelected) {
            switch ($(this).parents().attr("id")) {
                case "hot-dog":
                    changeEnemyStat(hotDogPrincess);
                    break;
                case "choose-goose":
                    changeEnemyStat(chooseGoose);
                    break;
                case "war-elephant":
                    changeEnemyStat(warElephant);
                    break;
                case "james-i":
                    changeEnemyStat(james);
                    break;
            }
        }
    });
}
