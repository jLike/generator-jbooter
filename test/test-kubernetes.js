/* global describe, beforeEach, it*/


const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');

const expectedFiles = {
    eurekaregistry: [
        'registry/jbooter-registry.yml',
        'registry/application-configmap.yml'
    ],
    consulregistry: [
        'registry/consul.yml',
        'registry/consul-config-loader.yml',
        'registry/application-configmap.yml'
    ],
    jhgate: [
        'jhgate/jhgate-deployment.yml',
        'jhgate/jhgate-mysql.yml',
        'jhgate/jhgate-service.yml'
    ],
    msmysql: [
        'msmysql/msmysql-deployment.yml',
        'msmysql/msmysql-mysql.yml',
        'msmysql/msmysql-service.yml'
    ],
    mspsql: [
        'mspsql/mspsql-deployment.yml',
        'mspsql/mspsql-postgresql.yml',
        'mspsql/mspsql-service.yml',
        'mspsql/mspsql-elasticsearch.yml'
    ],
    msmongodb: [
        'msmongodb/msmongodb-deployment.yml',
        'msmongodb/msmongodb-mongodb.yml',
        'msmongodb/msmongodb-service.yml'
    ],
    msmariadb: [
        'msmariadb/msmariadb-deployment.yml',
        'msmariadb/msmariadb-mariadb.yml',
        'msmariadb/msmariadb-service.yml'
    ],
    monolith: [
        'samplemysql/samplemysql-deployment.yml',
        'samplemysql/samplemysql-mysql.yml',
        'samplemysql/samplemysql-service.yml',
        'samplemysql/samplemysql-elasticsearch.yml'
    ],
    kafka: [
        'samplekafka/samplekafka-deployment.yml',
        'samplekafka/samplekafka-mysql.yml',
        'samplekafka/samplekafka-service.yml',
        'samplekafka/samplekafka-kafka.yml'
    ],
};

describe('JBooter Kubernetes Sub Generator', () => {
    describe('only gateway', () => {
        beforeEach((done) => {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({ skipChecks: true })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    chosenApps: [
                        '01-gateway'
                    ],
                    adminPassword: 'meetup',
                    dockerRepositoryName: 'jbooterrepository',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'jbooternamespace'
                })
                .on('end', done);
        });
        it('creates expected registry files and content', () => {
            assert.file(expectedFiles.eurekaregistry);
            assert.fileContent('registry/jbooter-registry.yml', /# base64 encoded "meetup"/);
        });
        it('creates expected gateway files and content', () => {
            assert.file(expectedFiles.jhgate);
            assert.fileContent('jhgate/jhgate-deployment.yml', /image: jbooterrepository\/jhgate/);
            assert.fileContent('jhgate/jhgate-deployment.yml', /jbooternamespace.svc.cluster/);
        });
    });

    describe('gateway and mysql microservice', () => {
        beforeEach((done) => {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({ skipChecks: true })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    chosenApps: [
                        '01-gateway',
                        '02-mysql'
                    ],
                    dockerRepositoryName: 'jbooter',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'default'
                })
                .on('end', done);
        });
        it('creates expected registry files', () => {
            assert.file(expectedFiles.eurekaregistry);
        });
        it('creates expected gateway files', () => {
            assert.file(expectedFiles.jhgate);
        });
        it('creates expected mysql files', () => {
            assert.file(expectedFiles.msmysql);
        });
    });

    describe('MySQL and PostgreSQL microservices without gateway', () => {
        beforeEach((done) => {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({ skipChecks: true })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    chosenApps: [
                        '02-mysql',
                        '03-psql'
                    ],
                    dockerRepositoryName: 'jbooter',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'default'
                })
                .on('end', done);
        });
        it('creates expected registry files', () => {
            assert.file(expectedFiles.eurekaregistry);
        });
        it('doesn\'t creates gateway files', () => {
            assert.noFile(expectedFiles.jhgate);
        });
        it('creates expected mysql files', () => {
            assert.file(expectedFiles.msmysql);
        });
        it('creates expected psql files', () => {
            assert.file(expectedFiles.mspsql);
        });
    });

    describe('gateway, mysql, psql, mongodb, mariadb microservices', () => {
        beforeEach((done) => {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({ skipChecks: true })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    chosenApps: [
                        '01-gateway',
                        '02-mysql',
                        '03-psql',
                        '04-mongo',
                        '07-mariadb'
                    ],
                    dockerRepositoryName: 'jbooter',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'default'
                })
                .on('end', done);
        });
        it('creates expected registry files', () => {
            assert.file(expectedFiles.eurekaregistry);
        });
        it('creates expected gateway files', () => {
            assert.file(expectedFiles.jhgate);
        });
        it('creates expected mysql files', () => {
            assert.file(expectedFiles.msmysql);
        });
        it('creates expected psql files', () => {
            assert.file(expectedFiles.mspsql);
        });
        it('creates expected mongodb files', () => {
            assert.file(expectedFiles.msmongodb);
        });
        it('creates expected mariadb files', () => {
            assert.file(expectedFiles.msmariadb);
        });
    });

    describe('monolith application', () => {
        beforeEach((done) => {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({ skipChecks: true })
                .withPrompts({
                    composeApplicationType: 'monolith',
                    directoryPath: './',
                    chosenApps: [
                        '08-monolith'
                    ],
                    dockerRepositoryName: 'jbooter',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'default'
                })
                .on('end', done);
        });
        it('doesn\'t creates registry files', () => {
            assert.noFile(expectedFiles.eurekaregistry);
        });
        it('creates expected default files', () => {
            assert.file(expectedFiles.monolith);
        });
    });

    describe('Kafka application', () => {
        beforeEach((done) => {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({ skipChecks: true })
                .withPrompts({
                    composeApplicationType: 'monolith',
                    directoryPath: './',
                    chosenApps: [
                        '09-kafka'
                    ],
                    dockerRepositoryName: 'jbooter',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'default'
                })
                .on('end', done);
        });
        it('doesn\'t creates registry files', () => {
            assert.noFile(expectedFiles.eurekaregistry);
        });
        it('creates expected default files', () => {
            assert.file(expectedFiles.kafka);
        });
    });
});
