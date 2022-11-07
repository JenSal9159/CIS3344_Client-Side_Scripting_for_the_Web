class Pet {
    constructor(type, name, birthdate, description, availability, imageUrl) {
        this.type = type;
        this.name = name;
        this.birthdate = new Date(birthdate);   
        this.age = this.setAge();
        this.description = description;
        this.availability = availability;
        this.imageUrl = imageUrl;
    }

    setAge() {
        var currentDate = new Date();
        var years = currentDate.getFullYear() - this.birthdate.getFullYear();

        // Subtract another year if the Pet's birthday didn't come yet.
        if (currentDate.getMonth() < this.birthdate.getMonth() ||
            (currentDate.getMonth() == this.birthdate.getMonth() && currentDate.getDate() < this.birthdate.getDate()))
            years = years - 1;

        return years;
    }
}

//Create Pet objects for dog
var mimi = new Pet("dog", "Mimi", "01/01/2021", "A female beagle", "Needs a home", "image/dog/beagle.jpg");
var spike = new Pet("dog", "Spike", "02/01/2020", "A male bulldog", "Needs a home", "image/dog/bulldog.jpg");
var yami = new Pet("dog", "Yami", "07/17/2021", "A female chihuahua", "Needs a home", "image/dog/chihuahua.jpg");
var bobo = new Pet("dog", "Bobo", "02/03/2020", "A male corgi", "Needs a home", "image/dog/corgi.jpg");
var rocky = new Pet("dog", "Rocky", "08/19/2018", "A male german sheperd", "Needs a home", "image/dog/germanSheperd.jpg");
var baobao = new Pet("dog", "Bao Bao", "04/15/2020", "A male golden retriever", "Needs a home", "image/dog/goldenRetriever.png");
var java = new Pet("dog", "Java", "07/15/2022", "A male minecraft dog", "Needs a home", "image/dog/minecraftdog.jpg");
var kiki = new Pet("dog", "Kiki", "03/17/2020", "A female poodle", "Needs a home", "image/dog/poodle.jpg");
var su = new Pet("dog", "Su", "03/21/2019", "A female samoyed husky", "Needs a home", "image/dog/samoyedHusky.png");
var ricky = new Pet("dog", "Ricky", "01/23/2018", "A male shiba inu", "Needs a home", "image/dog/shibaInu.jpg");

//Create Pet objects for cat
var prince = new Pet("cat", "Prince", "02/10/2021", "A male birman cat", "Needs a home", "image/cat/birman.jpg");
var coal = new Pet("cat", "Coal", "02/02/2021", "A male bombay cat", "Needs a home", "image/cat/bombay.jpg");
var garfield = new Pet("cat", "Garfield", "07/30/2018", "A male orange tabby persian", "Needs a home", "image/cat/garfield.jpg");
var furball = new Pet("cat", "Furball", "09/09/2020", "A male grey british shorthair", "Needs a home", "image/cat/greyBritishShortHair.jpg");
var huntar = new Pet("cat", "Huntar", "02/10/2020", "A male orange tabby", "Needs a home", "image/cat/orangeTabby.png");
var kelly = new Pet("cat", "Kelly", "04/29/2020", "A female ragdoll", "Needs a home", "image/cat/ragdoll.jpg");
var britney = new Pet("cat", "Britney", "07/08/2021", "A female siamese", "Needs a home", "image/cat/siamese.jpg");
var yumi = new Pet("cat", "Yumi", "06/19/2020", "A female snowshoe cat", "Needs a home", "image/cat/snowshoe.jpg");
var queenie = new Pet("cat", "Queenie", "04/27/2019", "A female tabby", "Needs a home", "image/cat/tabby.jpg");
var tom = new Pet("cat", "Tom", "05/23/2018", "A male british shorthair", "Needs a home", "image/cat/tom.png");

//Create Pet objects for bird
var bomb = new Pet("bird", "Bomb", "08/27/2021", "A black male bird", "Needs a home", "image/bird/bomb.jpg");
var chuck = new Pet("bird", "Chuck", "08/29/2021", "A triangle yellow bird (male)", "Needs a home", "image/bird/chuck.png");
var donaldDuck = new Pet("bird", "Donald Duck", "07/17/2018", "A white male pekin duck", "Needs a home", "image/bird/donaldDuck.png");
var flappybird = new Pet("bird", "Flappy bird", "09/19/2020", "A small yellow bird (male)", "Needs a home", "image/bird/flappybird.png");
var hal = new Pet("bird", "Hal", "05/13/2021", "A green bird (male)", "Needs a home", "image/bird/hal.png");
var hooter = new Pet("bird", "Hooter", "06/06/2020", "A human-sized male owl", "Needs a home", "image/bird/hooter.jpg");
var matilda = new Pet("bird", "Matilda", "06/12/2021", "A white egg bird (female)", "Needs a home", "image/bird/matilda.jpg");
var red = new Pet("bird", "Red", "06/25/2020", "A small red bird (male)", "Needs a home", "image/bird/red.jpg");
var stella = new Pet("bird", "Stella", "04/12/2021", "A female pink bird", "Needs a home", "image/bird/stella.png");
var terence = new Pet("bird", "Terence", "05/22/2021", "A big red bird (male)", "Needs a home", "image/bird/terence.png");

var petArr = [mimi, spike, yami, bobo, rocky, baobao, java, kiki, su, ricky,
               prince, coal, garfield, furball, huntar, kelly, britney, yumi, queenie, tom,
               bomb, chuck, donaldDuck, flappybird, hal, hooter, matilda, red, stella, terence];
var adoptedPets = []; //an array that keeps track of pets that user adopted

function addParagraphText(pNode, strText) {
    text = document.createTextNode(strText);
    pNode.appendChild(text);
    pNode.appendChild(document.createElement("br"));
}

//a method that creates a div that includes a pic of a pet and another div with texts about the pet
//Note: this div is not included in the DOM tree
function createPetDiv(pet) {    
    //create a div container (id = pet)
    var container = document.createElement("div");
    container.id = "pet";
    container.className = pet.type;

    //create an img node and add it to the div container
    var dogImg = document.createElement("img");
    dogImg.src = pet.imageUrl;
    container.appendChild(dogImg);

    var pNode = document.createElement("p"); //create p node
    pNode.id = pet.name; //(used in btnAdopt_click())

    //for the following: repeatedly create text node and add it to p node
    addParagraphText(pNode, "Name: " + pet.name);

    text = document.createTextNode("Birthdate: " + new Date(pet.birthdate).toLocaleString().split(",")[0]);
    pNode.appendChild(text);
    pNode.appendChild(document.createElement("br"));

    text = document.createTextNode("Age: " + pet.age);
    pNode.appendChild(text);
    pNode.appendChild(document.createElement("br"));

    text = document.createTextNode("Description: " + pet.description);
    pNode.appendChild(text);
    pNode.appendChild(document.createElement("br"));

    text = document.createTextNode("Availability: " + pet.availability);
    pNode.appendChild(text);
    //pNode.appendChild(document.createElement("br"));

    //create a div textContainer that has children: pNode and adopt button (if pet is not adopted)
    var textContainer = document.createElement("div");
    textContainer.className = "textContainer";
    textContainer.appendChild(pNode);

    if (pet.availability != "Adopted") {
        var btnAdopt = document.createElement("input");
        btnAdopt.value = "Adopt";
        btnAdopt.size = 1;
        btnAdopt.addEventListener("click", btnAdopt_click);
        textContainer.appendChild(btnAdopt);
    }

    container.appendChild(textContainer); //add div textContainer to div container (id = pet)

    //creat another div node that'll be used by CSS to clear floating
    var divClear = document.createElement("div");
    divClear.className = "clear";
    container.appendChild(divClear);

    return container;
}

//a method that displays pet info for each pet that meets the specified condition
function displayPet(petArr, strCondition, node) {
    for (var i = 0; i < petArr.length; i++) {
        var pet = petArr[i]; 

        if (pet.availability == strCondition) {
            var container = createPetDiv(pet);
            node.appendChild(container); //include div container in the DOM tree
        }
    }
}

window.onload = function () {
    document.getElementById("ddlPets").addEventListener("change", select_change); //an event-handler for ddl
    //window.localStorage.setItem("petArr", JSON.stringify(petArr));

    //if it's the 1st time for user to visit this page, create an array of pet objects
    if (window.localStorage.getItem("petArr") == null) { 
        petArr = [mimi, spike, yami, bobo, rocky, baobao, java, kiki, su, ricky,
            prince, coal, garfield, furball, huntar, kelly, britney, yumi, queenie, tom,
            bomb, chuck, donaldDuck, flappybird, hal, hooter, matilda, red, stella, terence];

        window.localStorage.setItem("petArr", JSON.stringify(petArr)); //store array in a storage
    }

    petArr = JSON.parse(window.localStorage.getItem("petArr")); //get the array from local storage
    displayPet(petArr, "Needs a home", document.getElementById("petContainers")); //display non-adopted pets
    displayPet(petArr, "Adopted", document.getElementById("adoptedPets"));        //display adopted pets
};

//an event-handler for drop down list 
function select_change() {
    var selectedVal = $(this).children("option:selected").val();
    if (selectedVal == "dog") {
        $(".dog").show();
        $(".cat").hide();
        $(".bird").hide();
    }
    if (selectedVal == "cat") {
        $(".cat").show();
        $(".dog").hide();
        $(".bird").hide();
    }
    if (selectedVal == "bird") {
        $(".bird").show();
        $(".cat").hide();
        $(".dog").hide();
    }
    if (selectedVal == "all") {
        $(".bird").show();
        $(".cat").show();
        $(".dog").show();
    }
}

//an event-handler for adopt button
function btnAdopt_click() {
    var pNode = this.previousElementSibling; //this = the adopt button that users clicked

    //find the right pet, change the availability to "Adopted", and update local storage
    for (var i = 0; i < petArr.length; i++) {
        var pet = petArr[i];

        if (pet.name == pNode.id) {
            pet.availability = "Adopted";  //change availability
            var newAvailabilityText = document.createTextNode("Availability: " + pet.availability);
            //Note: pNode.lastChild = textNode about availability
            pNode.lastChild.replaceWith(newAvailabilityText);
            window.localStorage.setItem("petArr", JSON.stringify(petArr)); //update local storage
        }
    }

    //remove div (id = pet) from div #petContainers and place it in div #adoptedPets
    document.getElementById("adoptedPets").appendChild(this.parentNode.parentNode);

    this.remove(); //remove the adopt button 
}