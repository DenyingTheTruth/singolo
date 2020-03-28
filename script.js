"use strict";

//* HEADER *
const menu = document.getElementById("menu_toggle");

menu.addEventListener("change", () => {
  if (menu.checked) {
    document.querySelector("body").classList.add("prevent-scroll");
  } else {
    document.querySelector("body").classList.remove("prevent-scroll");
  }
});
document.querySelector("header nav").addEventListener("click", () => {
  document.getElementById("menu_toggle").checked = false;
  document.querySelector("body").classList.remove("prevent-scroll");
});
document.querySelector("header nav ul").addEventListener("click", e => {
  if (e.target.tagName === "A") {
    document.getElementById("menu_toggle").checked = false;
    document.querySelector("body").classList.remove("prevent-scroll");
  } else {
    e.stopPropagation();
  }
});

document.addEventListener("scroll", () => {
  let curPos = window.scrollY;
  const anchors = document.querySelectorAll(".section");
  const menu = document.querySelectorAll("nav a");
  anchors.forEach(el => {
    if (
      el.offsetTop - 80 <= curPos &&
      el.offsetTop + el.offsetHeight - 50 > curPos
    ) {
      menu.forEach(link => {
        link.classList.remove("active");
        if (el.getAttribute("id") === link.getAttribute("href").substring(1)) {
          link.classList.add("active");
        }
      });
    }
  });
  if (
    document.documentElement.scrollTop +
      document.documentElement.clientHeight ===
    document.documentElement.scrollHeight
  ) {
    document.querySelector("nav a.active").classList.remove("active");
    menu[menu.length - 1].classList.add("active");
  }
  if (document.querySelector("nav a.active") === null) {
    menu[0].classList.add("active");
  }
});

//* SLIDER *
const beforeInitSliderWrapper = `<div class="slide">
<img src="./assets/images/slider/slider-1.png" alt="Slider 1" />
<div class="black-screen b-screen-1"></div>
<div class="home-btn h-btn-1"></div>
<div class="black-screen b-screen-2"></div>
<div class="home-btn h-btn-2"></div>
</div>
<div class="slide">
<img src="./assets/images/slider/slider-2.png" alt="Slider 2" />
<div class="black-screen b-screen-3"></div>
<div class="home-btn h-btn-3"></div>
</div>`;
let posInitial,
  index = 0,
  allowShift = true,
  sliderItems = document.querySelector(".slides"),
  slides = sliderItems.querySelectorAll(".slide"),
  slidesLength = slides.length;

function initSlider() {
  sliderItems = document.querySelector(".slides");
  slides = sliderItems.querySelectorAll(".slide");
  slidesLength = slides.length;

  let firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true);

  cloneFirst.querySelectorAll("div").forEach(el => el.remove());
  cloneLast.querySelectorAll("div").forEach(el => el.remove());
  sliderItems.appendChild(cloneFirst);
  sliderItems.insertBefore(cloneLast, firstSlide);
}

function initBlackScreen() {
  // black screens
  let screens = document.querySelectorAll(".black-screen");

  document.querySelector(".h-btn-1").addEventListener("click", () => {
    screens[0].classList.toggle("active-screen");
  });
  document.querySelector(".h-btn-2").addEventListener("click", () => {
    screens[1].classList.toggle("active-screen");
  });
  document.querySelector(".h-btn-3").addEventListener("click", () => {
    screens[2].classList.toggle("active-screen");
  });
}

function checkIndex() {
  let slideSize = sliderItems.querySelector(".slide").offsetWidth;
  sliderItems.classList.remove("shifting");

  if (index == -1) {
    sliderItems.style.left = -(slidesLength * slideSize) + "px";
    index = slidesLength - 1;
  }

  if (index == slidesLength) {
    sliderItems.style.left = -(1 * slideSize) + "px";
    index = 0;
  }

  allowShift = true;
}

function shiftSlide(dir, action) {
  let slideSize = sliderItems.querySelector(".slide").offsetWidth;
  sliderItems.classList.add("shifting");

  if (allowShift) {
    if (!action) {
      posInitial = sliderItems.offsetLeft;
    }

    if (dir == 1) {
      sliderItems.style.left = posInitial - slideSize + "px";
      index++;
    } else if (dir == -1) {
      sliderItems.style.left = posInitial + slideSize + "px";
      index--;
    }
  }

  allowShift = false;
}

document.querySelector(".slides").addEventListener("transitionend", checkIndex);

document.querySelector(".arrow-left").addEventListener("click", () => {
  shiftSlide(-1);
});
document.querySelector(".arrow-right").addEventListener("click", () => {
  shiftSlide(1);
});

// first slider init
initSlider();
initBlackScreen();

// re-init slider to change orientation or viewport size
window.addEventListener("resize", () => {
  document.querySelector(
    ".slides-wrapper .slides"
  ).innerHTML = beforeInitSliderWrapper;
  initSlider();
  document.querySelector(".slides-wrapper .slides").style.left = "-100%";
  index = 0;
  initBlackScreen();
});

//* PORTFOLIO *
document
  .querySelector(".portfolio-container .tags")
  .addEventListener("click", setActiveTab);
document
  .querySelector(".portfolio-grid-container")
  .addEventListener("click", setActiveImg);

function setActiveTab(e) {
  let links = document.querySelectorAll(".tags .tag-element"),
    imgCollection = document.querySelector(".portfolio-grid-container");
  links.forEach(el =>
    el === e.target
      ? el.classList.add("active-tag")
      : el.classList.remove("active-tag")
  );
  for (let i = imgCollection.children.length; i >= 0; i--) {
    imgCollection.appendChild(imgCollection.children[(Math.random() * i) | 0]);
  }
}

function setActiveImg(e) {
  if (e.target.tagName === "IMG") {
    if (e.target.classList.contains("active-img")) {
      e.target.classList.remove("active-img");
    } else {
      let links = document.querySelectorAll(".portfolio-container img");
      links.forEach(el =>
        el === e.target
          ? el.classList.add("active-img")
          : el.classList.remove("active-img")
      );
    }
  }
}

//* FORM *
document.getElementById("quote-submit").addEventListener("click", falseSubmit);
document
  .getElementById("close_submit_result")
  .addEventListener("click", closeFalseSubmit);

function falseSubmit(e) {
  e.preventDefault();
  let name = document.getElementById("first_name_field"),
    email = document.getElementById("email_field");
  if (name.reportValidity() && email.reportValidity()) {
    let subject = document.getElementById("subject_field").value,
      description = document.getElementById("description_field").value;

    document.querySelector(".submit-result-subject").textContent = subject
      ? "Тема: " + subject
      : "Без темы";
    document.querySelector(
      ".submit-result-description"
    ).textContent = description ? "Описание: " + description : "Без описания";

    document.querySelector(".false_submit_result").classList.add("--show");
  }
}

function closeFalseSubmit() {
  document.querySelector(".false_submit_result").classList.remove("--show");
  document.querySelector(".form-container form").reset();
}
