![License](https://img.shields.io/npm/l/jsniper?style=for-the-badge)
![Language](https://img.shields.io/github/languages/top/rajat19/jsniper?style=for-the-badge)
![Dependencies](https://img.shields.io/david/rajat19/jsniper?style=for-the-badge)
![Bundle Size](https://img.shields.io/bundlephobia/min/jsniper?label=BUNDLE%20SIZE&style=for-the-badge)
![PR](https://img.shields.io/github/issues-pr/rajat19/jsniper?style=for-the-badge)
![Release](https://img.shields.io/github/v/release/rajat19/jsniper?style=for-the-badge)
![Node](https://img.shields.io/node/v/jsniper?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/rajat19/jsniper?style=for-the-badge)

# jsniper
basic templating script to start your coding with typescript/javascript
You can add your own templates or can extend another templates inside your template

## Install
There are two ways to install the cli (Do any one)

- From npm registry
```bash
npm install -g jsniper
jsniper
```

- From github registry
```bash
npm install -g @rajat19/jsniper
jsniper
```

## How to run this project (if you want to code)
- Create a new template in `templates` folder or use already existing ones
- Then run following commands 
```bash
npm run build && npm link
jsniper
```

## Extending templates
A template can extend some other template as well
You need to create a file `.extends.json` which just contains array with names of templates that needs to be copied from
Check [.extends.json](templates/node-gql-mongo/.extends.json)

This just contains
```json
[
    "node-basic"
]
```


## Publish
This package uses github actions to publish to both npm as well as github registries
Check `.github/workflows/npm-publish.yml` file for more details


## Contributing
You can contribute by adding new templates in templates folder