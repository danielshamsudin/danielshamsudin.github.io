var mem = {
  /* [INITIALIZE] */
  grid: [], // current play grid
  total: 6, // total number of pairs to match
  init: function () {
    // init() : initialize the game

    // (1) ARRAY OF AVAILABLE PAIRS
    mem.grid = [];
    for (var i = 1; i <= mem.total; i++) {
      mem.grid.push(i);
      mem.grid.push(i);
    }

    //shuffle
    var currentIndex = mem.grid.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = mem.grid[currentIndex];
      mem.grid[currentIndex] = mem.grid[randomIndex];
      mem.grid[randomIndex] = temporaryValue;
    }

    // (3) RESET THE SCORES
    mem.remain = mem.total;
    mem.moves = 0;
    mem.mistakes = 0;
    mem.first = null;
    mem.second = null;
    if (mem.timer != null) {
      clearTimeout(mem.timer);
      mem.timer = null;
    }

    // (4) DRAW HTML GRID
    var container = document.getElementById("mem-play"),
      card = null;
    container.innerHTML = "";
    for (var i = 0; i < mem.grid.length; i++) {
      card = document.createElement("div");
      card.innerHTML = "<img src='memory-game/smiley-0.png'/>";
      card.classList.add("mem-card");
      card.setAttribute("id", "mem-card-" + i);
      card.dataset.idx = i;
      card.addEventListener("click", mem.play);
      container.appendChild(card);
    }

    // (X) CHEAT - SEE THE SHUFFLED CARDS
    // console.log(mem.grid);
  },

  /* [PLAY] */
  remain: 0, // number of pairs remaining
  moves: 0, // total number of moves
  mistakes: 0, // total number of mismatches
  first: null, // first opened card
  second: null, // second opened card

  // After showing 2 wrong cards, there will be a short delay before flipping back
  show: 1000, // time to show wrong cards, in micro seconds
  timer: null, // timer to flip back
  play: function () {
    // play() : when a card is selected

    // (1) CHECKS - "SAFETY LOCK"
    // Will proceed only when not showing wrong cards
    // Will proceed only if selected card is different
    if (mem.second === null) {
      if (this.dataset.idx != mem.first) {
        // (2) "SAVE" THE SELECTED CARD
        if (mem.first === null) {
          mem.first = this.dataset.idx;
        } else {
          mem.second = this.dataset.idx;
        }

        // (3) FLIP OPEN & SHOW TM PRODUCTS
        this.classList.add("open");
        this.innerHTML =
          "<img src='memory-game/tm-" + mem.grid[this.dataset.idx] + ".png'/>";

        // (4) MATCH CARDS WHEN 2 ARE SELECTED + UPDATE STATS
        mem.moves++;
        if (mem.first !== null && mem.second !== null) {
          if (mem.grid[mem.first] == mem.grid[mem.second]) {
            // (4A) MATCHED
            mem.update(true);
            mem.remain--;

            // (4B) WIN - ALL MATCHED
            if (mem.remain == 0) {
              alert(
                "WIN! Moves - " + mem.moves + " Mistakes - " + mem.mistakes
              );

              var bonusMark = mem.moves - mem.mistakes;
              if (bonusMark < 2) {
                bonusMark = 2;
              } else if (bonusMark > 6) {
                bonusMark = 6;
              }

              window.localStorage.setItem("bonusMark", bonusMark);
            }
          } else {
            // (4C) MISMATCH
            mem.timer = setTimeout(mem.update, mem.show);
            mem.mistakes++;
          }
        }
      }
    }
  },

  update: function (ok) {
    // update() : flip the cards back and hide?
    // PARAM ok : true for cards matched, false (or undefined) for mismatch

    // (5) FIRST CARD
    var card = document.getElementById("mem-card-" + mem.first);
    card.classList.remove("open");
    if (ok) {
      card.classList.add("ok");
    } else {
      card.innerHTML = "<img src='memory-game/smiley-0.png'/>";
      card.addEventListener("click", mem.play);
    }

    // (6) SECOND CARD
    card = document.getElementById("mem-card-" + mem.second);
    card.classList.remove("open");
    if (ok) {
      card.classList.add("ok");
    } else {
      card.innerHTML = "<img src='memory-game/smiley-0.png'/>";
      card.addEventListener("click", mem.play);
    }

    // (7) RESET SELECTIONS
    mem.first = null;
    mem.second = null;
    mem.timer = null;
    window.localStorage.setItem("bonusMark", 0);
  },
};

/* [START ON WINDOW LOAD] */
window.addEventListener("load", mem.init);
