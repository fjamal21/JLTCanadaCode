require(['knockout', 'jquery', 'vm/rootVM', 'knockout_external', 'knockout_validator', 'underscore', 'knockout_mapping', 'logger', 'jquery_migrate', 'localizer', 'api', 'nav', 'path', 'storageWrapper', 'rest', 'app_config_vm', 'custom_validators','core/storage_modules/cookie'],
    function (ko, $, vm, ko_external, knockout_validator, _, knockout_mapping, logProxy, jqM, i18n, api, Nav, Path, storageWrapper, rest, appConfig, customValidators, cookie)
{
    "use strict";
    var logger = logProxy("root");
    var nav = new Nav();

    $(function () {
        var route, data;

        window.api = api;
        window.i18n = i18n;
        window.vm = vm;
        window.Path = Path;
        window.jQuery = $;

        ko.mapping = knockout_mapping;
        ko_external.templatePrefix = 'templates/';

        /* ==================== START: Empty path ==================== */
        nav.route('').subscribe(function() {
            indentifyPerson({
                page: 'home',
                callback: function() {
                    nav.navigateTo('home');
                }
            });
        });
        /* ==================== END: Empty path ==================== */

        /* ==================== START: home ==================== */
        nav.route('home').subscribe(function(path) {
            indentifyPerson({
                page: 'home',
                callback: function() {
                    vm.home.showNavButtons = true;
                    if (vm.home.action() !== 'enroll') {
                        vm.home.selectTab('microsite-home');
                    }
                    loadContent('home');
                }
            });
        });
        /* ==================== END: home ==================== */

        /* ==================== START: contact us ==================== */
        nav.route('contact-us').subscribe(function(path) {
            indentifyPerson({
                page: 'contact-us',
                callback: function() {
                    getContacts({
                        callback: function (data) {
							vm.home.selectTab('microsite-home');
                            vm.home.contactUs.setContacts(data);
                            loadContent('contact-us');
                        }
                    },vm.home.division_id);
                }
            });
        });
        /* ==================== END: contact us ==================== */
		
		/* ==================== START: support and documentation ==================== */
        nav.route('documentation-support').subscribe(function(path) {
            indentifyPerson({
                page: 'documentation-support',
                callback: function() {
                    getDocumentation({
                        callback: function (data) {
							vm.home.selectTab('microsite-home');
                            vm.home.documentationSupport.setDocumentation(data);
                            loadContent('documentation-support');
                        }
                    },vm.home.employee_id);
                }
            });
        });
        /* ==================== END: support and documentation ==================== */
		
		/* ==================== START: Tutorials ==================== */
        nav.route('tutorials').subscribe(function(path) {
            indentifyPerson({
                page: 'tutorials',
                callback: function() {
					vm.home.selectTab('microsite-home');
                    loadContent('tutorials');
                }
            });
        });
        /* ==================== END: support and documentation ==================== */

    /* ======================= START: templates ======================= */

        /* ==================== START: home/personal-info ==================== */
        nav.route('home/personal-info').subscribe(function(path) {
            indentifyPerson({
                page: 'personal-info',
                callback: function () {
                    vm.home.personalInfo.setPersonalInfo(data);
                    vm.home.selected('personal-info');
                    loadContent('home/personal-info');
                }
            });
        });
        /* ==================== END: home/personal-info ==================== */

        /* ==================== START: home/dependents ==================== */
        nav.route('home/dependents').subscribe(function(path) {
            indentifyPerson({
                page: 'dependents',
                callback: function () {
                    vm.home.showNavButtons = true;
                    vm.home.dependents.showAddButton(true);
                    getDependents({
                        callback: function (data) {
                            vm.home.dependents.isLoading(false);
                            vm.home.dependents.setDependentsInfo(data, false, false, false); //data.dependents, data.pendingApproval, data.viewReadonlyBenefits);
                            vm.home.selected('dependents');
                            loadContent('home/dependents');
                        }
                    });

                }
            });
        });
        /* ==================== END: home/dependetns ==================== */

        /* ==================== START: home/benefits ==================== */
        nav.route('home/benefits').subscribe(function(path) {
            indentifyPerson({
                page: 'benefits',
                callback: function () {
                    getBenefits({
                        callback: function (data) {
							// this is to continue editing the last half added scenario SD-33 Feroze
							if(vm.home.enroll_details[0].last_incomp_scenario != 0) {
								vm.home.benefits.selectedScenarioIndex(vm.home.enroll_details[0].last_incomp_scenario)
								cookie.write('jlt', {'sID':vm.home.enroll_details[0].last_incomp_scenario});
								cookie.write('jlt', {'empplanID':vm.home.enroll_details[0].empplan_id});	
							}
                            if (document.URL.indexOf("home/benefits") > -1 ) {
                                vm.home.benefits.setBenefitsInfo(data, null, false, false,vm.home.action());
                                if (!vm.home.benefits.singlePageBenefits()) {																	
	                                nav.navigateTo('home/benefits/' + vm.home.benefits.empselections()[0].group_id);
                                } else {
									vm.home.selected('benefits');
                                    loadContent('home/benefits');
                                }
                            }
                        }
                    });
                }
            });
        });
        /* ==================== END: home/benefits ==================== */
		
		/* ==================== START: home/benefits/add ==================== */
        nav.route('home/benefits/add').subscribe(function(path) {
            indentifyPerson({
                page: 'benefits',
                callback: function () {
                    getBenefits({
                        callback: function (data) {							
                            if (document.URL.indexOf("home/benefits") > -1 ) {
                                vm.home.benefits.setBenefitsInfo(data, null, false, false,vm.home.action());
                                if (!vm.home.benefits.singlePageBenefits()) {
	                                nav.navigateTo('home/benefits/' + vm.home.benefits.empselections()[0].group_id);
                                } else {
									vm.home.selected('benefits');
                                    loadContent('home/benefits');
                                }
                            }
                        }
                    });
                }
            });
        });
        /* ==================== END: home/benefits ==================== */

        /* ==================== START: home/benefits/selection ==================== */
        nav.route('home/benefits/selection').subscribe(function(path) {
            indentifyPerson({
                page: 'selection',
                callback: function () {
                    getCostsScenarios({
                        callback: function (scenarios) {
                            // TO DO: This should be the case when we have real data
                            vm.home.benefits.setCostsScenario(scenarios);
                            vm.home.selected('benefits');
                            loadContent('home/benefits/selection');
                        }
                    });
                }
            });
        });
        /* ==================== END: home/benefits/selection ==================== */


        /* ==================== START: home/benefits/* ==================== */
        nav.route('home/benefits/*').subscribe(function(path) {
            indentifyPerson({
                page: 'benefits',
                callback: function () {
                    getBenefits({
                        callback: function(data) {
                            vm.home.benefits.setBenefitsInfo(data, null, false, false,vm.home.action());                            // TO DO: This should be the case when we have real data
                            var empselections = vm.home.benefits.empselections();
							vm.home.benefits.set_scenario = data.is_enable_multi_scenario_select;
                            _.find(empselections, function(group, index) {
                                if (group.group_id == path) {
                                    group.selected(true);
                                    group.passed(false);
                                    var selectedTabIndex = index;
                                    _.each(empselections, function(tab, i) {
                                        if (i < selectedTabIndex) {
                                            tab.selected(false);
                                            tab.passed(true);
                                        } else if (i > selectedTabIndex) {
                                            tab.selected(false);
                                            tab.passed(false);
                                        }
                                    })
                                }
                            });
                            vm.home.selected('benefits');
                            loadContent('home/benefits');
                        }
                    });
                }
            });
        });
        /* ==================== END: home/benefits/* ==================== */
		
		/* ==================== START: home/benefits/* ==================== */
        /* nav.route('home/benefits/*').subscribe(function(path) {
            indentifyPerson({
                page: 'benefits',
                callback: function () {
                    getBenefits({
                        callback: function(data) {
                            vm.home.benefits.setBenefitsInfo(data, null, false, false,vm.home.action());                            // TO DO: This should be the case when we have real data
                            var empselections = vm.home.benefits.empselections();
                            _.find(empselections, function(group, index) {
                                if (group.group_id == path) {
                                    group.selected(true);
                                    group.passed(false);
                                    var selectedTabIndex = index;
                                    _.each(empselections, function(tab, i) {
                                        if (i < selectedTabIndex) {
                                            tab.selected(false);
                                            tab.passed(true);
                                        } else if (i > selectedTabIndex) {
                                            tab.selected(false);
                                            tab.passed(false);
                                        }
                                    })
                                }
                            });
                            vm.home.selected('benefits');
                            loadContent('home/benefits');
                        }
                    });
                }
            });
        }); */
        /* ==================== END: home/benefits/* ==================== */

        /* ==================== START: home/unusedCredits ==================== */
        nav.route('home/unused-credits').subscribe(function(path) {
            indentifyPerson({
                page: 'unused-credits',
                callback: function () {
                        var enrolment = vm.home.getFirstIncompleteEnrolment();
                        var employeeId = enrolment && enrolment.employee_id;
                        var planId = enrolment && enrolment.empplan_id;
                        //var planId = vm.home.enroll_details[0].empplan_id;
                        var effectiveDate = enrolment && enrolment.effective_date;
                        var unusedCreditsEnabled = enrolment && enrolment.allow_flexunused;
                        if(unusedCreditsEnabled == 1){
                            getUnusedFlexCredits({
                                callback: function(unusedCredits) {
                                  vm.home.unusedCredits.isLoading(false);
                                  //need to the following variables to determine
                                  //if we need to go to the unused credits page
                                  var remaining = parseFloat(unusedCredits.unused_credits.toFixed(unusedCredits.round));
                                  var flexc_rrsp = 0;
                                  if (unusedCredits.rrsp_details){
                                    flexc_rrsp = _.reduce(unusedCredits.rrsp_details, function(memo, rrsp){
                                         return memo + rrsp.init_flexc_rrsp;
                                    },0);
                                  }
                                  var flexc_hcsa = unusedCredits.hcsa_details ? unusedCredits.hcsa_details.init_flexc_hcsa : 0;
                                  var cash_amt = unusedCredits.cash_details ? unusedCredits.cash_details.init_cash_amt : 0;
                                  
                                  flexc_rrsp = parseFloat(flexc_rrsp.toFixed(unusedCredits.round));
                                  flexc_hcsa = parseFloat(flexc_hcsa.toFixed(unusedCredits.round));
                                  cash_amt = parseFloat(cash_amt.toFixed(unusedCredits.round));

                                  var usedCredits = flexc_rrsp + flexc_hcsa + cash_amt;
                                  
                                  if (remaining <= 0) {
                                    if (vm.home.enrollNowButtonClicked()) {
                                        nav.navigateTo('home/benefits');
                                    } else {
                                        if(usedCredits > 0){
                                            //the server needs to be explicitly told to nullify the unused credits
                                            clearUnusedCredits(employeeId, planId, effectiveDate).then(function (result) {
                                                vm.home.disableUnusedCredits(true);
                                                nav.navigateTo('home/summary');
                                            });
                                        } else{
                                           vm.home.disableUnusedCredits(true);
                                           nav.navigateTo('home/summary');
                                        }
                                    }
                                  } else {
                                       vm.home.disableUnusedCredits(false);
                                       vm.home.unusedCredits.setFlexCreditsValue(planId, employeeId, effectiveDate, unusedCredits);
                                       vm.home.selected('unused-credits');
                                       loadContent('home/unused-credits');
                                  }
                             
                                }
                            },employeeId,planId,effectiveDate, vm.home.action());
                    } else	{
                        if (vm.home.enrollNowButtonClicked()) {
                            nav.navigateTo('home/benefits');
                        } else {
                            vm.home.disableUnusedCredits(true);
                            nav.navigateTo('home/summary');
                        }
                    }
                }
            });
        });
        /* ==================== END: home/unusedCredits ==================== */

        /* ==================== START: home/costsScenarios ==================== */
        nav.route('home/costs-scenarios').subscribe(function(path) {
            indentifyPerson({
                page: 'costs-scenarios',
                callback: function () {
                    getCostsScenarios({
                        callback: function (scenarios) {
                            // TO DO: This should be the case when we have real data
                            vm.home.costsScenarios.setCostsScenarios(scenarios);
                            vm.home.selected('costs-scenarios');
                            loadContent('home/costs-scenarios');
                        }
                    });
                }
            });
        });
        /* ==================== END: home/costsScenarios ==================== */


        /* ==================== START: home/summary ==================== */
        nav.route('home/summary').subscribe(function(path) {
            indentifyPerson({
                page: 'summary',
                callback: function () {
                        var enrolment = vm.home.getFirstIncompleteEnrolment();
                        var employeeId = enrolment && enrolment.employee_id;
                        var planId = enrolment && enrolment.empplan_id;
                        var effectiveDate = enrolment && enrolment.effective_date;
                        var isCompleted = enrolment && enrolment.is_completed;

                        if (vm.home.action() != 'life-events') {
                            getSummary({
                                callback: function (summary) {
									
									vm.home.benefits.empCompareSelections(summary.empselectsummary);
									vm.home.benefits.empCompareVisible(summary.is_enable_multi_scenario_select);
									ko.utils.arrayForEach(vm.home.benefits.empCompareSelections(),function(item){
										item.selectedBenefit = ko.observable(false);
									});
									
                                    vm.home.stdLifeCostsScenarios.isLoading(false);									
									summary = calculateTotalsLifeEvents(summary);
                                    vm.home.stdLifeCostsScenarios.setEmpSelections(summary, 'enroll');
									vm.home.benefits.empCompareVisible(summary.is_enable_multi_scenario_select);
                                    vm.home.selected('summary');
                                    loadContent('home/summary');
                                    }
                            }, employeeId, planId, effectiveDate, isCompleted, vm.home.action());                            
                        } else {
                            /* getLifeEventsSummary({
                                callback: function (summary) {
                                    vm.home.stdLifeCostsScenarios.isLoading(false);
									summary = calculateTotalsLifeEvents(summary);
                                    vm.home.stdLifeCostsScenarios.setEmpSelections(summary, 'enroll');
                                    vm.home.selected('summary');
                                    loadContent('home/summary');
                                    }
                            }, employeeId, planId, 0, vm.home.action()); */
							
                            getLifeEventsSummary({
                                callback: function (summary) {
									vm.home.benefits.empCompareSelections(summary.empselectsummary);
									vm.home.benefits.empCompareVisible(summary.is_enable_multi_scenario_select);
									ko.utils.arrayForEach(vm.home.benefits.empCompareSelections(),function(item){
									item.selectedBenefit = ko.observable(false);
								});
										//vm.home.benefits.empCompareSelections(summary);
										vm.home.stdLifeCostsScenarios.isLoading(false);
										summary = calculateTotalsLifeEvents(summary);
										vm.home.stdLifeCostsScenarios.setEmpSelections(summary, 'enroll');
										vm.home.selected('summary');
										loadContent('home/summary');
                                }
                            }, employeeId, planId, 0, vm.home.action());
                        }
                }
            });
        });

        /* ==================== END: home/enrollment-compare ==================== */

        nav.route('home/enrollment-compare').subscribe(function(path) {
            indentifyPerson({
                page: 'enrollment-compare',
                callback: function () {
                    var action = vm.home.action();
                    if(action === 're-enroll'){
                         var employeeId = vm.home.enroll_details[0].employee_id;
                         var empplanId = vm.home.enroll_details[1].empplan_id;
                         var reenrollPlanId = vm.home.enroll_details[0].empplan_id;
                         var reenrollEffectiveDate = vm.home.enroll_details[0].coverage_start_date;
                         getReEnrollSummary({
                            callback: function (summary){
								summary = calculateTotalsLifeEvents(summary);
                                vm.home.stdLifeCostsScenarios.setEmpSelections(summary, action);
                                vm.home.selected('benefits'); //HACK
                                loadContent('home/summary');
                            }
                        }, employeeId, empplanId, reenrollPlanId, reenrollEffectiveDate, 1, action);
                    }
                }
            });
        });


        /* ==================== START: home/congratulations ==================== */
        nav.route('home/congratulations').subscribe(function(path) {
            indentifyPerson({
                page: 'congratulations',
                callback: function () {
                    var enrolment = vm.home.getFirstIncompleteEnrolment();
                    if (enrolment) {
                        var employeeId = enrolment.employee_id;
                        var planId = enrolment.empplan_id;
                        var action = vm.home.action();
                        //var employeeId = vm.home.enroll_details[0].employee_id;
                        //var planId = vm.home.enroll_details[0].empplan_id;
                        getCongratulationsData({
                                    callback: function(congratsData) {
                                       vm.home.congratulations.setCongratulationsData(congratsData);
                                       vm.home.selected('congratulations');
                                       loadContent('home/congratulations');
                                    }
                                },employeeId, planId, action);
                    } else {
                        nav.navigateTo('home');
                    }
                }
            });
        });                            
        /* ==================== END: home/congratulations ==================== */

        /* ==================== START: home/life-events ==================== */
        nav.route('home/life-events').subscribe(function(path) {
            indentifyPerson({
                page: 'life-events',
                callback: function () {
                    var division_id = vm.home.division_id;
                    getLifeEvents({
                        callback: function(data) {
							vm.home.latest_lifeevent_effective_date = data.latest_lifeevent_effective_date;
                            vm.home.lifeEvents.setLifeEvents(data);
                            vm.home.selectTab('life-events');
                            loadContent('home/life-events');
                        }
                    }, division_id);
                }
            });
        });
        /* ==================== END: home/life-events ==================== */

        /* ==================== START: home/life-events/current-coverage ==================== */
        nav.route('home/life-events/current-coverage').subscribe(function(path) {
            indentifyPerson({
                page: 'current-coverage',
                callback: function () {
                    vm.home.showNavButtons = true;
                    vm.home.selectCoverageSummarySubTab('current-coverage');
                    var enrolment = vm.home.getCurrentEnrollment();
                    if (enrolment) {
						var enrollEndDate = new Date(enrolment.enroll_end_date.toString());		
						var currentDate = new Date();								
						if(enrolment.is_completed === 0 && enrollEndDate < currentDate && enrolment.enroll_open == 0 && vm.home.emplifeevent_id == 0) {
							loadContent('home/life-events/current-coverage/lapsed-warning');
						} else if(enrolment.is_completed == 0 && enrolment.is_authorized == 0 && vm.home.emplifeevent_id > 0) {
							vm.home.stdLifeCostsScenarios.setEmpSelectionsLEWarning('life-events');
							loadContent('home/life-events/current-coverage');						
						} else if(enrolment.is_completed == 0 && enrolment.is_authorized == 0 && vm.home.emplifeevent_id == 0) {		
							vm.home.stdLifeCostsScenarios.setEmpSelectionsLEWarning('life-events');
							loadContent('home/life-events/current-coverage');		
						} else {
							var employeeId = data.employee_id;
							var planId = enrolment.empplan_id;
							var isCompleted = enrolment.is_completed;
							var reenrollPlanId = enrolment.empplan_id;
							var reenrollEffectiveDate = enrolment.coverage_start_date;
							getLifeEventsSummary({
								callback: function (coverage) {
									if (coverage.empselectsummary[0].empselections.length > 0) {
										coverage = calculateTotalsLifeEvents(coverage);
										vm.home.stdLifeCostsScenarios.setEmpSelections(coverage, 'life-events');
										loadContent('home/life-events/current-coverage');
									} else {
										getLifeEventsSummary({
											callback: function (coverage) {
												coverage = calculateTotalsLifeEvents(coverage);
												vm.home.stdLifeCostsScenarios.setEmpSelections(coverage, 'life-events');
												loadContent('home/life-events/current-coverage');
											}
										}, employeeId, planId, isCompleted, vm.home.action(), reenrollPlanId, reenrollEffectiveDate);
									}
								}
							}, employeeId, planId, isCompleted, vm.home.action());
						}
                    } else {
                        loadContent('home/life-events/current-coverage/no-enrolments');
                    }
                }
            });
        });
        /* ==================== END: home/life-events/current-coverage ==================== */
        /* ==================== START: home/life-events/coverage-history ==================== */
        nav.route('home/life-events/coverage-history').subscribe(function(path) {
             indentifyPerson({
                page: 'coverage-history',
                callback: function () {
                    vm.home.showNavButtons = true;
                    vm.home.selectCoverageSummarySubTab('coverage-history');
                    var enrolment = vm.home.getCurrentEnrollment();
                    if (enrolment) {
                        var employeeId = data.employee_id;
                        getCoverageHistory({
                            callback: function (historyData) {
                                vm.home.stdLifeCostsScenarios.setCoverageHistory(historyData);
                                loadContent('home/life-events/coverage-history');
                            }
                        }, employeeId);
                    }
                }
            });
        });
        /* ==================== END: home/life-events/coverage-history ==================== */
        /* ==================== START: home/life-events/personal-info ==================== */
        nav.route('home/life-events/personal-info').subscribe(function(path) {
            indentifyPerson({
                page: 'life-events',
                callback: function () {
                    vm.home.showNavButtons = false;
                    getPersonalInfo({
                        callback: function (data) {
                            vm.home.personalInfo.setPersonalInfo(data);
                            vm.home.selectMyProfileSubTab('personal-info');
                            loadContent('home/life-events/personal-info');
                        }
                    });
                }
            });
        });
        /* ==================== END: home/life-events/personal-info ==================== */
        /* ==================== START: home/life-events/smoking-status ==================== */
        nav.route('home/life-events/smoking-status').subscribe(function(path) {
            indentifyPerson({
                page: 'life-events',
                callback: function() {
                    getPersonalInfo({
                        callback: function (data) {
                            vm.home.personalInfo.setPersonalInfo(data);
                            vm.home.selectMyProfileSubTab('smoking-status');
                            loadContent('home/life-events/smoking-status');                        
                        }
                    });
                }
            });
        });
        /* ==================== END: home/life-events/smoking-status ==================== */
        /* ==================== START: home/life-events/employment-info ==================== */
        nav.route('home/life-events/employment-info').subscribe(function(path) {
            indentifyPerson({
                page: 'life-events',
                callback: function() {
                    getPersonalInfo({
                        callback: function (data) {
                            vm.home.personalInfo.setPersonalInfo(data);
                            vm.home.selectMyProfileSubTab('employment-info');
                            loadContent('home/life-events/employment-info');                    
                        }
                    });
                }
            });
        });
        /* ==================== END: home/life-events/employment-info ==================== */
        /* ==================== START: home/life-events/banking-payment-info ==================== */
        nav.route('home/life-events/banking-payment-info').subscribe(function(path) {
            indentifyPerson({
                page: 'life-events',
                callback: function () {
                    getPersonalInfo({
                        callback: function (data) {
                            vm.home.personalInfo.setPersonalInfo(data);
                            vm.home.personalInfo.showDirectDeposit(true);
                            vm.home.selectMyProfileSubTab('banking-payment-info');
                            loadContent('home/life-events/banking-payment-info');
                        }
                    });
                }
            });
        });
        /* ==================== END: home/life-events/banking-payment-info ==================== */
        /* ==================== START: home/life-events/security ==================== */
        nav.route('home/life-events/security').subscribe(function(path) {
            indentifyPerson({
                page: 'life-events',
                callback: function () {
                    if (appConfig.is_sec_quest_enabled === 1) {
                        getSecurityQuestions({
                            callback: function(data) {
								vm.home.lifeEventsSecurity.resetPasswordVM.password_settings(data.passwordCriteria.settings);
                                vm.home.lifeEventsSecurity.setSecurityQuestions(data.result);
                                vm.home.lifeEventsSecurity.clearPasswordFields();
                                vm.home.selectMyProfileSubTab('security');
                                loadContent('home/life-events/security');
                            }
                        });                        
                    } else {
                        vm.home.lifeEventsSecurity.clearPasswordFields();
                        vm.home.lifeEventsSecurity.changeMyPassword();
                        vm.home.selectMyProfileSubTab('security');
                        loadContent('home/life-events/security');
                    }
                }
            });
        });
        /* ==================== END: home/life-events/security ==================== */
        /* ==================== START: home/life-events/my-dependents ==================== */
        nav.route('home/life-events/my-dependents').subscribe(function(path) {
            indentifyPerson({
                callback: function () {
                    vm.home.showNavButtons = false;
                    vm.home.dependents.showAddButton(false);
                    getDependents({    // for local use getFakeDependents
                        callback: function (data) {
                            // TO DO: This should be the case when we have real data
                            vm.home.dependents.isLoading(false);
                            vm.home.dependents.setDependentsInfo(data, false, false, true);
                            vm.home.selectTab('my-dependents');
                            loadContent('home/life-events/my-dependents');
                        }
                    });
                }
            });
        });
        /* ==================== END: home/life-events/my-dependents ==================== */

    /* ======================= END: templates ======================= */


        function indentifyPerson (config) {
            if (vm.isLoggedIn()) {
                if (config.page != 'personal-info' && config.page != 'home' && config.page != 'dependents' && config.page != 'life-events' && config.page != 'current-coverage') {
                    config.callback();
                    return; 
                }
            }

            /* ============== START: loading token and password for cookies ============== */
            try {
                (storageWrapper.get(['token', 'username', 'timestamp'])).then(function (result) {
                    if (!result.token || !result.username) {
                        logger.debug('No token or username was found in cookies');
                        goToLogin();
                    }
                    var timestamp = new Date().getTime();
                    api.session = {token:result.token, username: result.username, timestamp: timestamp};

                    /* ============== START: loading personal info ============== */
                    (api.fetchPersonalInfo(result.username)).then(function (response) {
                        if (response.success) {
                                if (response.result.action === "reset") {
                                    logger.debug('Reset is required, redirecting to login');
                                    goToLogin();
                                } else {
                                    $.extend(appConfig, response.result.config);
                                    data = response.result;

                                    vm.home.employee_id = response.result.employee_id;
                                    vm.home.enroll_details = response.result.enroll_details;
                                    vm.home.employment_info = response.result.employment_info;
                                    vm.home.sponsor_id = response.result.sponsor_id;
                                    vm.home.division_id = response.result.division_id;

                                    vm.home.beneficiary_files = response.result.beneficiary_files ? response.result.beneficiary_files : '';
                                    vm.home.empbooklet_files = response.result.empbooklet_files ? response.result.empbooklet_files : '';
                                    vm.home.empworkbook_files = response.result.empworkbook_files ? response.result.empworkbook_files : '';
                                    vm.home.empglossary_files = response.result.empglossary_files ? response.result.empglossary_files : '';
                                    vm.home.tutorial_files = response.result.tutorial_files ? response.result.tutorial_files : '';

                                    vm.home.last_step_navigate = response.result.last_step_navigate ? response.result.last_step_navigate : '';
                                    vm.home.emplifeevent = response.result.emplifeevent ? response.result.emplifeevent : '';
                                    vm.home.graceperiod = response.result.emplifeevent ? response.result.emplifeevent.graceperiod : '';
                                    vm.home.emplifeevent_id = response.result.emplifeevent ? response.result.emplifeevent.emplifeevent_id : '';
                                    vm.home.emplifeevent = response.result.emplifeevent;
                                    vm.home.is_smoker_change_request = (response.result.smoker_info.is_smoker_change_request || response.result.smoker_info.is_smoker_scheduled) ? 1 : 0;
									
									vm.home.is_depend_sched_found = response.result.depend_details.is_depend_sched_found;
									vm.home.is_depend_changereq_found = response.result.depend_details.is_depend_changereq_found;
									
                                    vm.mda = response.result.mda ? response.result.mda : 0;
                                    
				    window.location.href.indexOf("register") > -1 ? vm.isLoggedIn(false): vm.isLoggedIn(true);
                                    vm.home.securityQuestions.setPairs(response.result.config.num_security_questions_disp);
                                    vm.header.displayName(data.personal_info.display_name);
                                    vm.home.action(data.action);
									
									vm.username=data.username;
                                    config.callback();
                                }
                        } else {
                            logger.debug('Failed to load personal info with given token');
                            goToLogin();
                        }
                    }, function (response) {
                        logger.debug('Failed to load personal info with given token');
                        goToLogin();
                    });

                    /* ============== END: loading personal info ============== */

                }, function () {
                    logger.debug('Failed to load cookies');
                    goToLogin();
                });

            } catch (e) {
                goToLogin();
            }
            /* ============== END: loading token and password for cookies ============== */
        };

        function getPersonalInfo(config) {
            /* ============== START: loading dependants ============== */
            try {
                (storageWrapper.get(['username'])).then(function (result) {
                    if (!result.username) {
                        logger.debug('No token or username was found in cookies');
                        goToLogin();
                    }
                    (api.fetchPersonalInfo(result.username)).then(function (response) {
                        if (response.success) {
                            config && config.callback && config.callback(response.result);
                        } else {
                            logger.debug('Failed to load personal-info');
                            goToLogin();
                        }
                    }, function (response) {
                        logger.debug('Failed to load personal info with given token');
                        goToLogin();
                    });

                    /* ============== END: loading personal info ============== */

                }, function () {
                    logger.debug('Failed to load cookies');
                    goToLogin();
                });

            } catch (e) {
                goToLogin();
            }
        };

        function getDependents (config) {
            /* ============== START: loading dependants ============== */
            var action = vm.home.action();
            api.fetchDependents(action).then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load dependants');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load dependants');
                goToLogin();
            });
            /* ============== END: loading cost-scenarios ============== */
        };

        function getLifeEvents (config, division_id) {
            var lifeeventID = vm.home.emplifeevent_id;
            api.fetchLifeEvents(division_id, lifeeventID).then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response);
                } else {
                    logger.debug('Failed to load life events');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load life events');
                goToLogin();
            });
        };

        function getFakeDependents (config) {
            /* ============== START: loading fake dependents for local test ============== */
            api.getFakeDependents().then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load dependants');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load dependants');
                goToLogin();
            });
            /* ============== END: loading fake dependents for local test ============== */
        };

        function getBenefits (config) {
            /* ============== START: loading dependants ============== */
            var enrolment = vm.home.getFirstIncompleteEnrolment();
            var empplanId = enrolment && enrolment.empplan_id;
			
            // if(vm.home.action() === 're-enroll'){
            //      empplanId = vm.home.dependents.reenroll_empplan_id;
            // }
            
            api.fetchBenefits(vm.home.action(), empplanId).then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load benefits');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load benefits');
                goToLogin();
            });
            /* ============== END: loading cost-scenarios ============== */
        };

        function getUnusedFlexCredits (config, employeeId, planId, effectiveDate, action) {
            /* ============== START: loading unused flex credits ============== */
            api.fetchUnusedFlexCredits(employeeId, planId, effectiveDate, action).then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load unused flex credits');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load unused flex credits');
                goToLogin();
            });
            /* ============== END: loading unused flex credits ============== */
        };

        function clearUnusedCredits(employeeId, planId, effectiveDate) {
            return api.clearUnUsedFlexCredits(employeeId, planId, effectiveDate).then(function (response) {
                if (response) {
                    logger.debug('Successfully cleared unused credits');
                } else {
                    logger.debug('Failed to clear unused flex credits');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to clear flex credits');
                goToLogin();
            });
        };

        function getCostsScenarios (config) {
            /* ============== START: loading cost-scenarios ============== */
            api.getCostsScenarios().then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load scenarios info with given token');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load scenarios info with given token');
                goToLogin();
            });
            /* ============== END: loading cost-scenarios ============== */
        };


        function getSummary (config, employeeId, planId, effectiveDate, isCompleted, action) {
            /* ============== START: loading summary info ============== */
            api.getSummary(employeeId, planId, effectiveDate, isCompleted, action).then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load summary info with given token');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load summary info with given token');
                goToLogin();
            });
            /* ============== END: loading summary info ============== */
        };

        function getReEnrollSummary (config, employeeId, planId, reenrollPlanId, reenrollEffectiveDate, isCompleted, action) {
            /* ============== START: loading re-enroll summary info ============== */
            api.getReEnrollSummary(employeeId, planId, reenrollPlanId, reenrollEffectiveDate, isCompleted, action).then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load summary info with given token');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load summary info with given token');
                goToLogin();
            });
            /* ============== END: loading re-enroll summary info ============== */
        };

        function getLifeEventsSummary (config, employeeId, planId, isCompleted, action, reenrollPlanId, reenrollEffectiveDate) {
            /* ============== START: loading summary info ============== */
            api.getLifeEventsSummary(employeeId, planId, isCompleted, action, reenrollPlanId, reenrollEffectiveDate).then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load summary info with given token');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load summary info with given token');
                goToLogin();
            });
            /* ============== END: loading summary info ============== */
        };

        function getCoverageHistory (config, employeeId) {
            /* ============== START: loading enrolment type ============== */
            api.getCoverageHistory(employeeId).then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load enrolment type with given token');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load enrolment type with given token');
                goToLogin();
            });
            /* ============== END: loading enrolment type ============== */
        };

        function getCoverage (config) {
            /* ============== START: loading congratulations ============== */
            api.getCoverage().then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load congratulations info with given token');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load congratulations info with given token');
                goToLogin();
            });
            /* ============== END: loading congratulations ============== */
        };

        // function getPersonalInfo(config) {
        //     /* ============== START: loading personal info ============== */
        //     api.getPersonalInfo().then(function (response) {
        //         if (response.success) {
        //             config && config.callback && config.callback(response.result);
        //         } else {
        //             logger.debug('Failed to load personal info with given token');
        //             goToLogin();
        //         }
        //     }, function (response) {
        //         logger.debug('Failed to load personal info with given token');
        //         goToLogin();
        //     });
        //     /* ============== END: loading personal info ============== */
        // };

        function getSecurityQuestions(config) {
            /* ============== START: loading security questions ============== */
            api.getSecurityQuestions().then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response);
                } else {
                    logger.debug('Failed to load security questions with given token');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load security questions with given token');
                goToLogin();
            });
            /* ============== END: loading security questions ============== */
        }

        function getCongratulationsData(config, employeeId, planId, action) {
            api.fetchCongratulationsData(employeeId, planId, action).then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load congratulations with given token');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load congratulations with given token');
                goToLogin();
            });
        }

        function getContacts (config, divisionId) {
            /* ============== START: loading contacts ============== */
            api.getContacts(divisionId).then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response.result);
                } else {
                    logger.debug('Failed to load contacts with given token');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load contacts with given token');
                goToLogin();
            });
            /* ============== END: loading contacts ============== */
        };
		
		function getDocumentation (config, employee_id) {
            /* ============== START: loading documentation ============== */
            api.getDocumentation(employee_id).then(function (response) {
                if (response.success) {
                    config && config.callback && config.callback(response);
                } else {
                    logger.debug('Failed to load contacts with given token');
                    goToLogin();
                }
            }, function (response) {
                logger.debug('Failed to load contacts with given token');
                goToLogin();
            });
            /* ============== END: loading documentation ============== */
        };
		
		function goToLogin() {
            console.log("goToLogin()");
            window.location.replace(appConfig.path + "login.html");
        };

        route = nav.route("*");
        route.subscribe(function() {
            logger.info("Route undefined (404?)");
        });

        nav.init();

        logger.debug("app should now be running and visible");

        function loadContent(name, args) {
            vm.path(name);
        };

        ko.validation.init({ messageTemplate: 'validation-error' });
        ko.applyBindingsWithValidation(vm, $('.container')[0]);
		
		function calculateTotalsLifeEvents(summary) {
		
			var flexc_used_totals = 0;
			var no_nem_flexc_used_totals = 0;
			var i;
			
			for(i=0; i<summary.empselectsummary[0].empselections.length; i++) {				
				flexc_used_totals += summary.empselectsummary[0].empselections[i].billing_flexc_used;
				//Benefit Cost
				if(summary.empselectsummary[0].empselections[i].unapproved_cost_per_month != 0) {					
					no_nem_flexc_used_totals += summary.empselectsummary[0].empselections[i].unapproved_billing_cost_per_month===0.000?summary.empselectsummary[0].empselections[i].billing_flexc_used:summary.empselectsummary[0].empselections[i].unapproved_billing_cost_per_month;					
				} else {
					no_nem_flexc_used_totals += summary.empselectsummary[0].empselections[i].billing_flexc_used;					
				}				
			}
						
			//Benefit Cost
			summary.empselectsummary[0].totals.total_billing_flexc_used = flexc_used_totals;
			summary.empselectsummary[0].totals.total_benefit_cost_not_appr = no_nem_flexc_used_totals;
		
			return summary;		
		}
    });
});
