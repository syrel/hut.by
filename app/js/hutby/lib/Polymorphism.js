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
override = function (oldImp, newImp) {
    newImp.super = oldImp;

    return function (arguments) {
        newImp.call(newImp, arguments);
    };
};