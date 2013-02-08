jquery-awesome-resizer
======================

With this plugin you can resize an image in different ways.
******
What you can do:
- resize an image using the size of the width and height that you want.
- resize an image using the size of its parent container.
- stretch an image (fullscreen or parent size).
- resize an image smoothly when window resize event called.

******

Parameters
==========

width     : float
height    : float
container : DOM Object
stretch   : boolean
fluid     : boolean

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

- resize an image using the size of its parent container: 
```javascript
  $('img').awesomeResizer({
    'container' : $('#container')
  });
```

- stretch an image (fullscreen): 
```javascript
  $('img').awesomeResizer({
    'container' : $(window),
    'stretch'   : true
  });
```

- resize an image smoothly when window resize event called: 
```javascript
  $('img').awesomeResizer({
    'stretch'   : true,
    'fluid'     : true
  });
```

*****

this plugin has also a lazy loading system. To activate it use the `data-src` attribute instead of `src` attribute like this: 

`<img data-src="images/test.jpg" alt="" />`