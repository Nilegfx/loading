// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "loading",
				defaults = {
				propertyName: "value"
		};

		// The actual plugin constructor
		function Loading ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		Loading.prototype = {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.settings).
						// console.log("xD");
						// this._calculateHeight();
						// this._calculateWidth();
						// console.log(this._getWindowDimensions());
						this._indicatorCreate();
						this._setDimensions();
						this._eventHandlers();
						
				},
				_setDimensions:function(){
					this.element.animate(this._getWindowDimensions(),50);
					this._indicatorPosition();
				},
				_getWindowDimensions:function(){
					var e = window;
					var a = 'inner';
					if (!('innerWidth' in window)){
					    a = 'client';
					    e = document.documentElement || document.body;
					}
					return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
				},
				_eventHandlers:function(){
					var self = this;
					var resizeTimer;
					$(window).resize(function() {
					    clearTimeout(resizeTimer);
					    resizeTimer = setTimeout(function(){
								console.log(self._getWindowDimensions());
								self._setDimensions();
					    }, 100);
					});
				},
				_eventHandlers2:function(){
					var self = this;
					 $( window ).wresize(function(){
						console.log(self._getWindowDimensions());
						self._setDimensions();
					});
				},
				_show:function(){
					this.element.fadeIn(100);
				},
				_hide:function(){
					this.element.fadeOut(100);
				},
				_indicatorCreate:function(str){
					this._theIndicator = $("<div>",{"class":"loading-indicator-container"}).appendTo(this.element);;
					$("<img>",{
						src:"css/images/loading2.gif"
					}).appendTo(this._theIndicator);
				},
				_indicatorPosition:function(){
					var parentDim = this._getWindowDimensions(),
							indicatorContainer = $(this._theIndicator);
							indicatorContainerDim = {width:indicatorContainer.outerWidth(),height:indicatorContainer.outerHeight()};
							indicatorContainer.animate({
								top:(parentDim.height / 2) - (indicatorContainerDim.height / 2),
								left:(parentDim.width / 2) - (indicatorContainerDim.width / 2),
							},100);

				}
				
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {

			if(!$(":data(plugin_loading)").length){
				this.first().data( "plugin_" + pluginName, new Loading( this.first(), options ) );
			}
				// chain jQuery functions
				return this.first();
		};

})( jQuery, window, document );
