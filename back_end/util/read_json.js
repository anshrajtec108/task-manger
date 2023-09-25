const path=require('path')
const fs=require('fs')
const id_tempFilePath = path.join(__dirname, '/temp_values.json');
function read_json() {
    try {
      const data = fs.readFileSync(id_tempFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading id_temp.json:', error);
      return null;
    }
  }

module.exports=read_json;