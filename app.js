window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

var i=0, j=0;
var randomVar;
var currentScore = 0;
var divs = new Array(100);
var sus = new Array(100);
var boxColor = new Array(100);
var isClicked = new Array(100);
var susPosition = new Array(10);
var mainSection = document.querySelector('section');
var score = document.getElementById('score');

for (i=0; i<100; i++){
    divs[i] = document.createElement('div');
    divs[i].setAttribute('class', 'box');
    divs[i].setAttribute('onmousedown', `logMouseButton(event, ${i})`);
    sus[i] = 0;
    boxColor[i] = "green";
    isClicked[i] = 0;
}
for (i=0; i<100; i++){
    mainSection.appendChild(divs[i]);
}
for (i=0; i<10; i++){
    randomVar = Math.floor((Math.random()) * 100);
    if (sus[randomVar] == 1){
        i--;
        continue;
    }
    sus[randomVar] = 1;
    susPosition[i] = randomVar;

    boxColor[randomVar] = "red";
    if (randomVar%10 != 9){
        boxColor[randomVar-9] = "orange";
        boxColor[randomVar+1] = "orange";
        boxColor[randomVar+11] = "orange";
    }
    if (randomVar%10 != 0){
        boxColor[randomVar-11] = "orange"
        boxColor[randomVar-1] = "orange";
        boxColor[randomVar+9] = "orange";
    }
    boxColor[randomVar-10] = "orange";
    boxColor[randomVar+10] = "orange";
}

function logMouseButton(event, i){
    switch (event.button) {
        case 0:
            if (sus[i] == 1){
                for (j=0; j< 10; j++){
                    divs[susPosition[j]].style.background = "red";
                }
                setTimeout(() => {
                    alert('You Loose, Try Again..');
                    location.reload();
                }, 200);
            } else {
                if (isClicked[i]==0 || divs[i].style.background=="blue"){
                    isClicked[i]++;
                    if (boxColor[i]=="green"){
                        currentScore++;
                    } else if (boxColor[i] == "orange") {
                        currentScore += 2;
                    }
                    divs[i].style.background = boxColor[i];
                    score.innerHTML = currentScore; 
                }
            }
            break;
        case 2:
            divs[i].style.background = "blue";
            if (isClicked[i] == 1){
                isClicked[i] = 0;
                if (boxColor[i]=="green"){
                    currentScore--;
                } else if (boxColor[i] == "orange") {
                    currentScore -= 2;
                }
                score.innerHTML = currentScore;
            }
            break;
        default:
            alert('Click using LMB or RMB only!!');
    }
}