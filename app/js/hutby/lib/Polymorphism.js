/**
 * Created by aliaksei on 08/01/15.
 */

/**
 * Overrides oldImp function with newImp and allows
 * to access "super class" function using this.super(arguments)
 * in the body of new function
 * @param oldImp
 * @param newImp
 * @returns {Function}
 */
override = function (scope, oldImp, newImp) {

    newImp.super = function() {
        return oldImp.apply(scope, arguments);
    };

    return function () {
        return newImp.apply(newImp, arguments);
    };
};