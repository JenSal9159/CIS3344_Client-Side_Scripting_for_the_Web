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

function createLabel(divNode, strText) {
    var label = document.createElement("label");
    var text = document.createTextNode(strText);
    label.appendChild(text);
    divNode.appendChild(label);
}

function createTextBox(divNode, strType, value) {
    var input = document.createElement("input");
    input.type = strType;

    if (input.type == "text") { input.value = value; }
    if (input.type == "date") {
        input.value = new Date(value).toISOString().split("T")[0];
        input.max = new Date().toISOString().split("T")[0]; //user CAN'T select a FUTURE date
    }

    divNode.appendChild(input);
    divNode.appendChild(document.createElement("br"));

    return input;
}

function createButton(divNode, strValue, eventHandler) {
    var button = document.createElement("input");
    button.value = strValue;
    button.size = 2;
    button.addEventListener("click", eventHandler);
    divNode.appendChild(button);
}

//create a div that has the image of a pet and another div that has labels, textboxes, and buttons
//Note: this div is NOT in the DOM tree, meaning user can't see it
function createPetDiv(pet) { 
    //create a div container (id = "pet")
    var container = document.createElement("div");
    container.id = "pet";
    container.className = pet.type;

    //create an img node and add it to the div container
    var petImg = document.createElement("img");
    petImg.src = pet.imageUrl;
    container.appendChild(petImg);

    //create a div textContainer that has children: labels, textboxes, delete and modify buttons
    var textContainer = document.createElement("div");
    textContainer.className = "textContainer";
    textContainer.id = pet.name;

    //repeatedly create labels, textboxes, and buttons
    createLabel(textContainer, "Name:");
    createTextBox(textContainer, "text", pet.name);

    createLabel(textContainer, "Birthdate:");
    createTextBox(textContainer, "date", pet.birthdate);

    createLabel(textContainer, "Age:");
    var txtAge = createTextBox(textContainer, "text", pet.age);
    txtAge.readOnly = true;

    createLabel(textContainer, "Description:");
    createTextBox(textContainer, "text", pet.description);

    createLabel(textContainer, "Availability:");
    var txtAvailability = createTextBox(textContainer, "text", pet.availability);
    txtAvailability.readOnly = true;

    createLabel(textContainer, "Image Url:");
    createTextBox(textContainer, "text", pet.imageUrl);

    createButton(textContainer, "Update", btnUpdate_click); //create an update button
    createButton(textContainer, "Delete", btnDelete_click); //create a delete button

    container.appendChild(textContainer); //add div textContainer to div container (id = "pet")

    //creat another div node that'll be used by CSS to clear floating
    var divClear = document.createElement("div");
    divClear.className = "clear";
    container.appendChild(divClear);

    return container;
}

// a method that creates a div for each pet object
function displayPets(petArr) {
    var petContainer = document.getElementById("petContainers");

    for (var i = 0; i < petArr.length; i++) {
        var container = createPetDiv(petArr[i]); //a div that displays pet info and input elements 
        petContainer.appendChild(container); //include div container in the DOM tree 
    }
}

//an event-handler for drop down list 
//Note: it affects both non-adopted and adopted sections (divs)
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

//an event-handler for update button
function btnUpdate_click() {
    var inputNodes = $(this).siblings("input");

    //looping through an array of input tags (textboxes) to ensure none of them are empty or ""
    for (var i = 0; i < inputNodes.length - 1; i++) {   //Note: last input tag is a button
        if ($(inputNodes[i]).val() == "") {             //input validation
            alert("You're missing at least 1 input values. Please make sure all textboxes of " 
                    + "the pet you wish to update are filled in.");
            return false;
        };
    }
    
    for (var i = 0; i < petArr.length; i++) {
        var pet = petArr[i];

        //Note: this.parentNode = div that contains labels (texts), buttons, textboxes
        if (pet.name == this.parentNode.id) {   //following code: update fields of pet object
            var name = $(inputNodes[0]).val();
            var birthdate = $(inputNodes[1]).val();
            var description = $(inputNodes[3]).val(); 
            var availability = $(inputNodes[4]).val();
            var url = $(inputNodes[5]).val();
            pet = new Pet(pet.type, name, birthdate, description, availability, url);
            console.log(pet);

            //replace old pet object in the array with the updated pet object
            if (i == 0) {
                petArr.shift();         //remove the 1st pet item in the array
                petArr.unshift(pet);    //add the updated pet object to the beginning of the array
                console.log(petArr);
            }
            else {
                var itemsBefore = petArr.slice(0, i); //note: slice(start index, end index exclusive) 
                itemsBefore.push(pet);
                var itemsAfter = petArr.slice(i + 1, petArr.length);
                petArr = itemsBefore.concat(itemsAfter);
                console.log(petArr);
            }

            $(inputNodes[2]).val(pet.age);                      //update age textbox with new age
            this.parentNode.previousSibling.src = pet.imageUrl; //update image with new image/url

            window.localStorage.setItem("petArr", JSON.stringify(petArr));  //update array in the storage
            console.log(JSON.parse(window.localStorage.getItem("petArr"))); //a test
            alert("The pet is updated.");
            return true;
        }
    }
}

//an event-handler for delete button
function btnDelete_click() {
    var textContainer = this.parentNode; //div .textContainer
    var itemsBefore = [];   //array of pets that are before the selected pet that'll be deleted
    var itemsAfter = [];    //array of pets that are after the selected pet that'll be deleted

    for (var i = 0; i < petArr.length; i++) {
        var pet = petArr[i];
        if (pet.name == textContainer.id) {
            if (i == 0) {
                petArr = petArr.slice(1, petArr.length);
            }
            else {
                itemsBefore = petArr.slice(0, i); //note: slice(start index, end index exclusive) 
                itemsAfter = petArr.slice(i + 1, petArr.length);
                petArr = itemsBefore.concat(itemsAfter);
            }
            window.localStorage.setItem("petArr", JSON.stringify(petArr)); //update array in storage
            break;
        }
    }
    $(textContainer.parentNode).remove(); //remove the selected div #pet 
}

var petArr = [];
window.onload = function () {
    document.getElementById("ddlPets").addEventListener("change", select_change);
    petArr = JSON.parse(window.localStorage.getItem("petArr"));
    displayPets(petArr);
};