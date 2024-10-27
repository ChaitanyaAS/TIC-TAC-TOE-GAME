let boxes = document.querySelectorAll(".box");
let resetGame = document.querySelector("#resetGame");
let resultModal = document.getElementById("resultModal");
let resultText = document.getElementById("resultText");
let gamePage = document.getElementById("gamePage");
let modeSelectionPage = document.getElementById("modeSelectionPage");
let playerTurnText = document.getElementById("playerTurn");
let isPlayingWithAI = false;
let turnO = true;

const winpattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

document.getElementById("playWithFriend").addEventListener("click", () => {
    isPlayingWithAI = false;
    modeSelectionPage.style.display = "none";
    gamePage.style.display = "block";
});

document.getElementById("playWithAI").addEventListener("click", () => {
    isPlayingWithAI = true;
    modeSelectionPage.style.display = "none";
    gamePage.style.display = "block";
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turnO ? "O" : "X";
            box.disabled = true;
            playerTurnText.innerText = turnO ? "Player X's Turn" : "Player O's Turn";
            turnO = !turnO;

            if (!checkWinner() && isPlayingWithAI && !turnO) aiTurn();
        }
    });
});

function aiTurn() {
    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (emptyBoxes.length === 0) return checkWinner();

    const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    turnO = true;
    playerTurnText.innerText = "Player O's Turn";
    checkWinner();
}

function checkWinner() {
    for (let pattern of winpattern) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText) {
            showModal(`${boxes[a].innerText} Wins!`);
            return true;
        }
    }

    if (Array.from(boxes).every(box => box.innerText !== "")) {
        showModal("It's a Draw!");
        return true;
    }

    return false;
}

function showModal(message) {
    resultText.innerText = message;
    resultModal.style.display = "flex";
}

function closeModal() {
    resultModal.style.display = "none";
    resetGameFunction();
}

resetGame.addEventListener("click", resetGameFunction);

function resetGameFunction() {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
    playerTurnText.innerText = "Player O's Turn";
}

function goToHomePage() {
    modeSelectionPage.style.display = "flex";
    gamePage.style.display = "none";
    resetGameFunction();
}

window.addEventListener("click", (e) => {
    if (e.target === resultModal) closeModal();
});
