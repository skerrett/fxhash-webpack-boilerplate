import p5 from "p5";

// these are the variables you can use as inputs to your algorithms
console.log(fxhash)   // the 64 chars hex number fed to your algorithm
console.log(fxrand()) // deterministic PRNG function, use it instead of Math.random()
const seed = ~~(fxrand() * 123456789);
let s;

const numCircles = ~~(fxrand() * 500) + 100;

window.$fxhashFeatures = {
  "Density": numCircles > 500 ? "High" : (numCircles < 200 ? "Low" : "Medium")
}

// note about the fxrand() function
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
// window.$fxhashFeatures = {
//   "Background": "Black",
//   "Number of lines": 10,
//   "Inverted": true
// }

// this code writes the values to the DOM as an example

let sketch = function (p5) {

  p5.setup = function () {
    // p5.noLoop();
    s = p5.min(p5.windowWidth, p5.windowHeight);
    p5.createCanvas(s, s, p5.WEBGL);
  };

  p5.draw = function () {
    p5.randomSeed(seed);
    p5.background(0);
    // p5.rotateY(p5.frameCount * 10 / 10000);
    // p5.push();
    // for (var i = numCircles; i >= 0; i--) {
    //   let c = p5.color(p5.random(["#50B", "#313", "#713"]));
    //   c.setAlpha(13);
    //   p5.fill(c);
    //   p5.noStroke();
    //   p5.circle(p5.random()*p5.width, p5.random()*p5.height, p5.abs(p5.randomGaussian(0, p5.height/20)));
    // }
    // p5.pop();

    for (let j = 0; j < 5; j++) {
      p5.push();
      for (let i = 0; i < 80; i++) {
        p5.translate(
          p5.sin(p5.frameCount * 0.1 + j) * 0.001,
          p5.sin(p5.frameCount * 0.1 + j) * 0.001,
          i * 0.1
        );
        p5.rotateZ(p5.frameCount / 400 * 0.1);
        p5.push();
        let c = p5.color(p5.random(["#eacb15", "#8c7a0d", "#f2e073"]));
        // c.setAlpha(13);
        p5.fill(c);
        p5.noStroke();
        p5.circle(p5.random() * p5.width, p5.random() * p5.height, p5.abs(p5.randomGaussian(0, p5.height / 20)));
        p5.pop();

        // p5.rotateZ(p5.frameCount /400 * 0.1);
        p5.push();
        // let k = p5.color(p5.random(["#0e2f58", "#a7c8f1", "#297add"]));
        // c.setAlpha(13);
        p5.fill("#297add");
        // p5.noStroke();
        p5.rotateX(p5.frameCount * 0.01);
        p5.rotate(p5.frameCount * 0.03);
        p5.sphere(30);
        p5.pop();
      }
      p5.pop();
    }
  };

  p5.windowResized = function () {
    s = p5.min(p5.windowWidth, p5.windowHeight);
    p5.resizeCanvas(s, s);
  }
}

let myp5 = new p5(sketch, window.document.body);