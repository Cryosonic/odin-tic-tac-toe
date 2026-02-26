const arena = document.querySelector(".arena");

const placeX = (target) => {
    target.innerHTML = `<img src="./images/naught.png">`;
}

arena.addEventListener("click", (e) => {
    if(e.target.className === "position") {
        console.log(e.target);
        placeX(e.target);
    }
})