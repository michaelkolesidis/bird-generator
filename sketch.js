// Copyright (c) 2022 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

let widthBody, lengthBody, heightBody;
let legHeight;
let beakLength;
let feetSize;
let eyeBrows;
let colorPicker;
let colorPickerBeakLegs;
let buttonSave;
let directionalLightX = 0;
let directionalLightY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  // Controls
  initializeControls();

  // Save Button
  initializeSaveButton();

  // Camera
  // (some extra camera positions - may be used in the future)
  // camera(150, 1, 0); // left side view
  // camera(-150, 1, 0); // right side view
  // camera(1,150,0); // bottom view
  // camera(1,-150,0); // top view
  camera(130, -40, 115, 0, 0, 0);
}

function initializeControls() {
  // Color picker for body, head, and tail
  colorPicker = createColorPicker("#ffde11");
  colorPicker.position(35, windowHeight - 300);
  colorPicker.style("height", "40px");
  colorPicker.style("width", "40px");
  colorPicker.style("padding", "0 2px");
  colorPicker.style("background-color", "#f5f5f5");
  colorPicker.style("cursor", "pointer");

  // Color picker for beak, legs, and feet
  colorPickerBeakLegs = createColorPicker("#e36e20");
  colorPickerBeakLegs.position(115, windowHeight - 300);
  console.log(window.innerWidth);
  window.innerWidth < 380
    ? colorPickerBeakLegs.position(35, windowHeight - 370)
    : colorPickerBeakLegs.position(115, windowHeight - 300);
  colorPickerBeakLegs.style("height", "40px");
  colorPickerBeakLegs.style("width", "40px");
  colorPickerBeakLegs.style("padding", "0 2px");
  colorPickerBeakLegs.style("background-color", "#f5f5f5");
  colorPickerBeakLegs.style("cursor", "pointer");

  // Slider for beak length
  beakLength = createSlider(9, 25, 1);
  beakLength.position(35, windowHeight - 220);
  beakLength.style("width", "120px");
  beakLength.addClass("slider");

  // Slider for body length
  lengthBody = createSlider(10, 80, 0);
  lengthBody.position(35, windowHeight - 190);
  lengthBody.style("width", "120px");
  lengthBody.addClass("slider");

  // Slider for body width
  widthBody = createSlider(20, 80, 0);
  widthBody.position(35, windowHeight - 160);
  widthBody.style("width", "120px");
  widthBody.addClass("slider");

  // Slider for body height
  heightBody = createSlider(10, 60, 0);
  heightBody.position(35, windowHeight - 130);
  heightBody.style("width", "120px");
  heightBody.addClass("slider");

  // Slider for leg height
  legHeight = createSlider(10, 29, 0, 0.5);
  legHeight.position(35, windowHeight - 100);
  legHeight.style("width", "120px");
  legHeight.addClass("slider");

  // Slider for feet size
  feetSize = createSlider(0, 4, 0, 0.1);
  feetSize.position(35, windowHeight - 70);
  feetSize.style("width", "120px");
  feetSize.addClass("slider");

  // Slider for eyebrows angle
  eyeBrows = createSlider(-10, 30, -10, 1);
  eyeBrows.position(35, windowHeight - 40);
  eyeBrows.style("width", "120px");
  eyeBrows.addClass("slider");
}

function initializeSaveButton() {
  buttonSave = createButton("SAVE");
  buttonSave.position(windowWidth - 140, windowHeight - 150);
  buttonSave.style("width", "100px");
  buttonSave.style("height", "40px");
  buttonSave.style("padding", "3px 6px");
  buttonSave.style("border", "1px solid black");
  buttonSave.style("background-color", "#f5f5f5");
  buttonSave.style("font-family", "Manrope");
  buttonSave.style("cursor", "pointer");
  buttonSave.mouseOver(hoverIn);
  buttonSave.mouseOut(hoverOut);
  buttonSave.mousePressed(screenShot);
}

function draw() {
  background("#f0f0f0");
  addLights();
  orbitControl(2, 2.5, 0.01, { disableTouchActions: true });
  drawBird();
}

function addLights() {
  ambientLight("#ffffff");
  // let directionalLightX = (mouseX / width - 0.5) * 2;
  // let directionalLightY = (mouseY / height - 0.5) * 2;
  directionalLight(50, 50, 50, -directionalLightX, -directionalLightY, -1);
}

function drawBird() {
  // Body
  noStroke();
  strokeWeight(0.3);
  ambientMaterial(colorPicker.color());
  box(widthBody.value(), heightBody.value(), lengthBody.value());

  // Legs
  push();
  translate(widthBody.value() / 2 - 2, heightBody.value() / 2 + 5.1, 0);
  stroke(colorPickerBeakLegs.color());
  cylinder(0.5, legHeight.value());
  pop();
  push();
  translate(-widthBody.value() / 2 + 2, heightBody.value() / 2 + 5.1, 0);
  stroke(colorPickerBeakLegs.color());
  cylinder(0.5, legHeight.value());
  pop();

  // Feet
  push();
  translate(0, heightBody.value() / 2 + legHeight.value() / 2, 0); // controls both feet's height
  push();
  translate(-widthBody.value() / 2 + 10, 0, 0);
  ambientMaterial(colorPickerBeakLegs.color());
  beginShape(); // right foot
  vertex(-8, 5.1, -0.5); // ankle -> left toe
  vertex(-4 + feetSize.value(), 5.1, 10 + feetSize.value() * 1.75); // left toe -> right toe
  vertex(-12 - feetSize.value(), 5.1, 10 + feetSize.value() * 1.75); // right toe -> ankle
  endShape(CLOSE);
  pop();
  push();
  beginShape(); // left foot
  translate(widthBody.value() / 2 - 10, 0, 0);
  ambientMaterial(colorPickerBeakLegs.color());
  vertex(8, 5.1, -0.5); // ankle -> left toe
  vertex(12 + feetSize.value(), 5.1, 10 + feetSize.value() * 1.75); // left toe -> right toe
  vertex(4 - feetSize.value(), 5.1, 10 + feetSize.value() * 1.75); // right toe-> ankle
  endShape(CLOSE);
  pop();
  pop();

  // Eyes:
  push();
  translate(8, -heightBody.value() / 2 - 14, lengthBody.value() / 2);
  ambientMaterial(255);
  noStroke();
  ellipsoid(4, 4, 4, 2);
  translate(0.01, 0, 0);
  ambientMaterial(0);
  ellipsoid(3, 3, 3, 2);
  pop();
  push();
  translate(-8, -heightBody.value() / 2 - 14, lengthBody.value() / 2);
  ambientMaterial(255);
  noStroke();
  ellipsoid(4, 4, 4, 2);
  translate(-0.01, 0, 0);
  ambientMaterial(0);
  ellipsoid(3, 3, 3, 2);
  pop();

  // Head:
  ambientMaterial(20, 20, 20);
  push();
  translate(0, -heightBody.value() / 2 - 13, lengthBody.value() / 2);
  rotateX(-8);
  noStroke();
  ambientMaterial(colorPicker.color());
  sphere(8, 10, 4);
  pop();

  // Eyebrows:
  push();
  translate(8, -heightBody.value() / 2 - 18, lengthBody.value() / 2);
  rotateX(-eyeBrows.value() + 90);
  cylinder(0.5, 6, 7, 2);
  pop();
  push();
  translate(-8, -heightBody.value() / 2 - 18, lengthBody.value() / 2);
  rotateX(-eyeBrows.value() + 90);
  cylinder(0.5, 6, 7, 2);
  pop();

  // Beak:
  push();
  translate(0, -heightBody.value() / 2 - 11, lengthBody.value() / 2 + 8);
  rotateX(80);
  noStroke();
  ambientMaterial(colorPickerBeakLegs.color());
  cone(5.7, beakLength.value(), 8, 0, 0);
  pop();

  // Tail:
  push();
  ambientMaterial(colorPicker.color());
  translate(0, heightBody.value() / 2 + 0, -lengthBody.value() / 2 - 3);
  rotateX(20);
  box(widthBody.value() - 2, 1, 8);
  pop();
}

// Utility Functions
// Update directional light based on the mouse click position
function mousePressed() {
  directionalLightX = (mouseX / width - 0.5) * 2;
  directionalLightY = (mouseY / height - 0.5) * 2;
}

// Window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  camera(130, -40, 115, 0, 0, 0);
  colorPicker.position(35, windowHeight - 300);
  beakLength.position(35, windowHeight - 220);
  lengthBody.position(35, windowHeight - 190);
  widthBody.position(35, windowHeight - 160);
  heightBody.position(35, windowHeight - 130);
  legHeight.position(35, windowHeight - 100);
  feetSize.position(35, windowHeight - 70);
  eyeBrows.position(35, windowHeight - 40);
  buttonSave.position(windowWidth - 140, windowHeight - 150);
  window.innerWidth < 380
    ? colorPickerBeakLegs.position(35, windowHeight - 370)
    : colorPickerBeakLegs.position(115, windowHeight - 300);
}

// Save button color on hover
function hoverIn() {
  buttonSave.style("background-color", "#000000");
  buttonSave.style("color", "#f5f5f5");
}
function hoverOut() {
  buttonSave.style("background-color", "#f5f5f5");
  buttonSave.style("color", "#000000");
}

// Screenshot
function screenShot() {
  save("my_bird.png");
}

// 🐦🦜🦃🐓🐤🐧🕊️🦅🦆🦢🦉🦤🦩🦚
