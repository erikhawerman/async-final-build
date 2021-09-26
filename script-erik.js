$(document).ready(function () {
  const btnMySkills = document.getElementById("vad-jag-kan");
  const btnWhoAmI = document.getElementById("vem-är-jag");
  const btnContactMe = document.getElementById("kontakta-mig");
  const secondPage = document.querySelector(".second-page");
  const thirdPage = document.querySelector(".third-page");
  const fourthPage = document.querySelector(".fourth-page");
  const skills = document.querySelectorAll(".egenskap-container");

  btnMySkills.addEventListener("click", function () {
    secondPage.scrollIntoView({ behavior: "smooth" });
  });
  btnWhoAmI.addEventListener("click", function () {
    thirdPage.scrollIntoView({ behavior: "smooth" });
  });
  btnContactMe.addEventListener("click", function () {
    fourthPage.scrollIntoView({ behavior: "smooth" });
  });

  // Egenskaper callback - visar egenskaper och tar sedan bort observer för högre performance
  const skillCallback = function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.remove("hidden");
      observeSkills.unobserve(e.target);
    });
  };
  const observeSkills = new IntersectionObserver(skillCallback, {
    root: null,
    threshold: 0.15,
  });

  skills.forEach(function (skill) {
    observeSkills.observe(skill);
  });
});
