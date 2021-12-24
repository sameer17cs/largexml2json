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
$ cd largexml2json
$ npm install
```

### Options

  - input: ```String```
      - mandatory
      - filepath of input xml

  - output: ```String```
      - mandatory
      - filepath of output json
      - output as json lines

  - tagtoextract: ```String```
      - mandatory
      - name of xml tag/nested-tag to extract as json
      - content of selected tags will be converted to json line
      - nested content are stored in json field ```child```
    
  - limit: ```Number```
      - Optional
      - max output buffer size
      - default: 10
      - For higher limit, pass  --max-old-space-size args to node

### Example

  - largexml2json --input ./test/sample.xml --output ./test/sample.json --tagtoextract book
  - largexml2json --input ./test/sample.xml --output ./test/sample.json --tagtoextract book --limit 100
