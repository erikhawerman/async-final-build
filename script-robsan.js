// const lådor = document.querySelectorAll(".kunskapsLada");
// const barsRobin = document.querySelectorAll(".bar");
const btnSkills = document.getElementById("skills");
const btnMe = document.getElementById("hittaMig");
const secondPage = document.getElementById("secondPage");
const thirdPage = document.getElementById("thirdPage");
// scrollar i sidorna vid klick på knapparna
btnSkills.addEventListener("click", function () {
  secondPage.scrollIntoView({ behavior: "smooth" });
});
btnMe.addEventListener("click", function () {
  thirdPage.scrollIntoView({ behavior: "smooth" });
});
// // fyller kunskapsbaren i procent med hjälp av hoverfunctionen, och klick på mobile first
// const procentBar = function (bar, procent) {
//   barsRobin[bar - 1].procent = procent;
// };


// var kunskapsProcent= $(".stapel-procent").map(function() {
//   return $(this).text().replace(/[^\d]/g, "");  
// }).get();

// //funktion för att föra in rätt parametrar i procentStapel
// // function deklareraStaplar(){
// for(let i = 1; i < $(".stapel-procent").length + 1; i++){
//   procentBar(i, kunskapsProcent[i-1]);
//   console.log(( i, kunskapsProcent[i-1]));
// }


// lådor.forEach(function (låda, i) {
//   låda.addEventListener("mouseenter", function () {
//     let index = 0;
//     setInterval(function () {
//       if (index >= barsRobin[i].procent) return;
//       index++;
//       barsRobin[i].style.width = `${index}%`;
//     }, 10);
//   });
  
// });

