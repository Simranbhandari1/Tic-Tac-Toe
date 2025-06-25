let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");
let newGameBtn = document.getElementById("new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");

let turnOf0 = true;
let count = 0;

const winPatterns = [
	[0, 1, 2],
	[0, 3, 6],
	[0, 4, 8],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[3, 4, 5],
	[6, 7, 8],
];

boxes.forEach((box) => {
	box.addEventListener("click", () => {
		if (turnOf0) {
			box.innerText = "0";
			turnOf0 = false;
		} else {
			box.innerText = "X";
			turnOf0 = true;
		}

		box.disabled = true;
		count++;

		let isWinner = checkWinner();

		if (count === 9 && !isWinner) {
			gameDraw();
		}
	});
});

const gameDraw = () => {
	msg.innerText = `Game is a Draw`;
	msgContainer.classList.remove("hide");
	disableBoxes();
};

const disableBoxes = () => {
	for (let box of boxes) {
		box.disabled = true;
	}
};

const enableBoxes = () => {
	for (let box of boxes) {
		box.disabled = false;
		box.innerText = "";
	}
};

const showWinner = (winner) => {
	msg.innerText = `Congratulations, Winner is ${winner}`;
	msgContainer.classList.remove("hide");
	disableBoxes();
};

const checkWinner = (winner) => {
	for (let pattern of winPatterns) {
		let val1 = boxes[pattern[0]].innerText;
		let val2 = boxes[pattern[1]].innerText;
		let val3 = boxes[pattern[2]].innerText;

		if (val1 != "" && val2 != "" && val3 != "") {
			if (val1 === val2 && val2 === val3) {
				showWinner(val1);
				return true;
			}
		}
	}
};

const reset = () => {
	turnOf0 = true;
	count = 0;
	enableBoxes();
	msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", reset);
resetBtn.addEventListener("click", reset);
