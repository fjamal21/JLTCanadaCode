require(['knockout', 'jquery', 'knockout_external', 'knockout_validator', 'logger', 'jquery_migrate', 'localizer', 'custom_validators', 'api', 'nav', 'login_vm', 'storageWrapper', 'registerVM'],
    function(ko, $, ko_external, knockout_validator, logProxy, jqM, i18n, custom_validators, api, Nav, vm, storageWrapper, registerVM) {
        "use strict";
        var logger = logProxy("root");

        $(function() {
            window.api = api;
            window.i18n = i18n;
            window.vm = vm;
            vm.registerVM = registerVM;

            ko_external.templatePrefix = 'templates/';

            storageWrapper.remove(['token', 'username']);

            var lang = window.navigator.userLanguage || window.navigator.language;
            lang = lang.indexOf("fr") > -1 ? "fr-CA" : "en-CA";

            if (lang == undefined) {
                lang = api.getParameterValueByName("lang");
            }

            if (window.location.hash.indexOf("register") > -1) {
                var checkUserResponse = api.checkUserIsRegistered(api.getParameterValueByName("username"));
                if (checkUserResponse.result.empregistered === 0) {
                    vm.state("register");
                    vm.locale.selected_locale(lang);
                }
            }
            
            if (window.location.hash.indexOf("resQs") > -1) {                
                    vm.state("resQs");
                    vm.locale.selected_locale(lang);               
            }
            
            logger.debug("app should now be running and visible");

            ko.validation.init({ messageTemplate: 'validation-error' });

            storageWrapper.get(['tempPass']).then(function(result) {
                vm.tempPassword(result.tempPass);
                storageWrapper.remove('tempPass');
                ko.applyBindingsWithValidation(vm);

                return true;
            }, function() {
                logger.debug('Failed to load cookies');
            });
        });
    });