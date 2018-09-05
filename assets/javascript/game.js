
// set up character objects with stats. 
// when you click on a character
// other cards move to the enemies area. use the .append() function to move them to the other section. https://stackoverflow.com/questions/2596833/how-to-move-child-element-from-one-parent-to-another-using-jquery
// need a way to set that character as the current characer. 
// probably going to set up blank pc stat variables. then change those when the character is seleted
// have functions inside objects that set the global stat variables to the character's variables

// after enemy is defeated, change the div to display: none;

// have to put down display information about who was attacked. 
var playerCharacterHP = 0;
var playerCharacterAP = 0;
var enemyHP = 0;
var enemyCA = 0;
var isPCSelected = false;
var isEnemySelected = false;

var hotDogPrincess = {
    healthPoints: 100,
    attackPoints: 3,
    counterAttack: 15,
    hasBattled: false,
    id: $("#hot-dog"),
    moveOtherCards: function () {
        $("#opponents").append($("#choose-goose"));
        $("#opponents").append($("#war-elephant"));
        $("#opponents").append($("#james-i"));
    },
}
var warElephant = {
    healthPoints: 200,
    attackPoints: 12,
    counterAttack: 30,
    hasBattled: false,
    id: $("#war-elephant"),
    moveOtherCards: function () {
        $("#opponents").append($("#hot-dog"));
        $("#opponents").append($("#choose-goose"));
        $("#opponents").append($("#james-i"));
    },
}
var chooseGoose = {
    healthPoints: 150,
    attackPoints: 8,
    counterAttack: 20,
    hasBattled: false,
    id: $("#choose-goose"),
    moveOtherCards: function () {
        $("#opponents").append($("#hot-dog"));
        $("#opponents").append($("#war-elephant"));
        $("#opponents").append($("#james-i"));
    },
}
var james = {
    healthPoints: 80,
    attackPoints: 5,
    counterAttack: 10,
    hasBattled: false,
    id: $("#james-i"),
    moveOtherCards: function () {
        $("#opponents").append($("#hot-dog"));
        $("#opponents").append($("#choose-goose"));
        $("#opponents").append($("#war-elephant"));
    },
}

function playerCharacerSelect() {

};

function PCselect() {

}

$("div").click(function () {
    if (!isPCSelected && !isEnemySelected) {
        switch ($(this).attr("data")) {
            case "hot-dog":
                changePCStat(hotDogPrincess);
                console.log("set stats HDP")
                break;
            case "choose-goose":
                changePCStat(chooseGoose);
                console.log("set stats CG")
                break;
            case "war-elephant":
                changePCStat(warElephant);
                console.log("set stats WE");
                break;
            case "james":
                changePCStat(james);
                console.log("set stats James");
                break;
        }
    } else if (isPCSelected && !isEnemySelected) {
        switch ($(this).parents().attr("data")) {
            case "hot-dog":
                changeEnemyStat(hotDogPrincess);
                console.log("set stats HDP")
                break;
            case "choose-goose":
                changeEnemyStat(chooseGoose);
                console.log("set stats CG")
                break;
            case "war-elephant":
                changeEnemyStat(warElephant);
                console.log("set stats WE");
                break;
            case "james":
                changeEnemyStat(james);
                console.log("set stats James");
                break;
        }
    }
});


var changePCStat = function (char) {
    playerCharacterHP = char.healthPoints;
    playerCharacterAP = char.attackPoints;
    isPCSelected = true;
    char.moveOtherCards();
    console.log("function called");
};
var changeEnemyStat = function (enem) {
    enemyHP = enem.healthPoints;
    enemyCA = enem.counterAttack;
    isEnemySelected = true;
    $("#npc-enemies").append(enem.id[0]);
    console.log(enem.id[0]);
};

