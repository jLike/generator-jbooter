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
        .controller('<%=jbtPrefixCapitalized%>HealthCheckController', <%=jbtPrefixCapitalized%>HealthCheckController);

    <%=jbtPrefixCapitalized%>HealthCheckController.$inject = ['<%=jbtPrefixCapitalized%>HealthService', '$uibModal'];

    function <%=jbtPrefixCapitalized%>HealthCheckController (<%=jbtPrefixCapitalized%>HealthService, $uibModal) {
        var vm = this;

        vm.updatingHealth = true;
        vm.getLabelClass = getLabelClass;
        vm.refresh = refresh;
        vm.showHealth = showHealth;
        vm.baseName = <%=jbtPrefixCapitalized%>HealthService.getBaseName;
        vm.subSystemName = <%=jbtPrefixCapitalized%>HealthService.getSubSystemName;

        vm.refresh();

        function getLabelClass (statusState) {
            if (statusState === 'UP') {
                return 'label-success';
            } else {
                return 'label-danger';
            }
        }

        function refresh () {
            vm.updatingHealth = true;
            <%=jbtPrefixCapitalized%>HealthService.checkHealth().then(function (response) {
                vm.healthData = <%=jbtPrefixCapitalized%>HealthService.transformHealthData(response);
                vm.updatingHealth = false;
            }, function (response) {
                vm.healthData =  <%=jbtPrefixCapitalized%>HealthService.transformHealthData(response.data);
                vm.updatingHealth = false;
            });
        }

        function showHealth (health) {
            $uibModal.open({
                templateUrl: 'app/admin/health/health.modal.html',
                controller: 'HealthModalController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    currentHealth: function() {
                        return health;
                    },
                    baseName: function() {
                        return vm.baseName;
                    },
                    subSystemName: function() {
                        return vm.subSystemName;
                    }

                }
            });
        }

    }
})();
