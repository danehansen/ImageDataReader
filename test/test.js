import ImageDataReader, { WHITE_BRIGHTNESS } from "../src/ImageDataReader";
import min from "!raw-loader!../danehansen-ImageDataReader.min.js";
import checkered2x2 from "./checkered_2x2.png";
import checkeredGray2x2 from "./checkered_gray_2x2.png";
import rainbowTransparent6x2 from "./rainbow_transparent_6x2.png";
import { expect } from "chai";

describe("ImageDataReader", function() {
  describe("danehansen-ImageDataReader.min.js", function() {
    it("is minified", function() {
      expect(min.match(/\n/g)).to.be.null;
    });
  });

  describe("new ImageDataReader", function() {
    it("creates expected data from an image", function(done) {
      const image = new Image();
      image.src = checkered2x2;
      image.decode().then(function() {
        let { data } = new ImageDataReader(image);
        data = Array.from(data);
        expect(data).to.deep.equal([
          0,
          0,
          0,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          0,
          0,
          0,
          255
        ]);
        done();
      });
    });

    it("reads pixel values from the image data correctly", function(done) {
      const image = new Image();
      image.src = rainbowTransparent6x2;
      image.decode().then(function() {
        const imageDataReader = new ImageDataReader(image);
        expect(imageDataReader.red(0, 0)).to.equal(255);
        expect(imageDataReader.green(0, 0)).to.equal(0);
        expect(imageDataReader.blue(0, 0)).to.equal(0);
        expect(imageDataReader.opacity(0, 0)).to.equal(128);
        expect(imageDataReader.brightness(0, 0)).to.equal(255);

        expect(imageDataReader.red(5, 0)).to.equal(255);
        expect(imageDataReader.green(5, 0)).to.equal(0);
        expect(imageDataReader.blue(5, 0)).to.equal(255);
        expect(imageDataReader.opacity(5, 0)).to.equal(128);
        expect(imageDataReader.brightness(5, 0)).to.equal(255 * 2);

        expect(imageDataReader.red(0, 1)).to.equal(255);
        expect(imageDataReader.green(0, 1)).to.equal(255);
        expect(imageDataReader.blue(0, 1)).to.equal(255);
        expect(imageDataReader.opacity(0, 1)).to.equal(128);
        expect(imageDataReader.brightness(0, 1)).to.equal(255 * 3);

        expect(imageDataReader.red(1, 1)).to.equal(0);
        expect(imageDataReader.green(1, 1)).to.equal(0);
        expect(imageDataReader.blue(1, 1)).to.equal(0);
        expect(imageDataReader.opacity(1, 1)).to.equal(128);
        expect(imageDataReader.brightness(1, 1)).to.equal(0);

        done();
      });
    });

    it("adjusts contrast from image data correctly, as well as resets", function(done) {
      const image = new Image();

      image.src = checkeredGray2x2;
      image.decode().then(function() {
        const imageDataReader = new ImageDataReader(image);

        imageDataReader.adjustContrast();
        expect(imageDataReader.brightness(0, 0)).to.equal(0);
        expect(imageDataReader.brightness(0, 1)).to.equal(255 * 3);

        imageDataReader.adjustContrast(true);
        expect(imageDataReader.brightness(0, 0)).to.equal(357);
        expect(imageDataReader.brightness(0, 1)).to.equal(408);

        done();
      });
    });
  });
});
