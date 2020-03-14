let screens = document.querySelectorAll(".black-screen");
let slides = document.querySelectorAll(".slide");
let i = 0;

document.querySelector(".arrow-left").addEventListener("click", () => {
  slides[i].classList.remove("active-slide");
  i--;
  if (i < 0) {
    i = slides.length - 1;
  }
  slides[i].classList.add("active-slide");
});

document.querySelector(".arrow-right").addEventListener("click", () => {
  slides[i].classList.remove("active-slide");
  i++;
  if (i >= slides.length) {
    i = 0;
  }
  slides[i].classList.add("active-slide");
});

document.querySelector(".h-btn-1").addEventListener("click", () => {
  screens[0].classList.toggle("active-screen");
});

document.querySelector(".h-btn-2").addEventListener("click", () => {
  screens[1].classList.toggle("active-screen");
});

document.querySelector(".h-btn-3").addEventListener("click", () => {
  screens[2].classList.toggle("active-screen");
});

document.querySelector("nav").addEventListener("click", setActiveLink);
document
  .querySelector(".portfolio-container .tags")
  .addEventListener("click", setActiveTab);
document
  .querySelector(".portfolio-grid-container")
  .addEventListener("click", setActiveImg);
document.getElementById("quote-submit").addEventListener("click", falseSubmit);
document
  .getElementById("close_submit_result")
  .addEventListener("click", closeFalseSubmit);

function setActiveLink(e) {
  if (e.target.tagName === "A") {
    let links = document.querySelectorAll("nav ul li a");
    links.forEach(el =>
      el === e.target
        ? el.parentNode.classList.add("active")
        : el.parentNode.classList.remove("active")
    );
  }
}

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
}
