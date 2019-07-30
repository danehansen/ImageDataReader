# ImageDataReader ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@danehansen/image-data-reader.svg) ![npm](https://img.shields.io/npm/dt/@danehansen/image-data-reader.svg)

**Class** : public class [ImageDataReader](https://github.com/danehansen/ImageDataReader)  
**Inheritance** : [ImageDataReader](https://github.com/danehansen/ImageDataReader) > Object

The ImageDataReader class provides an interface for dealing with ImageData.

## Installation

`npm install --save @danehansen/image-data-reader`

## Usage

As a module:

    import ImageDataReader from '@danehansen/image-data-reader';

    var idr = new ImageDataReader(document.querySelector('img'));

In your browser:

    <script src='danehansen-ImageDataReader.min.js'></script>
    <script>
      var ImageDataReader = window.danehansen.ImageDataReader.default;
      var idr = new ImageDataReader(document.querySelector('img'));
    </script>

## Constants

- **WHITE_BRIGHTNESS**:uint  
  Representative of a fully white pixel (255x3).

## Methods

- **red**(x:uint, y:uint):uint  
  Returns the green value of a given pixel, between 0 and 255.
- **green**(x:uint, y:uint):uint  
  Returns the green value of a given pixel, between 0 and 255.
- **blue**(x:uint, y:uint):uint  
  Returns the blue value of a given pixel, between 0 and 255.
- **opacity**(x:uint, y:uint):uint  
  Returns the opacity value of a given pixel, between 0 and 255.
- **brightness**(imageData:ImageData, width:uint, x:uint, y:uint):uint  
  Returns the sum of the red, green, and blue values of a given pixel, between 0 and `WHITE_BRIGHTNESS`.

## Public Properties

- **data**:ImageData
  The current ImageData value of the instance.

## Public Methods

- **ImageDataReader**(source:CanvasImageSource, sourceCrop:Rectangle = {x: 0, y: 0, width: source.width, height: source.height}, destWidth:uint = source.width, destHeight:uint = source.height):ImageDataReader  
  Creates a new instance of ImageDataReader and sets its data property based on the current state of source.
- **red**(x:uint, y:uint):uint  
  Returns the green value of a given pixel, between 0 and 255.
- **green**(x:uint, y:uint):uint  
  Returns the green value of a given pixel, between 0 and 255.
- **blue**(x:uint, y:uint):uint  
  Returns the blue value of a given pixel, between 0 and 255.
- **opacity**(x:uint, y:uint):uint  
  Returns the opacity value of a given pixel, between 0 and 255.
- **brightness**(x:uint, y:uint):uint  
  Returns the sum of the red, green, and blue values of a given pixel, between 0 and `WHITE_BRIGHTNESS`.
- **update**():null  
  Updates the instance‘s ImageData in the case there was a change. Ex: each frame of a video.
- **adjustContract**(reset:boolean = false):null  
  Sets the instance to normalize the brightness/contrast of the output on red, green, and blue methods based on the current ImageData value.
