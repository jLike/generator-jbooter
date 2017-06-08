#!/usr/bin/env node


const semver = require('semver');
const packageJson = require('../package.json');
const logger = require('./utils').logger;

const currentNodeVersion = process.versions.node;
const minimumNodeVersion = packageJson.engines.node;

if (!semver.satisfies(currentNodeVersion, minimumNodeVersion)) {
    /* eslint-disable no-console */
    logger.error(`You are running Node version ${currentNodeVersion
    }\nJBooter requires Node version ${minimumNodeVersion
    }\nPlease update your version of Node.`);
    /* eslint-enable  */
    process.exit(1);
}
require('./cli');
