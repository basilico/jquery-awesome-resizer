/*
 * 'jQuery Awesome Resizer' Plugin for jQuery
 *
 * @author Valerio Capogna
 * @link http://https://github.com/Basilico/jquery-awesome-resizer
 * @created 04-12-2012
 * @updated undefined
 * @version 0.1
 *
 * Description:
 * jQuery Awesome resizer is a multifunctional image resizer. 
 * 
*/

(function($){

  var settings = {
      'width'       : null,
      'height'      : null,
      'container'   : null,
      'stretch'     : false, 
      'fluid'       : false
  };

  var $image;

  var methods = {
    init : function(options) { 
      $image = this;
      settings = $.extend(settings, options);

      methods.loadImage(function(){

        $image.attr('original-width', $image.width());
        $image.attr('original-height', $image.height());

        if (settings['stretch'] && settings['container'] === null){ settings['container'] = $image.parent(); }

        if (settings['container'] !== null){          
          settings['width'] = settings['container'].width();
          settings['height'] = settings['container'].height();
        }else{
          if (settings['width'] === null){ settings['width'] = $image.width(); }
          if (settings['height'] === null){ settings['height'] = $image.height(); }
        }

        settings['stretch'] 
          ? methods.stretchImage() 
          : methods.resizeImage();

        if (settings['fluid']){
          $(window).on('resize', function(){
            if (settings['container'] !== null){          
              settings['width'] = settings['container'].width();
              settings['height'] = settings['container'].height();
            }

            settings['stretch']
              ? methods.stretchImage() 
              : methods.resizeImage();
          });
        }
      });
    },

    loadImage : function(callback){
      if (undefined !== $image.attr('data-src')){
        $image.parent().addClass('awesome-resizer-loader');
        $image.css('opacity', 0)
        $image.load(function(){
            callback();
            $image.animate({ opacity : 1 }, 'fast', 'easeInOutCubic', function(){
              $image.parent().removeClass('awesome-resizer-loader');
            });
          }).attr('src', $image.attr('data-src'));
      }else{
        $image[0].complete ? callback() : $image.load(callback).attr('src', $image.attr('src'));
      }
    },

    resizeImage: function(){
      var originalWidth = parseInt($image.attr('original-width'));
      var originalHeight = parseInt($image.attr('original-height'));
      var newWidth = originalWidth; 
      var newHeight = originalHeight;
      var ratio = 0;

      if (originalWidth > settings['width']){
        ratio = settings['width'] / originalWidth;
        newWidth = settings['width'];
        newHeight = originalHeight * ratio;
      }

      if (originalHeight > settings['height']){
        ratio = settings['height'] / originalHeight;
        newWidth = originalWidth * ratio;
        newHeight = settings['height'];
      }

      $image.css({ 'width': newWidth, 'height': newHeight });
    },

    stretchImage: function(){
      $image
        .css({ 'width': 'auto', 'marginTop': 0, 'marginLeft': 0 })
        .height(settings['container'].height());

      if ($image.width() < settings['container'].width()){
        $image.css({ 'width': '100%', 'height': 'auto'});
      }
      
      $image.css({ 
        'marginTop': (settings['container'].height() - $image.height()) / 2,
        'marginLeft': (settings['container'].width() - $image.width()) / 2
      });
    }
  }

  $.fn.awesomeResizer = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.tooltip');
    }  
  };

})(jQuery);