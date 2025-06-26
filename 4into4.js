let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");
let newGameBtn = document.getElementById("new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");

let turnOf0 = true;
let count = 0;

const winPatterns = [
	// Horizontal
	[0, 1, 2, 3],
	[4, 5, 6, 7],
	[8, 9, 10, 11],
	[12, 13, 14, 15],

	[0, 4, 8, 12],
	[1, 5, 9, 13],
	[2, 6, 10, 14],
	[3, 7, 11, 15],
	
	[0, 5, 10, 15],
	[3, 6, 9, 12]
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

		if (count === 16 && !isWinner) {
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

const checkWinner = () => {
	for (let pattern of winPatterns) {
		let val1 = boxes[pattern[0]].innerText;
		let val2 = boxes[pattern[1]].innerText;
		let val3 = boxes[pattern[2]].innerText;
		let val4 = boxes[pattern[3]].innerText;

		if (val1 && val1 === val2 && val2 === val3 && val3 === val4) {
			showWinner(val1);
			return true;
		}
	}
	return false;
};

const reset = () => {
	turnOf0 = true;
	count = 0;
	enableBoxes();
	msgContainer.classList.add("hide");
	msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", reset);
resetBtn.addEventListener("click", reset);
