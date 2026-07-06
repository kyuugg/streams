// constants
const nav = document.querySelector("#buttons-nav");
const input = document.querySelector("#sidebar-input");
const streamFrame = document.querySelector("#stream-frame");
const heading = document.querySelector("#stream-name");
let streamers = [];

// utility functions
function generateSource(streamer) {
    return `https://player.twitch.tv/?channel=${streamer}&parent=streams.kyuu.gg`;
}

function createButtons() {
    for (const element of streamers) {
        const buttonDiv = document.createElement("div");
        buttonDiv.className = "sidebar-button-container";

        const streamerButton = document.createElement("button");
        streamerButton.className = "sidebar-streamer-button";
        streamerButton.textContent = element;

        const deleteButton = document.createElement("button");
        deleteButton.className = "sidebar-delete-button";
        deleteButton.id = element;
        deleteButton.innerHTML = "&#128465;";

        buttonDiv.append(streamerButton);
        buttonDiv.append(deleteButton);
        nav.append(buttonDiv);
    }
}

// if localstorage contains something, put all elements into the array
if (localStorage.getItem("streamers")) {
    streamers = JSON.parse(localStorage.getItem("streamers"));
    createButtons();
}

// input enter behaviour
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && input.value.trim()) {
        const buttonDiv = document.createElement("div");
        buttonDiv.className = "sidebar-button-container";

        const streamerButton = document.createElement("button");
        streamerButton.className = "sidebar-streamer-button";
        streamerButton.textContent = input.value;

        const deleteButton = document.createElement("button");
        deleteButton.className = "sidebar-delete-button";
        deleteButton.id = input.value;
        deleteButton.innerHTML = "&#128465;";

        buttonDiv.append(streamerButton);
        buttonDiv.append(deleteButton);
        nav.append(buttonDiv);

        streamers.push(input.value);
        localStorage.setItem("streamers", JSON.stringify(streamers));

        input.value = "";
    }
});

// button click behaviour
nav.addEventListener("click", (event) => {
    // if streamer button is clicked
    if (event.target.matches(".sidebar-streamer-button")) {
        const streamer = event.target.textContent;
        heading.textContent = event.target.textContent;
        streamFrame.src = generateSource(streamer);

        // if delete button is clicked
    } else if (event.target.matches(".sidebar-delete-button")) {
        // check if currently selected streamer is the one thats being deleted
        if (event.target.id.includes(heading.textContent)) {
            streamFrame.src = "";
            heading.textContent = "";
        }

        // remove streamer from array and localstorage
        const index = streamers.indexOf(event.target.id);
        console.log(event.target.id);
        if (index !== -1) {
            streamers.splice(index, 1);
        }
        event.target.parentElement.remove();
        localStorage.setItem("streamers", JSON.stringify(streamers));
    }
});
