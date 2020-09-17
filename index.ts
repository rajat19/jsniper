#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import * as fileHelper from './utils/file';

export interface CliOptions {
    projectName: string
    templateName: string
    templatePath: string
    targetPath: string
}

const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
const QUESTIONS = [
{
    name: 'template',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES
},
{
    name: 'name',
    type: 'input',
    message: 'Project name:'
}];

inquirer.prompt(QUESTIONS)
.then(answers => {
    const projectChoice = answers['template'];
    const projectName = answers['name'];
    const templatePath = path.join(__dirname, 'templates', projectChoice);
    const targetPath = path.join(fileHelper.CURR_DIR, projectName);
    const options: CliOptions = {
        projectName,
        templateName: projectChoice,
        templatePath,
        targetPath
    }

    console.log(options);

    if (!fileHelper.createProject(targetPath)) {
        return;
    }

    fileHelper.createDirectoryContents(templatePath, projectName);
});