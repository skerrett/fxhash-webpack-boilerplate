import p5 from "p5";

// these are the variables you can use as inputs to your algorithms
console.log(fxhash)   // the 64 chars hex number fed to your algorithm
console.log(fxrand()) // deterministic PRNG function, use it instead of Math.random()
const seed = ~~(fxrand() * 123456789);
let s;

const numOfRows = ~~(fxrand() * 90) + 10;
const radiusvar = ~~(fxrand() * 220) + 100;
const minLength = ~~(fxrand() * 70) + 10;
const maxLength = ~~(fxrand() * 120) + 30;
const spaces = ~~(fxrand() * 50) + 10;

let colorD = function (num) {
  if (num > 90) {
    return 2
  } else if (num > 80) {
    return 3
  } else if (num > 80) {
    return 4
  } else if (num > 70) {
    return 5
  } else if (num > 60) {
    return 6
  } else if (num > 50) {
    return 7
  }else if (num > 40) {
    return 8
  }else if (num > 30) {
    return 9
  }else if (num > 20) {
    return 10
  } else {
    return 11
  }
}
const colorPallet = colorD(fxrand() * 100)


console.log(numOfRows)

window.$fxhashFeatures = {
  "Rows": numOfRows,
  "Circle_radius" : radiusvar,
  "Smallest_line" : minLength,
  "Largest_Line" : maxLength,
  "Spaces" : spaces,
  "Color_pallet": colorPallet
}

let sketch = function (p5) {
  let rows = numOfRows;
  let radius = radiusvar;
  let min_length = minLength;
  let max_length = maxLength;
  let space = spaces;
  let stripes = [];
  let colors;

  p5.setup = function () {
    p5.createCanvas(700, 700);
    p5.stroke(255);
    p5.strokeWeight(14);
    //p5.noLoop();
    if (colorPallet === 2) {
      colors = [
        p5.color('#DDD8B8'),
        p5.color('#B3CBB9'),
        p5.color('#84A9C0'),
        p5.color('#6A66A3'),
        p5.color('#542E71')
      ];
    } else if (colorPallet === 3) {
      colors = [
        p5.color('#D8DBE2'),
        p5.color('#A9BCD0'),
        p5.color('#58A4B0'),
        p5.color('#373F51'),
        p5.color('#1B1B1E')
      ];
    } else if (colorPallet === 4) {
      colors = [
        p5.color('#DABFFF'),
        p5.color('#907AD6'),
        p5.color('#4F518C'),
        p5.color('#2C2A4A'),
        p5.color('#7FDEFF')
      ];
    } else if (colorPallet === 5) {
      colors = [
        p5.color('#DF9A57'),
        p5.color('#FC7A57'),
        p5.color('#FCD757'),
        p5.color('#EEFC57'),
        p5.color('#5E5B52')
      ];
    } else if (colorPallet === 6) {
      colors = [
        p5.color('#B1740F'),
        p5.color('#FFD07B'),
        p5.color('#FDB833'),
        p5.color('#296EB4'),
        p5.color('#1789FC')
      ];
    }else if (colorPallet === 7) {
      colors = [
        p5.color('#0D1B1E'),
        p5.color('#7798AB'),
        p5.color('#C3DBC5'),
        p5.color('#E8DCB9'),
        p5.color('#F2CEE6')
      ];
    }else if (colorPallet === 8) {
      colors = [
        p5.color('#033F63'),
        p5.color('#28666E'),
        p5.color('#7C9885'),
        p5.color('#B5B682'),
        p5.color('#FEDC97')
      ];
    }else if (colorPallet === 9) {
      colors = [
        p5.color('#B37BA4'),
        p5.color('#D99AC5'),
        p5.color('#DCCDE8'),
        p5.color('#14BDEB'),
        p5.color('#00100B')
      ];
    }else if (colorPallet === 10) {
      colors = [
        p5.color('#BAF2BB'),
        p5.color('#BAF2D8'),
        p5.color('#BAD7F2'),
        p5.color('#F2BAC9'),
        p5.color('#F2E2BA')
      ];
    } else if (colorPallet === 11) {
      colors = [
        p5.color(142, 192, 124),
        p5.color(250, 189, 47),
        p5.color(251, 71, 44),
        p5.color(211, 134, 147),
        p5.color(49, 69, 80)
      ];
    }

    for (var i = 0; i < rows; i++) {
      let ypos = ((i + .5) / rows) * (radius * 2) - radius;
      let row_length = get_row_length(ypos);
      add_stripe_row(ypos, row_length);
    }
  }

  p5.draw = function () {
    p5.clear();
    p5.translate(p5.width / 2, p5.height / 2);
    for (var row in stripes) {
      for (var s in stripes[row]) {
        var stripe = stripes[row][s];
        let length = get_row_length(stripe.y);
        if (!is_outside_circle(stripe, length)) {
          p5.stroke(stripe.color);
          p5.line(p5.max((stripe.start + space), -length), stripe.y, p5.min((stripe.end - space), length), stripe.y);
        } else if (stripe.start > length) {
          stripes[row].splice(s, 1);
          let s_length = p5.random(min_length, max_length);
          let end = stripes[row][0].start;
          let start = end - s_length;
          stripes[row].unshift({ y: stripe.y, start: start, end: end, color: colors[p5.floor(p5.random(5))] });
        }
        let startx = p5.constrain(stripe.start, -length, length);
        let endx = p5.constrain(stripe.end, -length, length);
        let startspeed = p5.sqrt(2) - p5.sqrt(stripe.y * stripe.y + startx * startx) / radius;
        let endspeed = p5.sqrt(2) - p5.sqrt(stripe.y * stripe.y + endx * endx) / radius;
        stripe.start += startspeed;
        stripe.end += endspeed;

      }
    }

    p5.windowResized = function () {
      s = p5.min(p5.windowWidth, p5.windowHeight);
      p5.resizeCanvas(s, s);
    }
  }

  function get_row_length(ypos) {
    if ((radius * radius) < (ypos * ypos)) return 0;
    return p5.sqrt((radius * radius) - (ypos * ypos));
  }

  function is_outside_circle(stripe, length) {
    return stripe.end - space < -length || stripe.start + space > length;
  }

  function add_stripe_row(ypos, row_length) {
    let row = [];
    let length = p5.random(min_length, max_length);
    let start = -1000 + p5.random(min_length, max_length);
    let end = start + length;
    while (end < -row_length) {
      row.push({ y: ypos, start: start, end: end, color: colors[p5.floor(p5.random(5))] });
      length = p5.random(min_length, max_length);
      start = end;
      end = start + length;
    }
    stripes.push(row);
  }

}

let myp5 = new p5(sketch, window.document.body);