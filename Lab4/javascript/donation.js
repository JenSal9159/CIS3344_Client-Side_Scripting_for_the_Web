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

class Donor {
    constructor(name, fund) {
        this.name = name;
        this.fund = fund;
        this.date = new Date();
    }
}

function loadAdRotator(petArr) { //add non-adopted pet images and names to a div #adRotator
    for (var i = 0; i < petArr.length; i++) {
        var pet = petArr[i];

        if (pet.availability != "Adopted") {
            var pNode = document.createElement("p"); //a pNode that'll include a pet img and pet's name

            var img = document.createElement("img");
            img.src = pet.imageUrl;
            $(pNode).append(img);

            var h3 = document.createElement("h3");
            var text = document.createTextNode(pet.name);
            $(h3).append(text);
            $(pNode).append(h3);

            $("#adRotator").append(pNode); //include pNode in the DOM tree
        }
    }
}

function rotateAd() { //shows a pic of a pet and a pet's name 1 at a time 
    $("#adRotator p").slice(1).hide(); //hide all pNodes (each contain a pet img and name) except the 1st 1 

    // A timer that iterates through pet images at 60 seconds (60000 milliseconds) intervals. 
    // Only 1 pet (image and name) is displayed per minute
    setInterval(function () {
        $("#adRotator p")
            .first().fadeOut(10)         // fade out the first image.
            .next().fadeIn(1000)        // fade in the next image.
            .end()                      // return to the first image object - ending the current chain.
            .appendTo("#adRotator");    // create new chain at this point that adds the current first image object to the end.
    }, 60000);                          // end setInterval function.
}

function displayDonor(donor) {
    var h3 = document.createElement("h3");
    var text = document.createTextNode(donor.name + ": $" + donor.fund + " " + new Date(donor.date).toLocaleString());
    h3.appendChild(text);
    document.getElementById("donorList").appendChild(h3);
}

function displayDonorList(donorArr) {
    for (var i = 0; i < donorArr.length; i++) {
        displayDonor(donorArr[i]);
    }
}

var donorArr = [];
window.onload = function () {
    document.getElementById("btnDonate").addEventListener("click", btnDonate_click);
    var petArr = JSON.parse(window.localStorage.getItem("petArr"));
    loadAdRotator(petArr);
    rotateAd();

    if (window.localStorage.getItem("donorArr") != null) {
        donorArr = JSON.parse(window.localStorage.getItem("donorArr"));
        displayDonorList(donorArr);
    }
};

function btnDonate_click() { //event-handle for donate button
    var name = $("#txtDonorName").val();
    var fund = $("#txtFund").val();

    if (name.trim() == "") {
        alert("Please enter your name before clicking the donate button.");
        return false;
    }
    if (fund.trim() == "" || !(fund >= 1)) {
        alert("Please donate at least $1 before clicking the donate button.");
        return false;
    }

    var donor = new Donor(name, fund);
    donorArr.push(donor); //add donor to the array
    window.localStorage.setItem("donorArr", JSON.stringify(donorArr)); //update local storage
    displayDonor(donor);
    return true;
}