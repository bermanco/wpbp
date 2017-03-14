#!/usr/bin/env node
const fs = require('fs');
const configFilePath = './project-config.json';
const wpConfigFilePath = './public/wp-config.php';

// Check for necessary files before execution
if (!fs.existsSync(configFilePath)){
	throw new Error("You must create a project-config.json file before running the setup script.");
}

if (!fs.existsSync(wpConfigFilePath)){
	throw new Error("A valid wp-config.php file must be present for the setup script to run.");
}

// Set up running system commands using ShellJS (https://github.com/shelljs/shelljs)
const shell = require('shelljs');

// Load config file
const config = require(configFilePath);

// Install Wordpress
shell.exec('wp core download'); // the install directory is set in /wp-cli.yml

// Create wp-content directories
shell.mkdir('-p', ['public/content/themes', 'public/content/plugins', 'public/content/mu-plugins', 'public/content/uploads']);

// Install plugins

// Required plugins are installed and immediately activated
if (config.plugins.required.length > 0){
	config.plugins.required.forEach(function(plugin){
		shell.exec(`wp plugin install ${plugin} --activate`);
	});
}

// Optional plugins are installed but not automatically activated
if (config.plugins.optional.length > 0){
	config.plugins.optional.forEach(function(plugin){
		shell.exec(`wp plugin install ${plugin}`);
	});
}