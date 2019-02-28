const { expect } = require('chai')
const { generateMessage, generateLocationMessage } = require('../utils/message')

describe('generateMessage', () => {
  it('Should generate the correct messsage object', () => {
    const from = 'Mocha'
    const text = 'Some mocha text'
    const message = generateMessage(from, text)

    expect(message.createdAt).to.be.a('number')
    expect(message).to.include({ from, text })
  })

  it('Should generate the correct location messsage object', () => {
    const from = 'Mocha'
    const url = 'https://google.com/maps?q=23,65'
    const message = generateLocationMessage(from, 23, 65)

    expect(message.createdAt).to.be.a('number')
    expect(message).to.include({ from, url })
  })
})