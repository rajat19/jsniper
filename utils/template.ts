import * as ejs from 'ejs';
export interface TemplateData {
    projectName: string
    projectDescription: string
    projectGitUrl: string
    projectAuthor: string
    gitUsername: string
}
export function render(content: string, data: TemplateData) {
    return ejs.render(content, data);
}