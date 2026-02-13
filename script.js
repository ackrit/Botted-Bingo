// Twitch-panel-ready Bingo script
document.addEventListener("DOMContentLoaded", () => {

    // Twitch API safe hook (optional)
    if (window.Twitch && window.Twitch.ext) {
        window.Twitch.ext.onAuthorized((auth) => {
            console.log("Twitch Extension authorized", auth);
            // You can use auth.clientId / auth.token here if needed
        });
    }

    const phrases = [
        "High Fives All Around",
        "Leo Chirp",
        "Good, Happy, Smiling",
        "Destroyed, Demolished",
        "Fortnite, Fortnite, We love Fortnite!",
        "Duder/Duderino/Duderina",
        "TikyToky",
        "Wowsocoolwow",
        "To The Sky!",
        "Oohya!",
        "Woohoo!",
        "Snort/Laugh",
        "That's a bot",
        "Lil Rascal",
        "Darn it!",
        "Oh, a piece of candy!",
        "Charge!",
        "All Good Things",
        "Whistle, whistle",
        "That's unfortunate",
        "Alright!",
        "On the road again!",
        "Would ya look at that?",
        "Yep"
    ];

    const boardElement = document.getElementById("bingo-board");
    const newCardButton = document.getElementById("new-card");
    let board = [];

    // Fisher-Yates shuffle
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Auto-fit text inside a square
    function fitTextToSquare(element) {
        let fontSize = 20; // starting font size
        element.style.fontSize = fontSize + "px";

        while (
            (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) &&
            fontSize > 8
        ) {
            fontSize--;
            element.style.fontSize = fontSize + "px";
        }
    }

    function generateBoard() {
        if (!boardElement) return; // safety check
        boardElement.innerHTML = "";
        board = [];

        const shuffled = shuffle([...phrases]).slice(0, 24);

        // Insert FREE in center
        shuffled.splice(12, 0, "FREE");

        shuffled.forEach((phrase) => {
            const div = document.createElement("div");
            div.classList.add("square");
            div.textContent = phrase;

            if (phrase === "FREE") {
                div.classList.add("marked");
            }

            div.addEventListener("click", () => {
                div.classList.toggle("marked");
                checkBingo();
            });

            boardElement.appendChild(div);
            board.push(div);

            fitTextToSquare(div); // adjust font size to fit square
        });
    }

    function checkBingo() {
        if (!board.length) return;

        const winPatterns = [
            [0,1,2,3,4],
            [5,6,7,8,9],
            [10,11,12,13,14],
            [15,16,17,18,19],
            [20,21,22,23,24],
            [0,5,10,15,20],
            [1,6,11,16,21],
            [2,7,12,17,22],
            [3,8,13,18,23],
            [4,9,14,19,24],
            [0,6,12,18,24],
            [4,8,12,16,20]
        ];

        for (let pattern of winPatterns) {
            if (pattern.every(i => board[i].classList.contains("marked"))) {
                setTimeout(() => alert("BINGO!"), 100);
                break;
            }
        }
    }

    // Button click
    if (newCardButton) {
        newCardButton.addEventListener("click", generateBoard);
    }

    // Generate initial board
    generateBoard();

});
