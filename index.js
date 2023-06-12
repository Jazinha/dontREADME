// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const {renderLicenseBadge, renderLicenseText} = require('./Develop/utils/generateMarkdown');
// TODO: Create an array of questions for user input
const questions = ({title, description, installation, usage, contributing, tests, license, github, email, badge, licenseTxt}) =>
`# ${title} 
${badge}

## Description
${description}
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)
## Installation
${installation}
## Usage
${usage}
## Contributing
${contributing}
## Tests
${tests}
## License
${license}
${licenseTxt}
## Questions
For any additional questions please feel free to contact me at one of the following links below.
-   Github Username:${github}
-   https://github.com/${github}
-   Email:${email}`

// Prompts
inquirer
.prompt ([
    {
        type:'input',
        message: 'Enter your projects title.',
        name: 'title',
    },
    {
        type:'input',
        message: 'Describe your project.',
        name: 'description',
    },
    {
        type:'input',
        message: 'Provide instructions for installation.',
        name: 'installation',
    },
    {
        type:'input',
        message: 'Provide instructions for usage.',
        name: 'usage',
    },
    {
        type:'input',
        message: 'Provide instructions on how developers can contribute.',
        name: 'contributing',
    },
    {
        type:'input',
        message: 'Fill out tests.',
        name: 'tests',
    },
    {
        type:'list',
        message: 'Select a license.',
        name: 'license',
        choices: ['MIT','IBM','ISC','Mozilla'],
    },
    {
        type:'input',
        message: 'Provide your Github username.',
        name: 'github',
    },
    {
        type:'input',
        message: 'Provide your email.',
        name: 'email',
    },
])
.then((data) => {
    data.badge = renderLicenseBadge(data.license),
    data.licenseTxt = renderLicenseText(data.license),
    fs.writeFile('demo-README.md', questions(data), (err) => {
    err ? console.log(err) : console.log('Success!')
    })});