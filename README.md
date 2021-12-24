# largexml2json

## Description
Command line utility to convert large xml to json line output.
  - command line tool
  - Feature to extract nested xml tags as json
  - https://www.npmjs.com/package/largexml2json
  - https://github.com/sameer17cs/largexml2json


### Installation

Requires [Node.js](https://nodejs.org/) to run.

```sh
$ npm install largexml2json
$ npm install largexml2json -g
```

### Use it as command line
```sh
$ cd /path/to/library
$ npm link
```

#### Building for source
For production release:
```sh
$ git clone https://github.com/sameer17cs/largexml2json
$ cd mongo-to-elastic-dump
$ npm install
```

### Options

  - input: ```String```
      - filepath of input xml
      - mandatory

  - output: ```String```
      - filepath of output json
      - output as json lines
      - mandatory

  - tagtoextract: ```String```
      - name of xml tag/nested-tag to extract as json
      - content of selected tags will be converted to json line
      - nested content are stored in json field ```child```
    
  - limit: ```Number```
      - max output buffer size
      - default: 10
      - For higher limit, pass  --max-old-space-size args to node

### Example

largexml2json --input ./test/sample.xml --output ./test/sample.json --tagtoextract book --limit 2
