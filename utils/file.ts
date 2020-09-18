import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { render, TemplateData } from './template';

export const CURR_DIR = process.cwd();
// special file
const EXTEND_FILE_NAME = '.extends.json'
// list of file/folder that should not be copied
const SKIP_FILES = ['node_modules', '.template.json', EXTEND_FILE_NAME];

export function createProject(projectPath: string) {
    if (fs.existsSync(projectPath)) {
        console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`));
        return false;
    }
    fs.mkdirSync(projectPath);
    
    return true;
}

export function readExtendsJson(templatePath: string, templateData: TemplateData) {
    const extendFilePath = path.join(templatePath, EXTEND_FILE_NAME)
    if (fs.existsSync(extendFilePath)) {
        console.log(chalk.yellow(`${EXTEND_FILE_NAME} exists, copying its data first`));
        const contents: Array<string> = JSON.parse(fs.readFileSync(extendFilePath, 'utf-8'));
        contents.forEach((element: string) => {
            createDirectoryContents(path.join(path.dirname(templatePath), element), templateData);
        });
    }
}

export function createDirectoryContents(templatePath: string, templateData: TemplateData) {
    readExtendsJson(templatePath, templateData);
    const {projectName, projectDescription} = templateData;

    // read all files/folders (1 level) from template folder
    const filesToCreate = fs.readdirSync(templatePath);
    // loop each file/folder
    filesToCreate.forEach(file => {
        const origFilePath = path.join(templatePath, file);
        
        // get stats about the current file
        const stats = fs.statSync(origFilePath);
    
        // skip files that should not be copied
        if (SKIP_FILES.indexOf(file) > -1) return;
        
        if (stats.isFile()) {
            // read file content and transform it using template engine
            let contents: string = fs.readFileSync(origFilePath, 'utf8');
            contents = render(contents, { projectName, projectDescription });
            // write file to destination folder
            const writePath: string = path.join(CURR_DIR, projectName, file);
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            // create folder in destination folder
            fs.mkdirSync(path.join(CURR_DIR, projectName, file));
            // copy files/folder inside current folder recursively
            const tData: TemplateData = {
                projectDescription,
                projectName: path.join(projectName, file)
            };
            createDirectoryContents(path.join(templatePath, file), tData);
        }
    });
}