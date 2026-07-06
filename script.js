const nav = document.querySelector("#buttons-nav");
const input = document.querySelector("#sidebar-input");
const streamFrame = document.querySelector("#stream-frame");
const heading = document.querySelector("#stream-name");

function generateSource(streamer) {
    return `https://player.twitch.tv/?channel=${streamer}&parent=streams.kyuu.gg`;
}

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && input.value.trim()) {
        const buttonDiv = document.createElement("div");
        buttonDiv.className = "sidebar-button-container";

        const streamerButton = document.createElement("button");
        streamerButton.className = "sidebar-streamer-button";
        streamerButton.textContent = input.value;

        const deleteButton = document.createElement("button");
        deleteButton.className = "sidebar-delete-button";
        deleteButton.className += " " + input.value;
        deleteButton.innerHTML = "&#128465;";

        buttonDiv.append(streamerButton);
        buttonDiv.append(deleteButton);
        nav.append(buttonDiv);

        input.value = "";
    }
});

nav.addEventListener("click", (event) => {
    if (event.target.matches(".sidebar-streamer-button")) {
        const streamer = event.target.textContent;
        heading.textContent = event.target.textContent;
        streamFrame.src = generateSource(streamer);
    } else if (event.target.matches(".sidebar-delete-button")) {
        if (event.target.className.includes(heading.textContent)) {
            streamFrame.src = "";
            heading.textContent = "";
        }
        event.target.parentElement.remove();
    }
});
