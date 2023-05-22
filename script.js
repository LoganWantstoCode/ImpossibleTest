window.onload = function () {
  let Correct = 0;
  let minutes;
  let seconds;
  let startingMinutes = 5;
  let time = startingMinutes * 60;
  let RefreshButton = () => {
    location.reload();
  };
  restartBtn.addEventListener("click", RefreshButton);

  const countdownEl = document.querySelector("#timer");

  let Interval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    if (minutes <= 0 && seconds <= 0) {
      clearInterval(Interval);
      minutes = 0;
      seconds = 0;
    }
    seconds = seconds < 10 ? "0" + seconds : seconds;

    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
  }

  var questionZone = document.getElementsByClassName("questions")[0],
    answerZone = document.getElementsByClassName("answers")[0],
    checker = document.getElementsByClassName("checker")[0],
    current = 0,
    allQ = {
      "What is RNG?": ["RNG", "RNG", "RNG", "RNG", 1],

      "What is a noob?": ["A chicken nugget", "Apple Sauce", "A noob", 2],

      "Are you a noob?": [
        "Yes I am a noob",
        "Not sure",
        "Maybe",
        "What is a noob?",
        0,
      ],

      "What is the smallest country in the world?": [
        "Monaco",
        "Vatican City",
        "Nauru",
        "USA",
        1,
      ],

      "How do you identify a noob?": [
        "Check Encyclopedia",
        "Ask a stranger",
        "Look in the mirror",
        "Pray and ask the heavens",
        2,
      ],

      "What does a noob smell like?": [
        "A chicken nugget",
        "Apple sauce",
        "A noob",
        0,
      ],
    };

  function loadNext(curr) {
    var question = Object.keys(allQ)[curr];

    questionZone.innerHTML = "";
    questionZone.innerHTML = question;
  }

  function loadResult(curr) {
    var answers = allQ[Object.keys(allQ)[curr]];

    answerZone.innerHTML = "";

    for (var i = 0; i < answers.length - 1; i += 1) {
      var createDiv = document.createElement("div"),
        text = document.createTextNode(answers[i]);

      createDiv.appendChild(text);
      createDiv.addEventListener("click", checkAnswer(i, answers));

      answerZone.appendChild(createDiv);
    }
  }

  function checkAnswer(i, arr) {
    return function () {
      let givenAnswer = i,
        correctAnswer = arr[arr.length - 1];

      if (givenAnswer === correctAnswer) {
        addChecker(true);
        Correct++;
      } else {
        addChecker(false);
        time = time - 60;
        if (time < 0) {
          alert("Failed... try again");
          location.reload();
        }
      }

      if (current < Object.keys(allQ).length - 1) {
        current += 1;

        loadNext(current);
        loadResult(current);
      } else {
        questionZone.innerHTML =
          "Congrats! Your score is " +
          Correct +
          "! Enter Initials for leaderboard";
        answerZone.innerHTML = "";
        let createHiscore = document.createElement("Input");
        createHiscore.setAttribute("type", "text");
        questionZone.append(createHiscore);
        answerZone.innerHTML = "Scores";
        let Hiscorebtn = document.createElement("button");
        let hiScores = JSON.parse(localStorage.getItem("scores")) || [];
        Hiscorebtn.addEventListener("click", function () {
          let score = { score: Correct, initials: createHiscore.value };
          hiScores.push(score);
          localStorage.setItem("scores", JSON.stringify(hiScores));
        });
        document.getElementById("scores").classList.remove("hidden");
        Hiscorebtn.innerText = "Submit";
        questionZone.append(Hiscorebtn);
        displayScores();
      }
    };
  }
  function displayScores() {
    let hiScores = JSON.parse(localStorage.getItem("scores")) || [];
    hiScores.sort(function (a, b) {
      return b.score - a.score;
    });
    for (let i = 0; i < hiScores.length; i++) {
      let liTag = document.createElement("li");
      liTag.textContent =
        i + 1 + ". " + hiScores[i].initials + " - " + hiScores[i].score;
      document.getElementById("highscores").append(liTag);
    }
  }

  function addChecker(bool) {
    var createDiv = document.createElement("div"),
      txt = document.createTextNode(current + 1);

    createDiv.appendChild(txt);

    if (bool) {
      createDiv.className += "correct";
      checker.appendChild(createDiv);
    } else {
      createDiv.className += "false";
      checker.appendChild(createDiv);
    }
  }
  loadNext(current);
  loadResult(current);
};
