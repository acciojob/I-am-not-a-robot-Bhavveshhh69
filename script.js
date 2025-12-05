//your code here
const images = ["img1", "img2", "img3", "img4", "img5"];

// pick a random duplicate
const duplicate = images[Math.floor(Math.random() * images.length)];

let allImages = [...images, duplicate];

// shuffle
allImages = allImages.sort(() => Math.random() - 0.5);

const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");

let selected = [];

// Render images
allImages.forEach((imgClass, index) => {
  const img = document.createElement("img");
  img.classList.add(imgClass);
  img.dataset.index = index;

  img.addEventListener("click", () => {
    // Show reset as soon as one tile is clicked
    resetBtn.style.display = "inline-block";

    // prevent selecting more than 2
    if (selected.length === 2) return;

    // prevent selecting same tile twice
    if (selected.includes(index)) return;

    img.classList.add("selected");
    selected.push(index);

    // show verify when exactly 2 tiles selected
    if (selected.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  });

  container.appendChild(img);
});

// Reset button
resetBtn.addEventListener("click", () => {
  selected = [];
  para.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";

  document.querySelectorAll("img").forEach(img => {
    img.classList.remove("selected");
  });
});

// Verify button
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  const [a, b] = selected;

  if (allImages[a] === allImages[b]) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});
