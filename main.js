//select the button from the html file 
const button = document.querySelector(".visual-button");

//when the mouse goes over the button, it will scale a bit 
button.addEventListener("mouseover", () => {
  button.style.transform = "scale(1.05)"; 
});

button.addEventListener("mouseleave", () => {
  button.style.transform = "scale(1)"; // scale back to normal
});

/////////////////////////////
// for the nav links
const navItems = document.querySelectorAll(".nav-item");

//for each item in the nav change color when u hover over
navItems.forEach(item => {
  item.addEventListener("mouseover", () => {
    item.style.color = "#e9839d"; // highlight on hover
  });

  item.addEventListener("mouseleave", () => {
    item.style.color = "#141414"; // reset color
  });
});