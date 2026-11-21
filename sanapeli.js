// Sanasotkupeli (mixed words game)
// Made by Onni V (Saunakatti), no AI was used

var words = ""

// Fetch the word and hint list
fetch("./sanat.txt")
    .then(res => res.text())
    .then(wordList => {
        words = wordList.split('\n');
        displayShuffledWord(words);

        // Prevent page from reloading when form is submitted
        var form = document.getElementById("Form");
        function handleForm(event) { event.preventDefault(); } 
        form.addEventListener('submit', handleForm);
    })
    .catch(err => console.error("Error loading word list:", err));

// Define the word, hint, tries and streak as global variables
var word = ""
var hint = ""
var tries = 3
var streak = 0

// https://www.geeksforgeeks.org/dsa/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

function displayShuffledWord(words) {
    const wordDisplay = document.getElementById("ShuffledWord")
    const randomRow = words[Math.floor(Math.random() * words.length)];
    const rowArray = randomRow.split(":")

    word = rowArray[0]
    hint = rowArray[1]

    let wordArray = word.split("");

    shuffleArray(wordArray);

    const shuffledWord = wordArray.join("");

    if (wordDisplay) {
        wordDisplay.innerHTML = `<h2>${shuffledWord}</h2>`
    }
}

function submitAnswer(event) {
   event
   .preventDefault();
   let answer = event.target.answer.value;

   console.log("-------- Answer Submitted ---------");
   console.log("The player answered: " + answer);
   console.log("The correct answer is: " + word);

   const feedbackField = document.getElementById("Feedback");

   if (answer == word && tries > 1) {
    streak += 1;
    console.log("The player's answer was correct. Streak: " + streak);

    feedbackField.innerHTML = `<h4 style="color: green;">Vastasit oikein. Streakkisi on ${streak}</h4>`
    document.getElementById("Form").reset();
    displayShuffledWord(words)

   } else if (tries > 1) {
    tries -= 1;
    console.log("The player's answer was wrong. Tries left: " + tries);
   } else {
    tries -= 1
    console.log("The player's answer was wrong. " + tries + " tries left. Game Over.")
   }
}
