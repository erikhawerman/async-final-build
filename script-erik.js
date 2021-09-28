$(document).ready(function () {
  const btnMySkills = document.getElementById("my-skills");
  const btnWhoAmI = document.getElementById("who-am-i");
  const btnContactMe = document.getElementById("contact-me");
  const secondPage = document.querySelector(".second-page");
  const thirdPage = document.querySelector(".third-page");
  const fourthPage = document.querySelector(".fourth-page");
  const attributes = document.querySelectorAll(".attribute-container");

  // Gör att varje knapp lysnar efter att bli klickad på och skrollar då ner sidan till sin sida.
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
  const attributeCallback = function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.remove("hiddenPushedDown");
      console.log(e.target);
      observeAttributes.unobserve(e.target);
    });
  };
  // Observer som letar att objekten som observeras och anropar callback-funktionen vid 15% korsning.
  const observeAttributes = new IntersectionObserver(attributeCallback, {
    root: null,
    threshold: 0.15,
  });
  // Loopar igenom alla egenskaper och ber observern att observera samtliga element.
  attributes.forEach(function (attribute) {
    observeAttributes.observe(attribute);
  });
});
