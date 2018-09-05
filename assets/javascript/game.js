
// set up character objects with stats. 
// when you click on a character
// other cards move to the enemies area. use the .append() function to move them to the other section. https://stackoverflow.com/questions/2596833/how-to-move-child-element-from-one-parent-to-another-using-jquery
// need a way to set that character as the current characer. 
// probably going to set up blank pc stat variables. then change those when the character is seleted
// have functions inside objects that set the global stat variables to the character's variables

// after enemy is defeated, change the div to display: none;

// have to put down display information about who was attacked. 


// General Game Variab;es
var playerCharacterHP = 0;
var playerCharacterAP = 0;
var enemyHP = 0;
var enemyCA = 0;
var isPCSelected = false;
var isEnemySelected = false;
var currentEnemyName;

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
    moveOtherCards: function () {
        opponentsP.append($("#hot-dog"));
        opponentsP.append($("#choose-goose"));
        opponentsP.append($("#war-elephant"));
    },
}

$(document).ready(function () {
    setCardHP();
    cardSelection();
    $("#attack-button").click (function() {
        if (isPCSelected && !isEnemySelected) {
            $("#info-text-4").css("display", "inline");
        } else if (isPCSelected && isEnemySelected) {
            console.log("placeholder");
        }
    });


});

// Functions
function changePCStat(char) {
    playerCharacterHP = char.healthPoints;
    playerCharacterAP = char.attackPoints;
    isPCSelected = true;
    char.moveOtherCards();
}
function changeEnemyStat(enem) {
    enemyHP = enem.healthPoints;
    enemyCA = enem.counterAttack;
    isEnemySelected = true;
    infoHide()
    $("#npc-enemies").append(enem.id);
    currentEnemyName = enem.name;
    enNameTest();
}
function setCardHP() {
    $("#hot-dog-hp").text(hotDogPrincess.healthPoints);
    $("#choose-goose-hp").text(chooseGoose.healthPoints);
    $("#war-elephant-hp").text(warElephant.healthPoints);
    $("#james-i-hp").text(james.healthPoints);
}
function infoHide() {
    $(".info-text").css("display", "none");
}
function reset() {
    setCardHP();
    infoHide();
}
function cardSelection() {
    $("div").click(function () {
        if (!isPCSelected && !isEnemySelected) {
            switch ($(this).attr("data")) {
                case "hot-dog":
                    changePCStat(hotDogPrincess);
                    break;
                case "choose-goose":
                    changePCStat(chooseGoose);
                    break;
                case "war-elephant":
                    changePCStat(warElephant);
                    break;
                case "james":
                    changePCStat(james);
                    break;
            }
        } else if (isPCSelected && !isEnemySelected) {
            switch ($(this).parents().attr("data")) {
                case "hot-dog":
                    changeEnemyStat(hotDogPrincess);
                    break;
                case "choose-goose":
                    changeEnemyStat(chooseGoose);
                    break;
                case "war-elephant":
                    changeEnemyStat(warElephant);
                    break;
                case "james":
                    changeEnemyStat(james);
                    break;
            }
        }
    });
}
