class Pet {
    constructor(petName, petBirthDate, petAge, petDescription, petAvailability, imageLoc) {
        var name = petName;
        var birthDate = petBirthDate;
        var age = petAge;
        var description = petDescription;
        var availability = petAvailability;
        var url = imageLoc;

        this.getName = function () { return name; };
        this.getBirthDate = function() { return birthDate; };
        this.getAge = function() { return age; };
        this.getDescription = function() { return description; };
        this.getAvailability = function () { return availability; };
        this.setAvailability = function (availabilityStatus) { availability = availabilityStatus};
        this.getUrl = function() { return url; };
    }
}

//Create Pet objects for dog and put them in an array
var mimi = new Pet("Mimi", "01/01/2021", 1, "A female beagle", "Needs a home", "image/dog/beagle.jpg");
var spike = new Pet("Spike", "02/01/2020", 2, "A male bulldog", "Needs a home", "image/dog/bulldog.jpg");
var yami = new Pet("Yami", "07/17/2021", 1, "A female chihuahua", "Needs a home", "image/dog/chihuahua.jpg");
var bobo = new Pet("Bobo", "02/03/2020", 2, "A male corgi", "Needs a home", "image/dog/corgi.jpg");
var rocky = new Pet("Rocky", "08/19/2018", 4, "A male german sheperd", "Needs a home", "image/dog/germanSheperd.jpg");
var baobao = new Pet("Bao Bao", "04/15/2020", 2, "A male golden retriever", "Needs a home", "image/dog/goldenRetriever.png");
var java = new Pet("Java", "07/15/2022", "3 months", "A male minecraft dog", "Needs a home", "image/dog/minecraftDog.jpg"); 
var kiki = new Pet("Kiki", "03/17/2020", 2, "A female poodle", "Needs a home", "image/dog/poodle.jpg");
var su = new Pet("Su", "03/21/2019", 3, "A female samoyed husky", "Needs a home", "image/dog/samoyedHusky.png");
var ricky = new Pet("Ricky", "01/23/2018", 4, "A male shiba inu", "Needs a home", "image/dog/shibaInu.jpg");
var dogs = [mimi, spike, yami, bobo, rocky, baobao, java, kiki, su, ricky];

//Create Pet objects for cat and put them in an array
var prince = new Pet("Prince", "02/10/2021", 1, "A male birman cat", "Needs a home", "image/cat/birman.jpg");
var coal = new Pet("Coal", "02/02/2021", 1, "A male bombay cat", "Needs a home", "image/cat/bombay.jpg");
var garfield = new Pet("Garfield", "07/30/2018", 4, "A male orange tabby persian", "Needs a home", "image/cat/garfield.jpg");
var furball = new Pet("Furball", "09/09/2020", 2, "A male grey british shorthair", "Needs a home", "image/cat/greyBritishShortHair.jpg");
var huntar = new Pet("Huntar", "02/10/2020", "8 months", "A male orange tabby", "Needs a home", "image/cat/orangeTabby.png");
var kelly = new Pet("Kelly", "04/29/2020", 2, "A female ragdoll", "Needs a home", "image/cat/ragdoll.jpg");
var britney = new Pet("Britney", "07/08/2021", 1, "A female siamese", "Needs a home", "image/cat/siamese.jpg"); 
var yumi = new Pet("Yumi", "06/19/2020", 2, "A female snowshoe cat", "Needs a home", "image/cat/snowshoe.jpg");
var queenie = new Pet("Queenie", "04/27/2019", 3, "A female tabby", "Needs a home", "image/cat/tabby.jpg");
var tom = new Pet("Tom", "05/23/2018", 4, "A male british shorthair", "Needs a home", "image/cat/tom.png");
var cats = [prince, coal, garfield, furball, huntar, kelly, britney, yumi, queenie, tom];

//Create Pet objects for bird and put them in an array
var bomb = new Pet("Bomb", "08/27/2021", 1, "A black male bird", "Needs a home", "image/bird/bomb.jpg");
var chuck = new Pet("Chuck", "08/29/2021", 1, "A triangle yellow bird (male)", "Needs a home", "image/bird/chuck.png");
var donaldDuck = new Pet("Donald Duck", "07/17/2018", 4, "A white male pekin duck", "Needs a home", "image/bird/donaldDuck.png");
var flappyBird = new Pet("Flappy Bird", "09/19/2020", 2, "A small yellow bird (male)", "Needs a home", "image/bird/flappyBird.png");
var hal = new Pet("Hal", "05/13/2021", 1, "A green bird (male)", "Needs a home", "image/bird/hal.png");
var hooter = new Pet("Hooter", "06/06/2020", 2, "A human-sized male owl", "Needs a home", "image/bird/hooter.jpg");
var matilda = new Pet("Matilda", "06/12/2021", 1, "A white egg bird (female)", "Needs a home", "image/bird/matilda.jpg");
var red = new Pet("Red", "06/25/2020", 2, "A small red bird (male)", "Needs a home", "image/bird/red.jpg");
var stella = new Pet("Stella", "04/12/2021", 1, "A female pink bird", "Needs a home", "image/bird/stella.png");
var terence = new Pet("Terence", "05/22/2021", 1, "A big red bird (male)", "Needs a home", "image/bird/terence.png");
var birds = [bomb, chuck, donaldDuck, flappyBird, hal, hooter, matilda, red, stella, terence];

var allPets = dogs.concat(cats).concat(birds); //an array with the combination of array dogs, cats, and birds
var adoptedPets = []; //an array that keeps track of pets that user adopted

//a helper method that displays the info of each pet given an array of Pet objects
function displayPet(petArr) {
    var petContainer = document.getElementById("petContainers");
    
    //- create a div container (class = "pet") for each pet
    //- inside this container, there will be an image of the pet and a div textContainer that has texts about the 
    //pet and an adopt button
    //- add the div container (class = "pet") to div petContainer so that it'll be in the DOM tree
    for (var i = 0; i < petArr.length; i++) {
        var pet = petArr[i]; //get the Pet object

        //create a div container (class = "pet")
        var container = document.createElement("div");
        container.className = "pet";

        //create an img node and add it to the div container
        var dogImg = document.createElement("img");
        dogImg.src = pet.getUrl();
        container.appendChild(dogImg);

        var pNode = document.createElement("p"); //create p node
        pNode.id = pet.getName(); //every paragraph has an id that's = to the pet's name (used in btnAdopt_click())

        //for the following: repeatedly create text node and add it to p node
        text = document.createTextNode("Name: " + pet.getName());
        pNode.appendChild(text);

        pNode.appendChild(document.createElement("br"));
        text = document.createTextNode("Birthdate: " + pet.getBirthDate());
        pNode.appendChild(text);

        pNode.appendChild(document.createElement("br"));
        text = document.createTextNode("Age: " + pet.getAge());
        pNode.appendChild(text);

        pNode.appendChild(document.createElement("br"));
        text = document.createTextNode("Description: " + pet.getDescription());
        pNode.appendChild(text);

        pNode.appendChild(document.createElement("br"));
        text = document.createTextNode("Availability: " + pet.getAvailability());
        pNode.appendChild(text);

        //create an adopt button
        var btnAdopt = document.createElement("input");
        btnAdopt.value = "Adopt";
        btnAdopt.size = 1;
        btnAdopt.addEventListener("click", btnAdopt_click);

        //create a div textContainer that has children: pNode and the adopt button
        var textContainer = document.createElement("div");
        textContainer.className = "textContainer";
        textContainer.appendChild(pNode);
        textContainer.appendChild(btnAdopt);
        container.appendChild(textContainer); //add div textContainer to div container (class = "pet")

        //creat another div node that'll be used by CSS to clear floating
        var divClear = document.createElement("div");
        divClear.className = "clear";
        container.appendChild(divClear);

        //add div container (class = "pet") to the DOM Tree
        petContainer.appendChild(container);
    }
}

window.onload = function () {
    document.getElementById("btnSearch").addEventListener("click", btnSearch_click);
    displayPet(allPets);
};

//an event-handler for search button
function btnSearch_click() {
    document.getElementById("petContainers").innerHTML = "";    //clear the div #petContainers 1st
    var selectValue = document.getElementById("ddlPets").value; //get the value that's selected from the ddl

    if (selectValue == "all") { displayPet(allPets); }
    if (selectValue == "dog") { displayPet(dogs); }
    if (selectValue == "cat") { displayPet(cats); }
    if (selectValue == "bird") { displayPet(birds); }
}

//an event-handler for adopt button
function btnAdopt_click() {
    var pNode = this.previousElementSibling; //this = the adopt button that users clicked

    //loop through an array of Pet objects to look for a pet name that matches the id of the pNode 
    for (var i = 0; i < allPets.length; i++) {
        var pet = allPets[i];

        if (pet.getName() == pNode.id) { 
            pet.setAvailability("Adopted");  //change availability
            var newAvailabilityText = document.createTextNode("Availability: " + pet.getAvailability());
            pNode.lastChild.replaceWith(newAvailabilityText); //pNode.lastChild = textNode about availability
            adoptedPets.push(pet); //add Pet object to array adoptedPets
        }
    }

    //remove div (class = "pet") from div #petContainers and place it in div #adoptedPets
    document.getElementById("adoptedPets").appendChild(this.parentNode.parentNode);

    this.remove(); //remove the adopt button 
}