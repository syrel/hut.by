/**
 * Created by aliaksei on 03/08/14.
 */

"use strict";
define([
    'jquery',
    'hutby/ui/pager/Pager',
    'hutby/ui/VerticalTextualFlatList',
    'hutby/ui/CategoryAccordion',
    'hutby/category/CategoryPreview',
    'hutby/category/Category'
], function(
    $,
    Pager,
    VerticalTextualFlatList,
    CategoryAccordion,
    CategoryPreview,
    Category
    ){

    function Navigation(catalog) {
        new Pager(catalog);
        new CategoryPreview(catalog, 'hutby-flat-category-preview-box-');
        new Category(catalog, 'hutby-category-');
    }

    return Navigation;
});