jquery-awesome-resizer
======================

With this plugin you can resize an image in different ways.
******
What you can do:
- resize an image using the size that you want.
- resize an image using the size of its parent container.
- fit an image with the parent size.
- resize an image smoothly on window resize event.

******

Parameters
==========

```javascript
  var settings = {
      'width'       : null,
      'height'      : null,
      'fit'         : false, 
      'fluid'       : false
  };
```

******

How it works
============

-resize an image using the size of the width and height that you want: 

```javascript
  $('img').awesomeResizer({
    'width'  : 500,
    'height' : 300
  });
```

-fit an image with parent container size of image: 
```javascript
  $('img').awesomeResizer({
    'fit' : true
  });
```

-resize an image smoothly when window resize event called: 
```javascript
  $('img').awesomeResizer({
    'fit'   : true,
    'fluid'     : true
  });
```

*****

this plugin has also a lazy loading system. To activate it use the `data-src` attribute instead of `src` attribute like this: 

`<img data-src="images/test.jpg" alt="" />`