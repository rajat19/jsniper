#!/usr/bin/env node

import * as inquirer from 'inquirer';
import { QUESTIONS, CliOptions } from './utils/options';

inquirer.prompt(QUESTIONS)
.then(answers => {
    const option1 = answers['question1'];
    const option2 = answers['question2'];
    const options: CliOptions = {
        option1,
        option2
    }

    console.log(options);
});