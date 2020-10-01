document.addEventListener("DOMContentLoaded", () => {
    const model = document.querySelector(".character");
    const grid = document.querySelector(".grid");
    let bottom = 0;
    let gravity = 0.9;
    function jump() {
        let upTimerId = setInterval(function () {
            if (bottom > 250) {
                clearInterval(upTimerId);
                let downTimerId = setInterval(function () {
                    if (bottom < 0) {
                        clearInterval(downTimerId);
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

    function control(e) {
        if (e.keyCode == 32) {
            jump();
        }
    }

    document.addEventListener("keyup", control);
});
