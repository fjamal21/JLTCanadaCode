require(['knockout', 'jquery', 'knockout_external', 'knockout_validator', 'logger', 'jquery_migrate', 'localizer', 'custom_validators', 'api', 'nav', 'login_vm', 'storageWrapper'],
    function (ko, $, ko_external, knockout_validator, logProxy, jqM, i18n, custom_validators, api, Nav, vm, storageWrapper)
{
    "use strict";
    var logger = logProxy("root");

    $(function () {
        window.api = api;
        window.i18n = i18n;
        window.vm = vm;

        ko_external.templatePrefix = 'templates/';

        storageWrapper.remove(['token','username']);

        logger.debug("app should now be running and visible");

        ko.validation.init({ messageTemplate: 'validation-error' });

        storageWrapper.get(['tempPass']).then(function (result) {
            vm.tempPassword(result.tempPass);
            storageWrapper.remove('tempPass');
            ko.applyBindingsWithValidation(vm);

            return true;
        }, function () {
            logger.debug('Failed to load cookies');
        });
    });
});