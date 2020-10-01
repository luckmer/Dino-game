document.addEventListener("DOMContentLoaded", () => {
    const model = document.querySelector(".character");
    const grid = document.querySelector(".grid");
    let bottom = 0,
        gravity = 0.9,
        stop = false;

    function jump() {
        let jumpUp = setInterval(function () {
            if (bottom > 250) {
                clearInterval(jumpUp);
                let jumpDown = setInterval(function () {
                    if (bottom < 0) {
                        clearInterval(jumpDown);
                    }
                    bottom -= 5;
                    bottom *= gravity;
                    model.style.bottom = bottom + "px";
                }, 20);
            }
            bottom += 30;
            bottom = bottom * gravity;
            model.style.bottom = bottom + "px";
        }, 20);
    }

    function createBlock() {
        let left = grid.clientWidth;
        const block = document.createElement("div");
        block.classList.add("block");
        grid.appendChild(block);
        block.style.left = left + "px";
        function moveBlock() {
            left -= 2;
            if (left < -50) {
                clearInterval(timerId);
                grid.removeChild(block);
            }
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
        }
    }
    createBlock();

    document.addEventListener("keyup", control);
});
