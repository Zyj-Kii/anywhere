const fs = require('fs')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const path = require('path')
const config = require('../config/default')
const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const tpl = Handlebars.compile(source.toString())
module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)

    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('ContentType', 'text/plain')
      fs.createReadStream(filePath).pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      res.setHeader('ContentType', 'text/html')
      res.statusCode = 200
      const data = {
        files,
        dir: path.relative(config.root, filePath),
        title: path.basename(filePath)
      }
      res.end(tpl(data))
    }
  } catch (err) {
    res.statusCode = 404
    res.setHeader('ContentType', 'text/plain')
    console.info(err)
    res.end(`${filePath} is not a director or file`)
  }
}
