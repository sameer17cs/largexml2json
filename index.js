/*
  Author: Sameer Deshmukh
  Description: Utility to convert large xml to json line
*/

const fs = require('fs');
const XmlStream = require('xml-stream');
const flags = require('flags');
flags.defineString('input', 'test.xml', 'name of input xml file');
flags.defineString('output', 'test.json', 'name of output json file');
flags.defineString('tagtoextract', '', 'name of xml tag/subtag to extract as json');
flags.defineNumber('limit', 10, 'max buffer size limit');
flags.parse();

const xml_file_path = flags.get('input');
const output_file = flags.get('output');
const xml_tag_to_extract = flags.get('tagtoextract');
let completed = 0;
let buffer = [];

function main() {
  if (!fs.existsSync(xml_file_path)) {
    console.warn('Input file not found');
    process.exit(1);
  }
  if (!xml_tag_to_extract) {
    console.warn('Specify xml tag to extract as json. If nothing, specify root xml tag');
    process.exit(1);
  }
  if (fs.existsSync(output_file)) {
    fs.unlinkSync(output_file);
  }
  parse();
}

function parse() {
  const xml = fs.createReadStream(xml_file_path);
  var xmlStream = new XmlStream(xml);
  xmlStream.on(`endElement ${xml_tag_to_extract}`, function (element) {
    buffer.push(JSON.stringify(parseOneXml(element)));
    if (buffer.length >=  flags.get('limit')) {
      flush();
    }
    completed = completed + 1;
  });
  xmlStream.on('end', function () {
    flush();
    console.info('Done !!!')
    process.exit(0);
  });
}

function flush() {
  fs.appendFileSync(output_file, buffer.join('\n') + "\n", 'utf-8');
  buffer = [];
  console.info(`Completed ${completed} records`);
  return;
}

function parseOneXml(element) {
  const newelement = {};

  //If root xml tag has attributes, add it to json root 
  if (element['$']) {
    for (attr in element['$']) {
      newelement[attr] = element['$'][attr]
    }
  }

  //delete attribute keys
  delete element['$'];

  //add rest of tags as child
  newelement['child'] = element;
  
  return newelement;
}

main();
