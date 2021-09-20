require('@sapphire/plugin-logger/register');
require('@sapphire/plugin-api/register');
require('@sapphire/plugin-editable-commands');
const { options: coloretteOptions } = require('colorette');
const { inspect } = require('util');

inspect.defaultOptions.depth = 1;

coloretteOptions.enabled = true;
