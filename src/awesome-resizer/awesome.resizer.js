/*
 * 'jQuery Awesome Resizer' Plugin for jQuery
 *
 * @author Valerio Capogna
 * @link http://https://github.com/Basilico/jquery-awesome-resizer
 * @created 04-12-2012
 * @updated undefined
 * @version 0.3
 *
 * Description:
 * jQuery Awesome resizer is a multifunctional image resizer. 
 * 
*/

(function($){

  var settings = {
      'width'       : null,
      'height'      : null,
      'fit'         : false,
      'fitOverflow' : true,
      'fluid'       : false,
      'fluidResize' : true,
      'onLoadImage' : null
  };

  var $images;
  var resizeTimer = null;

  var methods = {
    init : function(options) {
      $images = this;
      settings = $.extend(settings, options);

      $images.each(function(){
        var $image = $(this);
        methods.loadImage($image, function($image){

          $image.attr('original-width', $image.width());
          $image.attr('original-height', $image.height());

          $image.attr('resize-width', settings['width'] !== null ? settings['width'] : $image.parent().width());
          $image.attr('resize-height', settings['height'] !== null ? settings['height'] : $image.parent().height());

          settings['fit'] ? methods.fitImage() : methods.resizeImage();

          if (settings['fluid']){
            $(window).on('resize-event', methods.resizeHandler);
            $(window).on('resize', function(){ $(this).trigger('resize-event'); });
          }
        });
      });
    },

    resizeHandler: function(){

      if (!settings['fluidResize'] && resizeTimer !== null){
        clearTimeout(resizeTimer);
        resizeTimer = null;
      }

      resizeTimer = setTimeout(function(){
        $images.each(function(){
          var $image = $(this);
          if (settings['width'] === null &&  settings['height'] === null){
            $image.attr('resize-width', $image.parent().width());
            $image.attr('resize-height', $image.parent().height());
          }
        });
       
        settings['fit']
          ? methods.fitImage() 
          : methods.resizeImage();
        }, 200);
    },

    loadImage : function($image, callback){

      if (undefined !== $image.attr('data-src')){
        $image.parent().addClass('awesome-resizer-loader');
        $image.css('opacity', 0);
        $image.load(function(){
            callback($image);

            if (settings['onLoadImage'] !== null && settings['onLoadImage'] instanceof Function){ settings['onLoadImage']($image); }

            $image.animate({ opacity : 1 }, 'fast', 'easeInOutCubic', function(){
              $image.parent().removeClass('awesome-resizer-loader');
            });
          }).attr('src', $image.attr('data-src'));
      }else{
        if ($image[0].complete){
          callback($image);
          if (settings['onLoadImage'] !== null && settings['onLoadImage'] instanceof Function){ settings['onLoadImage']($image); }
        }else{
          $image.load(function(){
            callback($image);
            if (settings['onLoadImage'] !== null && settings['onLoadImage'] instanceof Function){ settings['onLoadImage']($image); }
          }).attr('src', $image.attr('src'));
        }
      }
    },

    resizeImage: function(){
      $images.each(function(){

        var $image = $(this);
        var originalWidth = parseInt($image.attr('original-width'), 10);
        var originalHeight = parseInt($image.attr('original-height'), 10);
        var resizeWidth = parseInt($image.attr('resize-width'), 10);
        var resizeHeight = parseInt($image.attr('resize-height'), 10);
        var newWidth = originalWidth;
        var newHeight = originalHeight;
        var ratio = 0;

        if (settings['fluid']){ $(window).off('resize-event'); }

        if (originalWidth > resizeWidth){
          ratio = resizeWidth / originalWidth;
          newWidth = resizeWidth;
          newHeight = originalHeight * ratio;
        }

        if (originalHeight > resizeHeight){
          ratio = resizeHeight / originalHeight;
          newWidth = originalWidth * ratio;
          newHeight = resizeHeight;
        }

        $image.css({ 'width': newWidth, 'height': newHeight });

        if (settings['fluid']){ $(window).on('resize-event', methods.resizeHandler); }
      });
    },

    fitImage: function(){
      $images.each(function(){

        var $image = $(this);
        var resizeWidth = parseInt($image.attr('resize-width'), 10);
        var resizeHeight = parseInt($image.attr('resize-height'), 10);
        var deltaTop, deltaLeft;

        if (settings['fluid']){ $(window).off('resize-event'); }

        $image
          .css({ 'width': 'auto', 'marginTop': 0, 'marginLeft': 0 })
          .height(resizeHeight);


        if(settings['fitOverflow']){
          if ($image.width() < resizeWidth){
            $image.css({ 'width': '100%', 'height': 'auto'});
          }
        }else{
          if ($image.width() > resizeWidth){
            $image.css({ 'width': '100%', 'height': 'auto'});
          }
        }

        deltaTop = resizeHeight - $image.height();
        deltaLeft = resizeWidth - $image.width();

        if (settings['fitOverflow']){
          $image.css({
            'marginTop': deltaTop < 0 ? (deltaTop / 2) : 0,
            'marginLeft': deltaLeft < 0 ? (deltaLeft / 2) : 0
          });
        }else{
          $image.css({
            'marginTop': deltaTop > 0 ? (deltaTop / 2) : 0,
            'marginLeft': deltaLeft > 0 ? (deltaLeft / 2) : 0
          });
        }


        if (settings['fluid']){ $(window).on('resize-event', methods.resizeHandler); }
      });
    }
  };

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