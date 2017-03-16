require(['knockout', 'jquery', 'knockout_external', 'knockout_validator', 'logger', 'jquery_migrate', 'localizer', 'custom_validators', 'api', 'nav', 'login_vm', 'storageWrapper'],
    function (ko, $, ko_external, knockout_validator, logProxy, jqM, i18n, custom_validators, api, Nav, vm, storageWrapper)
{
    "use strict";

    $(function () {
        window.api = api;
        window.i18n = i18n;
        window.vm = vm;
    });
});