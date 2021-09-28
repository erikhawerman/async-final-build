// Sparar ner de relevanta knappelementen.
// const btnDownPage2 = document.getElementById("down-to-second-page");
const btnUpPage1 = document.getElementById("up-first-page");

// Sparar ner relevanta containers på sidan.
// const page2 = document.getElementById("second-page");
const page1 = document.querySelector(".first-page");

// Scrollar automatiskt till relevant container vid knapptryck.
// btnDownPage2.addEventListener("click", function () {
//   page2.scrollIntoView({ behavior: "smooth" });
// });

btnUpPage1.addEventListener("click", function () {
  page1.scrollIntoView({ behavior: "smooth" });
});
