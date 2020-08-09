document.addEventListener("DOMContentLoaded", () => {
  // VARIABLES ========================
  const inputRight = document.querySelector(".right__input_active"),
    bodyRight = document.querySelector(".right__content_active"),
    bodyRightActive = document.querySelector(".right__content_hidden"),
    inputBodyHide = document.querySelector(".body__input_active"),
    inputRightMore = document.querySelectorAll(".right__input_more");
  // SHOW POPUP ========================
  inputRight.addEventListener("click", () => {
    bodyRight.classList.add("right__content_hidden");
    bodyRightActive.classList.remove("right__content_hidden");
  });

  // HIDDEN POPUP ======================
  inputBodyHide.addEventListener("click", () => {
    bodyRightActive.classList.add("right__content_hidden");
    bodyRight.classList.remove("right__content_hidden");
    for (let input of inputRightMore) {
      input.checked = false;
    }
  });
});
