let form = document.getElementById("eventForm");
let eventList = document.getElementById("eventList");

let clearBtn = document.getElementById("clearBtn");
let sampleBtn = document.getElementById("sampleBtn");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    let eventName = document.getElementById("name").value;
    let eventDate = document.getElementById("date").value;
    let eventType = document.getElementById("type").value;
    let eventDesc = document.getElementById("text").value;

    let card = document.createElement("div");
    card.className = "eventCard";

    card.innerHTML =
        "<h4>" + eventName + "</h4>" +
        "<p>Date: " + eventDate + "</p>" +
        "<p>Type: " + eventType + "</p>" +
        "<p>" + eventDesc + "</p>" +
        "<button class='deleteBtn'>Delete</button>";

    eventList.appendChild(card);

    form.reset();
});

eventList.addEventListener("click", function(e) {

    if (e.target.classList.contains("deleteBtn")) {
        e.target.parentElement.remove();
    }

});


clearBtn.addEventListener("click", function() {
    eventList.innerHTML = "";
});

sampleBtn.addEventListener("click", function() {

    let card = document.createElement("div");
    card.className = "eventCard";

    card.innerHTML =
        "<h4>Sample Event</h4>" +
        "<p>Date: 2026-02-10</p>" +
        "<p>Type: Demo</p>" +
        "<p>This is a sample event</p>" +
        "<button class='deleteBtn'>Delete</button>";

    eventList.appendChild(card);
});