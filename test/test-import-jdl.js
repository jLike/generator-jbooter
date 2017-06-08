/* global describe, beforeEach, it*/


const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');

describe('JBooter generator import jdl', () => {
    describe('imports a JDL model from single file', () => {
        beforeEach((done) => {
            helpers.run(require.resolve('../generators/import-jdl'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/import-jdl'), dir);
                })
                .withArguments(['jdl.jdl'])
                .on('end', done);
        });

        it('creates entity json files', () => {
            assert.file([
                '.jbooter/Department.json',
                '.jbooter/JobHistory.json',
                '.jbooter/Job.json',
                '.jbooter/Employee.json',
                '.jbooter/Location.json',
                '.jbooter/Task.json',
                '.jbooter/Country.json',
                '.jbooter/Region.json'
            ]);
        });
    });

    describe('imports a JDL model from multiple files', () => {
        beforeEach((done) => {
            helpers.run(require.resolve('../generators/import-jdl'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/import-jdl'), dir);
                })
                .withArguments(['jdl.jdl', 'jdl2.jdl', 'jdl-ambiguous.jdl'])
                .on('end', done);
        });

        it('creates entity json files', () => {
            assert.file([
                '.jbooter/Department.json',
                '.jbooter/JobHistory.json',
                '.jbooter/Job.json',
                '.jbooter/Employee.json',
                '.jbooter/Location.json',
                '.jbooter/Task.json',
                '.jbooter/Country.json',
                '.jbooter/Region.json',
                '.jbooter/DepartmentAlt.json',
                '.jbooter/JobHistoryAlt.json',
                '.jbooter/Listing.json',
                '.jbooter/Profile.json',
                '.jbooter/WishList.json'

            ]);
        });
    });
});
