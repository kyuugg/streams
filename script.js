const nav = document.querySelector("#buttons-nav");
const input = document.querySelector("#sidebar-search");
const streamFrame = document.querySelector("#stream-frame");

function generateSource(streamer) {
    return `https://player.twitch.tv/?channel=${streamer}&parent=127.0.0.1`;
}

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const newButton = document.createElement("button");
        newButton.className = "sidebar-item";
        newButton.textContent = input.value;
        nav.append(newButton);
        input.value = "";
    }
});

nav.addEventListener("click", (event) => {
    if (event.target.matches(".sidebar-item")) {
        const streamer = event.target.textContent;
        streamFrame.src = generateSource(streamer);
    }
});
