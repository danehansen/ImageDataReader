import { normalize } from "@danehansen/math";

export const WHITE_BRIGHTNESS = 255 * 3;

export function red(data, width, x, y) {
  return data[(y * width + x) * 4];
}

export function green(data, width, x, y) {
  return data[(y * width + x) * 4 + 1];
}

export function blue(data, width, x, y) {
  return data[(y * width + x) * 4 + 2];
}

export function opacity(data, width, x, y) {
  return data[(y * width + x) * 4 + 3];
}

export function brightness(data, width, x, y) {
  return (
    red(data, width, x, y) + blue(data, width, x, y) + green(data, width, x, y)
  );
}

export default class ImageDataReader {
  constructor(src, srcCrop, destWidth, destHeight) {
    this._src = src;
    this._srcCrop = srcCrop || {
      x: 0,
      y: 0,
      width: src.videoWidth || src.width,
      height: src.videoHeight || src.height
    };
    this._destWidth = destWidth || this._srcCrop.width;
    this._destHeight = destHeight || this._srcCrop.height;
    this._canvas = document.createElement("canvas");
    this._context = this._canvas.getContext("2d");
    this._canvas.width = this._destWidth;
    this._canvas.height = this._destHeight;
    this.update();
  }

  update() {
    this._context.drawImage(
      this._src,
      this._srcCrop.x,
      this._srcCrop.y,
      this._srcCrop.width,
      this._srcCrop.height,
      0,
      0,
      this._destWidth,
      this._destHeight
    );

    this.data = this._context.getImageData(
      0,
      0,
      this._destWidth,
      this._destHeight
    ).data;
  }

  red(x, y) {
    return red(this.data, this._destWidth, x, y);
  }

  green(x, y) {
    return green(this.data, this._destWidth, x, y);
  }

  blue(x, y) {
    return blue(this.data, this._destWidth, x, y);
  }

  opacity(x, y) {
    return opacity(this.data, this._destWidth, x, y);
  }

  brightness(x, y) {
    let b = brightness(this.data, this._destWidth, x, y);
    // if (this._shouldAdjust) {
    //   if (b < this._avg) {
    //     b = Math.round(
    //       (normalize(this._low, this._avg, b) / 2) * WHITE_BRIGHTNESS
    //     );
    //   } else {
    //     b = Math.round(
    //       (normalize(this._avg, this._high, b) / 2) * WHITE_BRIGHTNESS +
    //         Math.floor(WHITE_BRIGHTNESS / 2)
    //     );
    //   }
    // }
    if (this._shouldAdjust) {
      b = Math.round(normalize(this._low, this._high, b) * WHITE_BRIGHTNESS);
    }
    return b;
  }

  adjustContrast(reset) {
    if (reset) {
      this._shouldAdjust = false;
    } else {
      this._low = WHITE_BRIGHTNESS;
      this._high = 0;
      // this._avg = 0;
      for (let i = 0, length = this.data.length; i < length; i += 4) {
        const b = this.data[i] + this.data[i + 1] + this.data[i + 2];
        // this._avg += b;
        this._high = Math.max(this._high, b);
        this._low = Math.min(this._low, b);
      }
      // this._avg = Math.round(this._avg / (this._destWidth * this._destHeight));
      this._shouldAdjust = this._low !== 0 || this._high !== WHITE_BRIGHTNESS; /// ||
      // this._avg !== Math.floor(WHITE_BRIGHTNESS / 2);
      this._shouldAdjust = true;
    }
  }
}
