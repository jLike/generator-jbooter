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
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
<%_ if (websocket === 'spring-websocket') { _%>
import { <%=jbtPrefixCapitalized%>TrackerService } from './../shared/tracker/tracker.service';
<%_ } _%>

import { <%=angular2AppName%>SharedModule } from '../shared';
/* jbooter-needle-add-admin-module-import - JBooter will add admin modules imports here */

import {
    adminState,
    <%_ if (devDatabaseType !== 'cassandra') { _%>
    AuditsComponent,
    <%_ } _%>
    <%_ if (!skipUserManagement) { _%>
    UserMgmtComponent,
    UserDialogComponent,
    UserDeleteDialogComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    <%_ } _%>
    LogsComponent,
    <%=jbtPrefixCapitalized%>MetricsMonitoringModalComponent,
    <%=jbtPrefixCapitalized%>MetricsMonitoringComponent,
    <%=jbtPrefixCapitalized%>HealthModalComponent,
    <%=jbtPrefixCapitalized%>HealthCheckComponent,
    <%=jbtPrefixCapitalized%>ConfigurationComponent,
    <%=jbtPrefixCapitalized%>DocsComponent,
    <%_ if (devDatabaseType !== 'cassandra') { _%>
    AuditsService,
    <%_ } _%>
    <%=jbtPrefixCapitalized%>ConfigurationService,
    <%=jbtPrefixCapitalized%>HealthService,
    <%=jbtPrefixCapitalized%>MetricsService,
    <%_ if (applicationType === 'gateway') { _%>
    GatewayRoutesService,
    <%=jbtPrefixCapitalized%>GatewayComponent,
    <%_ } _%>
    <%_ if (websocket === 'spring-websocket') { _%>
    <%=jbtPrefixCapitalized%>TrackerComponent,
    <%_ } _%>
    LogsService,
    <%_ if (!skipUserManagement) { _%>
    UserResolvePagingParams,
    UserResolve,
    UserModalService
    <%_ } _%>
} from './';

@NgModule({
    imports: [
        <%=angular2AppName%>SharedModule,
        RouterModule.forRoot(adminState, { useHash: true }),
        /* jbooter-needle-add-admin-module - JBooter will add admin modules here */
    ],
    declarations: [
        <%_ if (devDatabaseType !== 'cassandra') { _%>
        AuditsComponent,
        <%_ } _%>
        <%_ if (!skipUserManagement) { _%>
        UserMgmtComponent,
        UserDialogComponent,
        UserDeleteDialogComponent,
        UserMgmtDetailComponent,
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        <%_ } _%>
        LogsComponent,
        <%=jbtPrefixCapitalized%>ConfigurationComponent,
        <%=jbtPrefixCapitalized%>HealthCheckComponent,
        <%=jbtPrefixCapitalized%>HealthModalComponent,
        <%=jbtPrefixCapitalized%>DocsComponent,
        <%_ if (applicationType === 'gateway') { _%>
        <%=jbtPrefixCapitalized%>GatewayComponent,
        <%_ } _%>
        <%_ if (websocket === 'spring-websocket') { _%>
        <%=jbtPrefixCapitalized%>TrackerComponent,
        <%_ } _%>
        <%=jbtPrefixCapitalized%>MetricsMonitoringComponent,
        <%=jbtPrefixCapitalized%>MetricsMonitoringModalComponent
    ],
    entryComponents: [
        <%_ if (!skipUserManagement) { _%>
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        <%_ } _%>
        <%=jbtPrefixCapitalized%>HealthModalComponent,
        <%=jbtPrefixCapitalized%>MetricsMonitoringModalComponent,
    ],
    providers: [
        <%_ if (devDatabaseType !== 'cassandra') { _%>
        AuditsService,
        <%_ } _%>
        <%=jbtPrefixCapitalized%>ConfigurationService,
        <%=jbtPrefixCapitalized%>HealthService,
        <%=jbtPrefixCapitalized%>MetricsService,
        <%_ if (applicationType === 'gateway') { _%>
        GatewayRoutesService,
        <%_ } _%>
        LogsService,
        <%_ if (websocket === 'spring-websocket') { _%>
        <%=jbtPrefixCapitalized%>TrackerService,
        <%_ } _%>
        <%_ if (!skipUserManagement) { _%>
        UserResolvePagingParams,
        UserResolve,
        UserModalService
        <%_ } _%>
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class <%=angular2AppName%>AdminModule {}
