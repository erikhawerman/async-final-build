$(document).ready(function () {
  //Hamburgermeny
  let burgerMenu = false;

  function hamburgerMenuOpenClose() {
    $(".mobile-menu").slideToggle(100, function () {
      if (!burgerMenu) {
        $(".page-to-dim").fadeTo(100, 0.1);
        burgerMenu = true;
      } else {
        $(".page-to-dim").fadeTo(100, 1);
        burgerMenu = false;
      }
      $(".menu-list").toggle();
    });
  }
  $(".burger-icon").click(function () {
    hamburgerMenuOpenClose();
  });

  //Smooth-scrolls mobil

  $(".logo").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#first-page").offset().top,
      },
      1000
    );
  });

  $("#startsida").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#first-page").offset().top,
      },
      1000,
      hamburgerMenuOpenClose()
    );
  });
  $("#om-oss").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#second-page").offset().top,
      },
      1000,
      hamburgerMenuOpenClose()
    );
  });
  $("#vi-jobbar-inom").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#third-page").offset().top,
      },
      1000,
      hamburgerMenuOpenClose()
    );
  });
  $("#kontakta-oss").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#fourth-page").offset().top,
      },
      1000,
      hamburgerMenuOpenClose()
    );
  });

  //Smooth skroll för browsern

  $(".logo").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#first-page").offset().top,
      },
      1000
    );
  });

  $("#startsida-browser").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#first-page").offset().top,
      },
      1000
    );
  });
  $("#om-oss-browser").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#second-page").offset().top,
      },
      1000
    );
  });
  $("#vi-jobbar-inom-browser").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#third-page").offset().top,
      },
      1000
    );
  });
  $("#kontakta-oss-browser").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#fourth-page").offset().top,
      },
      1000
    );
  });

  // Smoothscroll pil
  $("#down-to-second-page").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#second-page").offset().top,
      },
      1000
    );
  });

  //deklarera staplarna som ska fyllas
  const bars = $(".skillbox-to-fill");
  //Ger staplarna sin procentsats som attribut
  const barPercentage = function (bar, percent) {
    bars[bar - 1].percent = percent;
  };

  //hämta enbart siffror från klassen stapel-to-get,
  var skillPercentage = $(".stapel-procent").map(function () {
    return $(this).text().replace(/[^\d]/g, "");
  });
  //funktion för att föra in rätt parametrar i barPercentage
  for (let i = 1; i < $(".stapel-procent").length + 1; i++) {
    barPercentage(i, skillPercentage[i - 1]);
  }

  //funktion för att fylla staplarna
  const fillBar = function (bar) {
    let i = 0;
    setInterval(function () {
      if (i >= bar.percent) return;
      i++;
      bar.style.width = `${i}%`;
    }, 30);
  };
  //Skapa en observer callback
  const barCallback = function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      fillBar(e.target);
      skillObserver.unobserve(e.target);
    });
  };

  //Skapa en observer för staplarna
  const skillObserver = new IntersectionObserver(barCallback, {
    root: null,
    threshold: 0.15,
  });

  // Fyll staplarna
  Array.from(bars).forEach(function (skill) {
    skillObserver.observe(skill);
  });

  // Bildspel

  //Skapar en observer callback för slidern
  const sliderCallback = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      stopTimer();
      return;
    }
    startTimer();
  };

  // Skapa bildspelsObserver
  const observeSlider = new IntersectionObserver(sliderCallback, {
    root: null,
    threshold: 0.2,
  });

  // Observera vår slider

  observeSlider.observe(slider);

  //AJAX
  function getXML() {
    $.ajax({
      type: "GET",
      url: "XMLFile.xml",
      dataType: "xml",

      error: function (e) {
        alert("Det gick inte att läsa XML-filen");
        console.error("XML reading Failed: ", e);
      },

      success: function (xmlData) {
        $(xmlData)
          .find("project")
          .each(function () {
            const manager = $(this).find("manager").text();
            const title = $(this).find("title").text();
            const customer = $(this).find("customer").text();
            const startDate = $(this).find("startDate").text();
            const endDate = $(this).find("endDate").text();
            const image = $(this).find("image").text();
            const description = $(this).find("description").text();

            // Skapa html-elementets markup
            let markup = `
          <li>
              <div class="project scale-on-hover">
                <img src="images/${image}" alt="" />
                <div class="facts">
                  <h3>${title}</h3>
                  <p>${description}</p>
                  <p><i> Manager: </i></p>
                  <p>${manager}</p>
                  <p><i> Customer: </i></p>
                  <p>${customer}</p>
                  <h5><i>${startDate} - ${endDate}</i></h5>
                </div>
              </div>
            </li>
          `;
            // Skriver ut markupen som html
            $(".projectlist").append(markup);
          });
      },
    });
  }
  getXML();

  // Validering av kontaktformuläret
  const nameField = document.getElementById("Name");
  const emailField = document.getElementById("e-mail");
  const phoneField = document.getElementById("Phone");
  const textArea = document.getElementById("Kontaktform");
  const errorBoxName = document.getElementById("error-name");
  const errorBoxEmail = document.getElementById("error-e-mail");
  const errorBoxPhone = document.getElementById("error-phone");
  const errorBoxTextArea = document.getElementById("error-text-area");
  // Regular expressions
  const notEmpty = /.+/;
  const regExName = /[^a-zA-ZÅÄÖåäö]/;
  const regExLength = /^.{3,}$/;
  const regExMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Felmeddelanden
  const errorSpecialChar = "Du har skrivit otillåtna tecken";
  const errorTooFewChar = "Du har skrivit för få tecken";
  const errorNotAnEmail = "Email-adressen du angivet är ej giltig";
  const errorNotaNumber = "Du har angivet tecken som ej är siffror";
  const errorIsEmpty = "Text ej angiven";
  //Skicka-knappen
  const submitButton = document.getElementById("submit-form");
  //Valideringsstapeln
  const validationboxToFill = document.getElementById("validationbox-to-fill");
  // Hur många fält det finns
  const numberOfFields = 4;
  //Hur många utav fälten som är korrekt ifyllda
  let validatedFields = 0;

  //Gör så att skicka-knappen endast syns om fälten är korrekt ifyllda
  const showSendButton = function () {
    if (
      validatedFields === numberOfFields - 1 ||
      validatedFields === numberOfFields
    ) {
      submitButton.style.display = "inline-block";
    } else {
      submitButton.style.display = "none";
    }
  };
  // Fyller den interaktiva valideringsbaren 25% för varje fält som är korrekt ifyllt
  const fillValidationBar = function () {
    if (validatedFields > numberOfFields) return;
    validationboxToFill.style.width = `${validatedFields * 25}%`;
  };
  // Gör att fältet bli invaliderat
  const invalidateBox = function (box) {
    box.style.border = "2px ridge red";
    // Om fältet inte redan var validerat ska inte antalet validerade fält minska
    if (!box.validated) return;
    box.validated = false;
    validatedFields--;
    fillValidationBar();
    showSendButton();
  };
  // Gör att fältet blir validerat
  const validateBox = function (field, errorBox) {
    // Tar bort eventuell röd ram runt fältet
    field.style.border = "";
    // Tar bort eventuellt felmeddelande som stod vid fältet.
    errorBox.classList.add("hidden");
    // Om fältet redan var validerat ska inte antalet validerade fält öka.
    if (field.validated) return;
    field.validated = true;
    validatedFields++;
    fillValidationBar();
    showSendButton();
  };
  // Gör en röd ram runt det felaktigt ifyllda fältet samt genererar felmeddelande.
  const displayErrorBox = function (box, error) {
    box.classList.remove("hidden");
    box.innerHTML = error;
  };
  // Validera namnfältet
  const validateName = function (e) {
    const input = document.getElementById("Name").value;

    if (regExName.test(input)) {
      invalidateBox(e.target);
      displayErrorBox(errorBoxName, errorSpecialChar);
      return;
    }
    if (!regExLength.test(input)) {
      invalidateBox(e.target);
      displayErrorBox(errorBoxName, errorTooFewChar);
      return;
    } else {
      validateBox(e.target, errorBoxName);
    }
  };
  const validateEmail = function (e) {
    const input = document.getElementById("e-mail").value;
    if (!regExMail.test(input)) {
      invalidateBox(e.target);
      displayErrorBox(errorBoxEmail, errorNotAnEmail);
      return;
    } else {
      validateBox(e.target, errorBoxEmail);
    }
  };
  const validatePhone = function (e) {
    const input = document.getElementById("Phone").value;
    if (!/^\d+$/.test(input)) {
      invalidateBox(e.target);
      displayErrorBox(errorBoxPhone, errorNotaNumber);
      return;
    }
    if (input.length < 3) {
      invalidateBox(e.target);
      displayErrorBox(errorBoxPhone, errorTooFewChar);
      return;
    } else {
      validateBox(e.target, errorBoxPhone);
    }
  };
  const validateTextArea = function (e) {
    const input = document.getElementById("Kontaktform").value;
    if (!notEmpty.test(input)) {
      invalidateBox(e.target);
      displayErrorBox(errorBoxTextArea, errorIsEmpty);
      return;
    } else {
      validateBox(e.target, errorBoxTextArea);
    }
  };
  if (nameField && emailField && phoneField) {
    nameField.addEventListener("keyup", validateName);
    emailField.addEventListener("keyup", validateEmail);
    phoneField.addEventListener("keyup", validatePhone);
    textArea.addEventListener("keyup", validateTextArea);
  }

  // API-fullskärm
  let fullscreen = document.querySelector("#third-page");

  document.addEventListener(
    "keydown",
    function (e) {
      if (e.keyCode == 13) {
        toggleFullScreen();
      }
    },
    false
  );

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      fullscreen?.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // Locale storage

  //om submit-knappen finns, kör denna kod
  if (submitButton) {
    submitButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (validatedFields !== numberOfFields) {
        if (nameField.validated !== true) invalidateBox(nameField);
        if (phoneField.validated !== true) invalidateBox(phoneField);
        if (emailField.validated !== true) invalidateBox(emailField);
        if (textArea.validated !== true) invalidateBox(textArea);
        alert("Uppgifter saknas");
        return;
      }
      //spara datan från inputesn i ett objekt
      const formData = {
        name: $("#Name").val(),
        phone: $("#Phone").val(),
        mail: $("#e-mail").val(),
        message: $("#Kontaktform").val(),
      };
      //gör objektet till en sträng
      const formJSON = JSON.stringify(formData);
      //spara strängen i localStorage
      localStorage.setItem("formData", formJSON);
      //Bekräfta för användaren att formuläret skickats korrekt.
      alert("Tack för ditt meddelande! Vi hör av oss så fort vi kan.");
    });

    window.addEventListener("load", function () {
      //kör bara den här koden om vi har något i localStorage
      if (localStorage.getItem("formData")) {
        //Validera fälten
        nameField.validated = true;
        phoneField.validated = true;
        emailField.validated = true;
        textArea.validated = false;
        validatedFields = numberOfFields - 1;
        fillValidationBar();
        showSendButton();
        //hämta strängen från localStorage, och parsea den till ett objekt
        const localStorageToParse = localStorage.getItem("formData");
        const savedData = JSON.parse(localStorageToParse);
        //fyll input-fälten med hjälp av objektest properties
        $("#Name").val(savedData.name);
        $("#Phone").val(savedData.phone);
        $("#e-mail").val(savedData.mail);
      }
    });
  }
});
