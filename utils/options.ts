import * as fs from 'fs';
import * as path from 'path';

export interface CliOptions {
    projectName: string
    projectDescription: string
    projectGitUrl: string
    projectAuthor: string
    templateName: string
    templatePath: string
    targetPath: string
}

const CHOICES = fs.readdirSync(path.join(__dirname, '../templates'));

export const QUESTIONS = [
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
}, 
{
    name: 'description',
    type: 'input',
    message: 'Project Description'
},
{
    name: 'repository',
    type: 'input',
    message: 'Git Repository'
},
{
    name: 'author',
    type: 'input',
    message: 'Author'
}];