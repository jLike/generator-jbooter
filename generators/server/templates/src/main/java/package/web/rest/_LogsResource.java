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
package <%=packageName%>.web.rest;

import <%=packageName%>.web.rest.vm.LoggerVM;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import com.codahale.metrics.annotation.Timed;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for view and managing Log Level at runtime.
 */
@RestController
@RequestMapping("/management")
public class LogsResource {

    @GetMapping("/logs")
    @Timed
    public List<LoggerVM> getList() {
        LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
        return context.getLoggerList()
            .stream()
            .map(LoggerVM::new)
            .collect(Collectors.toList());
    }

    @PutMapping("/logs")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Timed
    public void changeLevel(@RequestBody LoggerVM jsonLogger) {
        LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
        context.getLogger(jsonLogger.getName()).setLevel(Level.valueOf(jsonLogger.getLevel()));
    }
}
