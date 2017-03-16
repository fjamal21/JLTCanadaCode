var require = {
	urlArgs: "v1=" + (new Date()).getTime(),
    baseUrl: "js/",
    paths:
    {
        "knockout": "../lib/knockout-2.2.1",
        "knockout_external": "../lib/koExternalTemplateEngine_all.min",
		"knockout_validator": "../lib/knockout.validation",
        "knockout_mapping": "../lib/knockout.mapping",
        "custom_validators" : "validators/custom-validators",
        "jquery": ((typeof window !== "undefined") && window.legacyIE) ? "../lib/jquery/jquery-1.9.1.min" : "../lib/jquery/jquery-2.0.0.min",
        "jquery_migrate": "../lib/jquery/jquery-migrate-1.1.1.min",
		"dateFormatter": "../lib/jquery.dateFormat-1.0",
        "jquery-ui": "../lib/jquery-ui-1.10.3.custom.min",
        "datepicker": "../lib/datepicker",
        "JSON": "../lib/json2",
		"underscore": "../lib/underscore-min",
        "moment": "../lib/moment",
        // Custom Bindings
        'datePick': "customBindings/datepickerBinding",
		"configurable": "customBindings/configurable-binding",
        "popup": "customBindings/popup-binding",
        "history-popup": "customBindings/history-popup-binding",
        "focusBinding": "customBindings/focusBinding",
        "numeric_text": "customBindings/numeric-text",
        "header_menu": "customBindings/header-menu",
        "placeHolder": "customBindings/placeHolder",
        //Mac libraries
        "logger": "core/mac_logger",
        "localizer_vm": "localizer_vm",
        "localizer": "core/mac_localizer",
        "localizer_base": "core/localizer_modules/knockout",
        "subscription": "core/mac_subscription",
        "dotNotationTreeBuilder": "core/mac_dotNotationTreeBuilder",
        "storage": "core/mac_storage",
        "rest": "core/mac_rest",
        "batch": "core/mac_batch",
        "promise": "core/mac_promise",
        "nav": "core/mac_nav",
		"route": "core/mac_route",
        "path": "core/path",
        "node_nav": "core/nav_modules/node",
		"rateLimitedConsumerQueue": "core/mac_rateLimitedConsumerQueue",
        // Folder Shortcuts
        "tmpl": "../templates",
        "resources": "../resources",
		"login_vm": "vm/login",
        "dependents_vm": "vm/dependents",
        "reset_password_vm": "vm/reset-password",
        "security_questions_vm": "vm/security-questions",
        "app_config_vm": "app_config_vm",
        "personalInfo_vm": "vm/personal-info",
        "benefits_vm": "vm/benefits",
        "unusedCredits_vm": "vm/unusedCredits",
        "costsScenarios_vm": "vm/costs-scenarios",
        "stdLifeCostsScenarios_vm": "vm/std-costs-scenario",
        "home_vm": "vm/home",
        "header_vm": "vm/header",
        "storageWrapper": "storageWrapper",
        "forgottenUsernameVM": "vm/forgotten-username",
        "forgottenPasswordVM": "vm/forgotten-password",
        "forgottenSecurityQuestionsVM":"vm/forgotten-security-questions",
        "forgottenRenewPasswordVM": "vm/forgotten-renew-password",
        "benefit_tab": "vm/benefit-tab",
        "option_row": "vm/option-row",
        "summary-row": "vm/summary-row",
        "microsite-home": "vm/microsite-home",
        "life-events": "vm/life-events",
        "coverage-history": "vm/coverage-history",
        "coverage-grade-row": "vm/coverage-grade-row",
        "congratulations_vm": "vm/congratulations",
        "current_coverage_vm": "vm/current-coverage",
        "fsaoptions": "vm/fsaoptions",
        "lifeEventsSecurity_vm":  "vm/life-events-security",
        "contactUs_vm":  "vm/contact-us",
		"documentation_support_vm":  "vm/documentation-support",
		"tutorials_vm":  "vm/tutorials",
		"registerVM":"vm/register",
        //Factories
        "benefit_factory": "factories/benefit-factory",
        "option_factory": "factories/option-factory"
    },
    shim:
    {
		"jquery-ui":
        {
            deps: ["jquery"]
        },
		"dateFormatter":
        {
            deps: ["jquery"]
        },
		"datepicker":
        {
            deps: ["jquery"]
        },
		"datePick":
        {
            deps: ["jquery"]
        },
        "infuser":
        {
            deps: ["jquery"]
        },
        "knockout_external":
        {
            deps: ["knockout"]
        },
        "knockout_validator":
        {
            deps: ["knockout"]
        },
        "custom_validators":
        {
            deps: ["knockout", "knockout_validator"]
        },
        "jquery_migrate":
        {
            deps: ["jquery"]
        },
        "jquery.bootstrap":
        {
            deps: ["jquery"]
        },
        //Mac Libraries dependencies
        "batch":
        {
            deps: ["promise", "logger"]
        },
        "localizer":
        {
            deps: ["localizer_base", "promise", "logger"]
        },
        "logger":
        {
            deps: ["jquery"]
        },
        "nav":
        {
            deps: ["logger"]
        },
        "promise":
        {
            deps: ["logger"]
        },
        "rest":
        {
            deps: ["jquery", "subscription", "promise"]
        },
        "storage":
        {
            deps: ["logger", "promise"]
        }
    }
};