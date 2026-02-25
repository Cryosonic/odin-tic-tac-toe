const arena = document.querySelector(".arena");

const placeX = (target) => {
    target.textContent = "X";
}

arena.addEventListener("click", (e) => {
    if(e.target.className === "position") {
        console.log(e.target);
        placeX(e.target);
    }
})