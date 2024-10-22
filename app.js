let rstbtn = document.querySelector("#rst-btn");
let newbtn = document.querySelector("#new-btn");
let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msg-container");

let turn0 = true;

const winpatterns = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];
const resetgame = () => {
  turn0 = true;
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
  msgcontainer.classList.add("hide");
};

boxes.forEach((boxes) => {
  boxes.addEventListener("click", () => {
    console.log(`box was clicked`);
    if (turn0) {
      boxes.innerText = `O`;
      boxes.style.color = "#AFFC41";
      turn0 = false;
    } else {
      boxes.innerText = "X";
      boxes.style.color = "#870058";
      turn0 = true;
    }
    boxes.disabled = true;
    checkwinner();
  });
});

msgcontainer.classList.add("hide");
const showwinner = (winner) => {
  msg.innerText = `Congratulations! "${winner}" is the Winner!`;
  msgcontainer.classList.remove("hide");
};

const checkDraw = () => {
  let allBoxesFilled = true;
  boxes.forEach((box) => {
    if (box.innerText === "") {
      allBoxesFilled = false;
    }
  });
  if (allBoxesFilled) {
    msg.innerText = "It's a draw!";
    msgcontainer.classList.remove("hide");
  }
};

const checkwinner = () => {
  let winnerFound = false;
  for (pattern of winpatterns) {
    let pos1val = boxes[pattern[0] - 1].innerHTML;
    let pos2val = boxes[pattern[1] - 1].innerHTML;
    let pos3val = boxes[pattern[2] - 1].innerHTML;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log(`${pos1val} is the winner`);
        boxes.forEach((box) => (box.disabled = true));
        showwinner(pos1val);
        winnerFound = true;
      }
    }
  }
  if (!winnerFound) {
    // add this check
    checkDraw();
  }
};
newbtn.addEventListener("click", resetgame);
rstbtn.addEventListener("click", resetgame);
