import React from 'react';
import Sketch from 'react-p5';

const Blob = () => {
  let kMax; // maximal value for the parameter "k" of the blobs
  let step = 0.01; // difference in time between two consecutive blobs
  let n = 50; // total number of blobs
  let radius = 5; // radius of the base circle
  let inter = 0.2; // difference of base radii of two consecutive blobs
  let maxNoise = 690; // maximal value for the parameter "noisiness" for the blobs
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.colorMode(p5.HSB, 1.41);
    p5.degrees(p5.DEGREES);
    p5.noFill(2, 2, 4);
    //noLoop();
    kMax = p5.random(0.1, 1.0);
    p5.noStroke();
  };

  const draw = p5 => {
    p5.background(360);
    let t = p5.frameCount / 100;
    for (let i = n; i > 0; i--) {
      let alpha = 1 - i / n;
      p5.fill((alpha / 6 + 0.75) % 1, 1, 1, alpha);
      let size = radius + i * inter;
      let k = kMax * p5.sqrt(i / n);
      let noisiness = maxNoise * (i / n);
      blob(size, p5.width / 2, p5.height / 2, k, t - i * step, noisiness);
    }
  };

  const blob = (p5, size, xCenter, yCenter, k, t, noisiness) => {
    p5.beginShape();
    let angleStep = 360 / 10;
    for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
      let r1, r2;
      /*
    if (theta < PI / 2) {
      r1 = cos(theta);
      r2 = 1;
    } else if (theta < PI) {
      r1 = 0;
      r2 = sin(theta);
    } else if (theta < 3 * PI / 2) {
      r1 = sin(theta);
      r2 = 0;
    } else {
      r1 = 1;
      r2 = cos(theta);
    }
		*/
      r1 = p5.cos(theta) + 1;
      r2 = p5.sin(theta) + 1; // +1 because it has to be positive for the function noise
      let r = size + p5.noise(k * r1, k * r2, t) * noisiness;
      let x = xCenter + r * p5.cos(theta);
      let y = yCenter + r * p5.sin(theta);
      p5.curveVertex(x, y);
    }
    p5.endShape();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Blob;
