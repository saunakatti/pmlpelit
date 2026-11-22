// Sanasotkupeli (mixed words game)
// Made by Onni V (Saunakatti), no AI was used

// Define amount of diff words
var wordsAmount = ""

// Define array of words globally
var words = ""

// Fetch the word and hint list
fetch("./sanat.txt")
    .then(res => res.text())
    .then(wordList => {
        words = wordList.split('\n');
        displayShuffledWord(words);

        wordsAmount = words.length

        document.getElementById("WordsAmount").innerHTML += `<b>&nbsp; ${wordsAmount}</b>`


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
    const rowArray = randomRow.split(": ")

    displayHint(true)
    wordDisplay.innerHTML = ""

    word = rowArray[0]
    hint = rowArray[1]

    let wordArray = word.split("");

    shuffleArray(wordArray);

    for (let i = 0; i < wordArray.length; i++) {
        wordDisplay.innerHTML += `<span id=WordCharacter>${wordArray[i]}</span>`
    }

    wordChars = document.querySelectorAll("#WordCharacter")
    wordChars.forEach(element => {
        if (element.innerHTML == " ") {
            element.innerHTML = "_"
        } else return
    });
}

function submitAnswer(event) {
   event
   .preventDefault();
   let answer = event.target.answer.value;

   console.log("-------- Answer Submitted ---------");
   console.log("The player answered: " + answer);
   console.log("The correct answer is: " + word);

   const feedbackField = document.getElementById("Feedback");

   if (answer == word && tries > 0) {
    streak += 1;
    tries = 3
    console.log("The player's answer was correct. Streak: " + streak);

    feedbackField.innerHTML = `<h4 style="color: green;">Oikein. Streakkisi on ${streak}</h4>`
    document.getElementById("Form").reset();
    displayShuffledWord(words)

   } else if (tries == 1 && answer != word) {
    tries = 3
    streak = 0
    console.log("The player's answer was wrong. Game Over.")

    feedbackField.innerHTML = `<h4 style="color: red;">Hävisit. Oikea sana oli <i>${word}</i></h4>`
    document.getElementById("Form").reset();
    displayShuffledWord(words)
   } else if (tries > 0 && answer != word) {
    tries -= 1;
    console.log("The player's answer was wrong. Tries left: " + tries);

    feedbackField.innerHTML = `<h4 style="color: red;">Väärin. Yrityksiä jäljellä: ${tries}</h4>`
   } else feedbackField.innerHTML = `<h4>Error: tries ${tries}, streak ${streak}, word ${word}, answer ${answer}</h4>`
}

function displayHint(clear = false) {
    hintContainer = document.getElementById("Hint")

    if (clear == true) {
        hintContainer.innerHTML = ` `
    } else {
        hintContainer.innerHTML = `<span>${hint}<span>`
    }
}
