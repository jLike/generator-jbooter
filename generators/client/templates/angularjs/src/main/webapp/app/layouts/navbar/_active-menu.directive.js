<%#
 Copyright 2013-2017 the original author or authors from the JBooter project.

 This file is part of the JBooter project, see https://jbooter.github.io/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .directive('activeMenu', activeMenu);

    activeMenu.$inject = ['$translate', '$locale', 'tmhDynamicLocale'];

    function activeMenu($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            var language = attrs.activeMenu;

            scope.$watch(function() {
                return $translate.use();
            }, function(selectedLanguage) {
                if (language === selectedLanguage) {
                    tmhDynamicLocale.set(language);
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
        }
    }
})();
