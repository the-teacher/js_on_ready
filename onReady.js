;'use strict';

// onReady.call( callback )
// onReady.after_assets( callback )

var onReady = (function(){
  var isReady  = false;
  var isLoaded = false;

  // after Dom is Ready
  var call = function(callback){
    if(isReady){ return callback() }

    if(document.addEventListener) {
      document.addEventListener("DOMContentLoaded", function(){
        isReady = true;
        callback();
      }, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", function(){
        if (document.readyState === "complete") {
          isReady = true;
          callback();
        }
      })
    }
  }

  // after Dom and Assets are Ready
  var after_assets = function(callback){
    if(isLoaded){ return callback() }

    var new_callback = function(){ callback(); isLoaded = true }
    var old_callback = window.onload;

    if(typeof window.onload != 'function'){
      window.onload = new_callback;
    } else {
      window.onload = function() {
        if (old_callback) { old_callback() }
        new_callback();
      }
    }
  }

  return {
    call: call,
    after_assets: after_assets
  }
})();