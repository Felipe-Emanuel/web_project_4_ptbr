import {
  addButton,
  cardUl,
  loading,
  skeletonLoading,
  userAboutMobile,
} from "./constants";

export const updateDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const dateFooter = document.querySelector(".year");

  dateFooter.textContent = year;
};

export const capitalizeString = (str) => {
  return str
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const clearCardUl = () => {
  cardUl.innerHTML = "";
};

export const requestInfo = (request) => {
  const { name, about } = request;
  return { name, about };
};

export const submitCallback = () => {
  console.log("invocar chamada de delete");
};

let windowWidth = window.innerWidth;

const checkWidth = () => {
  windowWidth = window.innerWidth;

  windowWidth >= 648
    ? userAboutMobile.style.display = "none"
    : userAboutMobile.style.display = "flex"
};

window.addEventListener("resize", checkWidth);
export const removeSkeletons = () => {
  skeletonLoading.style.display = "none";
  loading.style.display = "none";

  addButton.style.display = "block";
  userAboutMobile.style.display = "flex";
  checkWidth();
};

export const setSkeletons = () => {
  skeletonLoading.style.display = "block";
  userAboutMobile.style.display = "none";
};
