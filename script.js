const sneakyButton = document.getElementById("cantTouchThis");
const OFFSET = 100;
sneakyButton.addEventListener('click', () => {
    alert('Nice Try');
    window.close();
});

document.addEventListener('mousemove', (mice) => {
    const miceX = mice.pageX;
    const miceY = mice.pageY;
    const buttonBox = sneakyButton.getBoundingClientRect();
    const horizontalDistanceFrom = distanceFromCenter(buttonBox.x, miceX, buttonBox.height);
    const verticalDistanceFrom = distanceFromCenter(buttonBox.y, miceY, buttonBox.height);

    const horizontalOffset = buttonBox.width / 2 + OFFSET;
    const verticalOffset = buttonBox.height / 2 + OFFSET;
    if (Math.abs(horizontalDistanceFrom) <= horizontalOffset && Math.abs(verticalDistanceFrom) <= verticalOffset) {
        setButtonPosition(
            buttonBox.x + horizontalOffset / horizontalDistanceFrom * 10,
            buttonBox.x + verticalOffset / verticalDistanceFrom * 10
        );
    }
});

function setButtonPosition(left, top) {
    const windowBox = document.body.getBoundingClientRect();
    const sneakyBox = sneakyButton.getBoundingClientRect();

    if (distanceFromCenter(left, windowBox.left, sneakyBox.width) < 0) {
        left = windowBox.right - sneakyBox.width - OFFSET;
    }
    if (distanceFromCenter(left, windowBox.right, sneakyBox.width) > 0) {
        left = windowBox.left + OFFSET;
    }
    if (distanceFromCenter(top, windowBox.top, sneakyBox.height) < 0) {
        top = windowBox.bottom - sneakyBox.height - OFFSET;
    }
    if (distanceFromCenter(top, windowBox.bottom, sneakyBox.height) > 0) {
        top = windowBox.top + OFFSET;
    }

    sneakyButton.style.left = `${left}px`;
    sneakyButton.style.top = `${top}px`;
}

function distanceFromCenter(boxPosition, mousePosition, boxSize) {
    return boxPosition - mousePosition + boxSize / 2;
}