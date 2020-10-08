document.addEventListener("DOMContentLoaded", () => {
    const model = document.querySelector(".character");
    const grid = document.querySelector(".grid");
    const Start = document.querySelector(".start");
    const Score = document.querySelector(".score");
    let bottom = 0,
        score = 0,
        gravity = 0.9,
        stop = false,
        down;

    function jump() {
        let jumpUp = setInterval(function () {
            if (bottom > 250) {
                clearInterval(jumpUp);
                clearInterval(down);
                model.classList.remove("down");
                let jumpDown = setInterval(function () {
                    if (bottom < 0) {
                        clearInterval(jumpDown);
                    }
                    jumping = true;
                    bottom -= 5;
                    bottom *= gravity;
                    model.style.bottom = bottom + "px";
                }, 20);
            }
            bottom += 30;
            bottom = bottom * gravity;
            model.classList.add("character");
            model.style.bottom = bottom + "px";
        }, 20);
    }

    function Slide() {
        model.classList.add("down");
        model.classList.remove("character");
        bottom = 0;
    }

    function Up() {
        model.classList.remove("down");
        model.classList.add("character");
    }

    function createBlock() {
        var h = -(Math.random() * 100 - 390);
        let left = grid.clientWidth;
        const block = document.createElement("div");
        block.classList.add("block");
        grid.appendChild(block);
        block.style.left = left + "px";
        console.log(h);
        block.style.top = h + "px";
        function moveBlock() {
            left -= 2;
            if (left < -50) {
                clearInterval(timerId);
                Score.innerHTML = "Score : " + score++;
                grid.removeChild(block);
            }
            console.log(bottom);
            if (left > 0 && left < 40 && bottom < 0) {
                stop = true;
                clearInterval(timerId);
                grid.removeChild(block);
                alert("game over");
                location.reload();
            }
            block.style.left = left + "px";
        }
        let timerId = setInterval(moveBlock, 2);
        if (!stop) setTimeout(createBlock, 2000);
    }

    function control(e) {
        if (e.keyCode == 32) {
            jump();
        } else if (e.keyCode == 83) {
            Slide();
        } else if (e.keyCode === 87) {
            Up();
        }
    }
    Start.addEventListener("click", () => {
        createBlock();
    });

    document.addEventListener("keyup", control);
});
