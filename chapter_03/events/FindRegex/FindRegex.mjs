import { EventEmitter } from 'events'
import { readFile } from 'fs'

export default class FindRegex extends EventEmitter {
  constructor (regex) {
    super()
    this.regex = regex
    this.files = []
  }

  addFile (file) {
    this.files.push(file)
    return this
  }

  find () {
    for (const file of this.files) {
      readFile(file, 'utf-8', (error, content) => {
        if (error) return this.emit('error', error)

        this.emit('readFile', file)

        const match = content.match(this.regex)
        match.forEach(element => this.emit('found', { element, file }))
      })
    }
    return this
  }
}
