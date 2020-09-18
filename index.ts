#!/usr/bin/env node

import * as path from 'path';
import * as inquirer from 'inquirer';
import { CURR_DIR, createDirectoryContents, createProject } from './utils/file';
import { QUESTIONS, CliOptions } from './utils/options';
import { TemplateData } from './utils/template';

inquirer.prompt(QUESTIONS)
.then(answers => {
    const projectChoice = answers['template'];
    const projectName = answers['name'];
    const projectDescription = answers['description'];
    const projectGitUrl = answers['repository'];
    const projectAuthor = answers['author'];
    const templatePath = path.join(__dirname, 'templates', projectChoice);
    const targetPath = path.join(CURR_DIR, projectName);
    const options: CliOptions = {
        projectName,
        projectDescription,
        projectGitUrl,
        projectAuthor,
        templateName: projectChoice,
        templatePath,
        targetPath
    }

    console.log(options);

    if (!createProject(targetPath)) {
        return;
    }

    const templateData: TemplateData = {projectName, projectDescription, projectGitUrl, projectAuthor};
    createDirectoryContents(templatePath, templateData);
});