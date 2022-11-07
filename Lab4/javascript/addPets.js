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

window.onload = function () {
    //user CAN'T select a FUTURE date for birthdate (can select any date up to today's date)
    document.getElementById("calendar").max = new Date().toISOString().split("T")[0];
    document.getElementById("btnAddPet").addEventListener("click", btnAddPet_click);
}

//Note: add pet button is a submit button and all textboxes require inputs before submitting it - HTML
//so input validation is done by default by HTML
function btnAddPet_click() {
    if ($("#txtPetName").val().trim() == "") {
        alert("You must give an input for name.");
        return false;
    }
    else if ($("#calendar").val() == "") {
        alert("You must select a date for birthdate.");
        return false;
    }
    else if ($("#txtDescription").val().trim() == "") {
        alert("You must give an input for description.");
        return false;
    }
    else if ($("#txtImageUrl").val().trim() == "") {
        alert("You must give an input for image url/path.");
        return false;
    }
    else {
        var petType = $("#ddlPets").children("option:selected").val();
        var petName = $("#txtPetName").val();
        var birthdate = $("#calendar").val();
        console.log(birthdate);
        var description = $("#txtDescription").val();
        var availability = "Needs a home"; //when a new pet is added, its availability = Needs a home
        var url = $("#txtImageUrl").val();
        var pet = new Pet(petType, petName, birthdate, description, availability, url);

        var petArr = JSON.parse(window.localStorage.getItem("petArr")); //get the array of pets
        petArr.push(pet);                                               //add new pet to the array
        window.localStorage.setItem("petArr", JSON.stringify(petArr));  //update local storage
        console.log(petArr);
        alert("Pet, " + petName + ", is added.");
        return true;
    }
}