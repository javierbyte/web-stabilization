const iframeEl = document.querySelector(".iframeContainer");

let motionBeta = 0;
let rotation = 0;
let accelerationX = 0;
let accelerationY = 0;

let style = 0;

let last = new Date().getTime();

function handleDeviceOrientationEvent(event) {
  motionBeta = -1 * event.beta;
}

function handleDeviceMotionEvent(event) {
  const rotationRate = event.rotationRate;
  const acceleration = event.acceleration;

  rotation = rotationRate.gamma;
  accelerationX = (3 * accelerationX + Math.pow(acceleration.y, 1) * -10) / 4;
  accelerationY = (3 * accelerationY + Math.pow(acceleration.x, 1) * -10) / 4;
}

function paint() {
  if (style == 1) iframeEl.style.transform = `rotate(${motionBeta}deg)`;

  if (style == 2)
    iframeEl.style.transform = `rotate(${rotation *
      0.06}deg) translatex(${accelerationX}px) translatey(${accelerationY}px)`;

  if (style == 3)
    iframeEl.style.transform = `rotate(${rotation * 0.04 +
      motionBeta /
        2}deg)  translatex(${accelerationX}px) translatey(${accelerationY}px)`;

  // if (style == 2)
  //  iframeEl.style.transform = `rotate(${rotation * 0.06 + motionBeta}deg)`;

  window.requestAnimationFrame(paint);
}
paint();

// Add event listeners to all the buttons to change the algorithm
[...document.querySelectorAll("[data-value]")].forEach(el => {
  el.addEventListener("click", () => {
    document
      .querySelector(".option-element.-active")
      .classList.remove("-active");
    el.classList.add("-active");

    style = el.dataset.value;
  });
});

window.addEventListener(
  "deviceorientation",
  handleDeviceOrientationEvent,
  true
);
window.addEventListener("devicemotion", handleDeviceMotionEvent, true);
