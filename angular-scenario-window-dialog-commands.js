/**
 * @license Angular-E2E-Window-Dialog-Commands (https://github.com/katranci/Angular-E2E-Window-Dialog-Commands)
 * (c) 2013 Ahmet KATRANCI
 * License: MIT
 */

'use strict';


/**
 * Usage: alertOK() sets window.alert to return true when it is called in your application
 */
angular.scenario.dsl('alertOK', function ()
{
    return function ()
    {
        return this.addFutureAction('monkey patch window.alert to return true', function ($window, $document, done)
        {
            $window.alert = function ()
            {
                return true;
            };
            done();
        });
    };
});


angular.scenario.dsl('clearConfirm', function ()
{
    return function ()
    {
        return this.addFutureAction('assume there is no confirmation dialog shown yet', function ($window, $document, done)
        {
            delete this.$parent.windowDialogConfirm;
            done();
        });
    };
});

angular.scenario.dsl('confirmShown', function ()
{
    return function ()
    {
        return this.addFutureAction('check if confirm dialog has been shown', function ($window, $document, done)
        {
            done(null, this.$parent.windowDialogConfirm || false);
        });
    };
});
/**
 * Usage: confirmOK() sets window.confirm to return true when it is called in your application
 */
angular.scenario.dsl('confirmOK', function ()
{
    return function ()
    {
        return this.addFutureAction('monkey patch window.confirm to return true', function ($window, $document, done)
        {
            var that = this;
            $window.confirm = function ()
            {
                that.$parent.windowDialogConfirm = true;
                return true;
            };
            done();
        });
    };
});


/**
 * Usage: confirmCancel() sets window.confirm to return false when it is called in your application
 */
angular.scenario.dsl('confirmCancel', function ()
{
    return function ()
    {
        return this.addFutureAction('monkey patch window.confirm to return false', function ($window, $document, done)
        {
            var that = this;
            $window.confirm = function ()
            {
                that.$parent.windowDialogConfirm = true;
                return false;
            };
            done();
        });
    };
});


/**
 * Usage: setPromptValue(value) sets window.prompt to return `value` when it is called in your application
 */
angular.scenario.dsl('setPromptValue', function ()
{
    return function (value)
    {
        return this.addFutureAction('monkey patch window.prompt to return ' + value, function ($window, $document, done)
        {
            $window.prompt = function ()
            {
                return value;
            };
            done();
        });
    };
});