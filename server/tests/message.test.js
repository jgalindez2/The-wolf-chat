const { expect } = require('chai')
const { generateMessage } = require('../utils/message')

describe('generateMessage', () => {
  it('Should generate the correct messsage object', () => {
    const from = 'Mocha'
    const text = 'Some mocha text'
    const message = generateMessage(from, text)

    expect(message.createdAt).to.be.a('number')
    expect(message).to.include({ from, text })
  })
})