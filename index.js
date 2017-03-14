#!/usr/bin/env node
var configFilePath = 'project-config.json';

// Set up running system commands using ShellJS (https://github.com/shelljs/shelljs)
var shell = require('shelljs');

// Load config file
var fs = require('fs');
var configFile = fs.readFileSync(configFilePath, 'utf8');
var config = JSON.parse(configFile);

// Install Wordpress
shell.exec('wp core download'); // the install directory is set in /wp-cli.yml

// Create wp-content directories
shell.mkdir('-p', ['public/content/themes', 'public/content/plugins', 'public/content/mu-plugins', 'public/content/uploads']);

// Install plugins

// Required plugins are installed and immediately activated
if (config.plugins.required.length > 0){
	config.plugins.required.forEach(function(plugin){
		shell.exec('wp plugin install ' + plugin + ' --activate');
	});

}

// Optional plugins are installed but not automatically activated
if (config.plugins.optional.length > 0){
	config.plugins.optional.forEach(function(plugin){
		shell.exec('wp plugin install ' + plugin);
	});

}