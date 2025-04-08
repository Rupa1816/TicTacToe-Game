let boxes=document.querySelectorAll(".box");
let newbtn=document.querySelector("#new-btn");
let resetbtn=document.querySelector("#reset-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let gameHide=document.querySelector("#main-section")

let turnO=true;
let count=0;
let gameOver=false;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame = () =>{
    turnO=true;
    count=0;
    gameOver=false;
    enableBoxes();
    msgContainer.classList.add("hide");
    gameHide.classList.remove("hide-main");
}
boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(gameOver|| box.innerText!==""){
            return;
        }
        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        box.disabled=true;
        count++;
        if (count >= 5 && checkWinner()) {
            return ;
        }
        if (count === 9) {
            gameDraw();
        }
    });
});

const gameDraw=()=>{
    msg.innerText=`Game was a Draw`;
    msgContainer.classList.remove("hide");
    gameHide.classList.add("hide-main");
    gameOver=true;
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes =()=>{
    boxes.forEach((box)=>{
        box.disabled=false;
        box.innerText="";
    })
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameHide.classList.add("hide-main");
    disableBoxes();
    gameOver=true;
}

const checkWinner= () =>{
    for(pattern of winPatterns){
        const [a, b, c] = pattern;
        let pos1 = boxes[a].innerText;
        let pos2 = boxes[b].innerText;
        let pos3 = boxes[c].innerText;

        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return true;
        }
    }
    return false;
};

newbtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);