$(document).ready(function () {
  const btnSkills = document.getElementById("vad-jag-kan");
  const btnMe = document.getElementById("vem-är-jag");
  const secondPage = document.querySelector(".second-page");
  const thirdPage = document.querySelector(".third-page");
  const skills = document.querySelectorAll(".egenskap-container");

  btnSkills.addEventListener("click", function () {
    secondPage.scrollIntoView({ behavior: "smooth" });
  });
  btnMe.addEventListener("click", function () {
    thirdPage.scrollIntoView({ behavior: "smooth" });
  });

  //visa egenskaper
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
