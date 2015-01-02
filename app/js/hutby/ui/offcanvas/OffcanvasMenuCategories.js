/**
 * Created by aliaksei on 02.01.2015.
 */

define(['jquery', 'hutby/ui/CategoryAccordion'], function ($, CategoryAccordion) {
    function OffcanvasMenuCategories (catalog) {
        var _this = $('<dl class="accordion" data-accordion></dl>');
        /**
         * Initializes corresponding accordions for each category
         */
        _this.initialize = function () {
            $.each(catalog.possibleRooms(), function(index, each){
                _this.append(new CategoryAccordion(catalog, each));
            });
        };

        _this.initialize();

        return _this;
    }
    return OffcanvasMenuCategories;
});