/**
 * Created by aliaksei on 28.12.2014.
 */

define([], function(){

    function Strings(){};

    Strings.categoryName = function(rooms){
        switch (rooms) {
            case 1 : {return 'Однокомнатные'};
            case 2 : {return 'Двухкомнатные'};
        }
    };

    return Strings;

});