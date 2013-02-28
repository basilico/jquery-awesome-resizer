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

  var $images;

  var methods = {
    init : function(options) { 
      $images = this;
      settings = $.extend(settings, options);

      $images.each(function(){
        var $image = $(this);
        methods.loadImage($image, function($image){

          $image.attr('original-width', $image.width());
          $image.attr('original-height', $image.height());

          if (settings['container'] === null){ settings['container'] = $image.parent(); }

          settings['width'] = settings['width'] !== null ? settings['width'] : settings['container'].width();
          settings['height'] = settings['height'] !== null ? settings['height'] : settings['container'].height();

          settings['stretch'] ? methods.stretchImage() : methods.resizeImage();

          if (settings['fluid']){
            $(window).on('resize', function(){ $(this).trigger('resize-event'); });
            $(window).on('resize-event', methods.resizeHandler);
          }
        });
      });
    },

    resizeHandler: function(){
      setTimeout(function(){
        if (settings['container'] !== null){          
          settings['width'] = settings['container'].width();
          settings['height'] = settings['container'].height();
        }

        settings['stretch']
          ? methods.stretchImage() 
          : methods.resizeImage();
        }, 200);
    },

    loadImage : function($image, callback){

      if (undefined !== $image.attr('data-src')){
        $image.parent().addClass('awesome-resizer-loader');
        $image.css('opacity', 0);
        $image.load(function(){
            callback($image);
            $image.animate({ opacity : 1 }, 'fast', 'easeInOutCubic', function(){
              $image.parent().removeClass('awesome-resizer-loader');
            });
          }).attr('src', $image.attr('data-src'));
      }else{
        if ($image[0].complete){
          callback($image);
        }else{
          $image.load(function(){
            callback($image);
          }).attr('src', $image.attr('src'));
        }
      }        
    },

    resizeImage: function(){
      $images.each(function(){

        var $image = $(this);
        var originalWidth = parseInt($image.attr('original-width'));
        var originalHeight = parseInt($image.attr('original-height'));
        var newWidth = originalWidth; 
        var newHeight = originalHeight;
        var ratio = 0;

        if (settings['fluid']){ $(window).off('resize-event'); }

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

        if (settings['fluid']){ $(window).on('resize-event', methods.resizeHandler); }
      });
    },

    stretchImage: function(){
      $images.each(function(){

        var $image = $(this);
        var deltaTop, deltaLeft;

        if (settings['fluid']){ $(window).off('resize-event'); }

        $image
          .css({ 'width': 'auto', 'marginTop': 0, 'marginLeft': 0 })
          .height(settings['height']);

        if ($image.width() < settings['width']){
          $image.css({ 'width': '100%', 'height': 'auto'});
        }

        deltaTop = settings['height'] - $image.height();
        deltaLeft = settings['width'] - $image.width();

        $image.css({ 
          'marginTop': deltaTop <= 0 ? (deltaTop / 2) : 0,
          'marginLeft': deltaLeft <=0 ? (deltaLeft / 2) : 0
        });

        if (settings['fluid']){ $(window).on('resize-event', methods.resizeHandler); }        
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