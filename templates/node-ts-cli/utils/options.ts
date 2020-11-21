export interface CliOptions {
	option1: string
	option2: string
};

const CHOICES = [
	'a', 'b', 'c', 'd'
]

export const QUESTIONS = [
	{
		name: 'question1',
		type: 'input',
		message: 'question1'
	},
	{
		name: 'question2',
		type: 'list',
		message: 'question2',
		choices: CHOICES
	}
];