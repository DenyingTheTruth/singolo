"use strict";

//* HEADER *
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
let sliderItems = document.querySelector(".slides"),
  prev = document.querySelector(".arrow-left"),
  next = document.querySelector(".arrow-right");

function slide(items, prev, next) {
  let posInitial,
    slides = items.querySelectorAll(".slide"),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName("slide")[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true;

  cloneFirst.querySelectorAll("div").forEach(el => el.remove());
  cloneLast.querySelectorAll("div").forEach(el => el.remove());
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);

  prev.addEventListener("click", function() {
    shiftSlide(-1);
  });
  next.addEventListener("click", function() {
    shiftSlide(1);
  });

  items.addEventListener("transitionend", checkIndex);

  function shiftSlide(dir, action) {
    items.classList.add("shifting");

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

      if (dir == 1) {
        items.style.left = posInitial - slideSize + "px";
        index++;
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + "px";
        index--;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove("shifting");

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
}

slide(sliderItems, prev, next);

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

//* PORTFOLIO *
document
  .querySelector(".portfolio-container .tags")
  .addEventListener("click", setActiveTab);
document
  .querySelector(".portfolio-grid-container")
  .addEventListener("click", setActiveImg);

function setActiveTab(e) {
  let links = document.querySelectorAll(".tags .tag-element"),
    imgCollection = document.querySelectorAll(".portfolio-grid-element");
  links.forEach(el =>
    el === e.target
      ? el.classList.add("active-tag")
      : el.classList.remove("active-tag")
  );
  imgCollection.forEach((el, i, arr) => {
    el.style.order = (Math.random() * (arr.length - i)) | 0;
  });
}

function setActiveImg(e) {
  if (e.target.tagName === "IMG") {
    let links = document.querySelectorAll(".portfolio-container img");
    links.forEach(el =>
      el === e.target
        ? el.classList.add("active-img")
        : el.classList.remove("active-img")
    );
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
