// Bildspelet
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnPause = document.querySelector(".btn-pause");
let currentSlide = 0;
const maxSlides = slides.length;
let sliderRunning = true;
let run;
const pausePlayDelay = 500;
const nextSlideDelay = 5000;
// Bildspelsrubriken
const area = document.getElementById("område");
const areaArray = ["Problemlösning", "Effektivisering", "Spelutveckling"];
const delayTyping = 110;
let characterIndex = 0;
let typeInterval;
let startTimer;

// Skriver ut texten
const typeText = function (word) {
  if (characterIndex < areaArray[word].length) {
    area.textContent += areaArray[word].charAt(characterIndex);
    characterIndex++;
  } else {
    characterIndex = 0;
    clearInterval(typeInterval);
  }
};

// Går till en bild
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

// Nästa bild
const nextSlide = function () {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  area.textContent = "-";
  typeInterval = setInterval(function () {
    typeText(currentSlide);
  }, delayTyping);
};

//Lägger in en pause of play funktion i bildspelet
slider.addEventListener("click", function () {
  if (sliderRunning) {
    btnPause.style.display = "block";
    sliderRunning = false;
    clearInterval(run);
    clearInterval(typeInterval);
    btnPause.classList.contains("play")
      ? btnPause.classList.remove("play")
      : "";
    btnPause.classList.add("paused");
    setTimeout(function () {
      btnPause.style.display = "none";
    }, pausePlayDelay);
  } else {
    btnPause.style.display = "block";
    setTimeout(function () {
      btnPause.style.display = "none";
    }, pausePlayDelay);
    sliderRunning = true;
    btnPause.classList.contains("paused")
      ? btnPause.classList.remove("paused")
      : "";
    btnPause.classList.add("play");
    nextSlide();
    characterIndex = 0;
    typeText(currentSlide);
    run = setInterval(nextSlide, nextSlideDelay);
  }
});
startTimer = function () {
  run = setInterval(nextSlide, nextSlideDelay);
};
startTimer();

const stopTimer = function () {
  clearInterval(run);
};
