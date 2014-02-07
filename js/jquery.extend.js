(function($){
 
    // Extend jQuery's native ':'
    $.extend($.expr[':'],{
 
        // New method, "data"
        data: function(a,i,m) {
            // console.log(a,i,m);
            var e = $(a).get(0), keyVal;
 
            // m[3] refers to value inside parenthesis (if existing) e.g. :data(___)
            if(!m[3]) {
 
                // Loop through properties of element object, find any jquery references:
                for (var x in e) { if((/jQuery\d+/).test(x)) { return true; } }
 
            } else {
 
                // Split into array (name,value):
                keyVal = m[3].split('=');
 
                // If a value is specified:
                if (keyVal[1]) {
 
                    // Test for regex syntax and test against it:
                    if((/^\/.+\/([mig]+)?$/).test(keyVal[1])) {
                        return
                         (new RegExp(
                             keyVal[1].substr(1,keyVal[1].lastIndexOf('/')-1),
                             keyVal[1].substr(keyVal[1].lastIndexOf('/')+1))
                          ).test($(a).data(keyVal[0]));
                    } else {
                        // Test key against value:
                        return $(a).data(keyVal[0]) == keyVal[1];
                    }
 
                } else {
 
                    // Test if element has data property:
                    if($(a).data(keyVal[0])) {
                        return true;
                    } else {
                        // If it doesn't remove data (this is to account for what seems
                        // to be a bug in jQuery):
                        $(a).removeData(keyVal[0]);
                        return false;
                    }
 
                }
            }
 
            // Strict compliance:
            return false;
 
        },
        inline: function(a) {
            // console.log(a);
            return $(a).css('display') === 'block';
        }
 
    });
})(jQuery);