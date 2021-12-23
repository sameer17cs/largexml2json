
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
    console.log('deleteing exisiting');
    fs.unlinkSync(output_file);
  }
  parse();
}

function parse() {
  const xml = fs.createReadStream(xml_file_path);
  var xmlStream = new XmlStream(xml);
  xmlStream.on(`endElement ${xml_tag_to_extract}`, function (element) {
    element = element['$'];
    buffer.push(JSON.stringify(element));
    if (buffer.length >=  flags.get('limit')) {
      flush();
    }
    completed = completed + 1;
  });
  xmlStream.on('end', function () {
    flush();
    process.exit(0);
  });
}

function flush() {
  fs.appendFileSync(output_file, buffer.join('\n') + "\n", 'utf-8');
  buffer = [];
  console.info(`Done writing ${completed} records`);
  return;
}

main();
