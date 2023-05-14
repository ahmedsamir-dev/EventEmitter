import EventEmitter from './src/events'
import process from 'node:process'

class Gconsole extends EventEmitter {}

const eventEmitter = new Gconsole()

eventEmitter.setMaxListeners(5)

process.on('warning', (warning) => {
    console.warn(warning.stack);
});


const initFirstListener = () => console.log('init event listener 1')

for (let i = 0; i < 7; i++)  
    eventEmitter.on('init', initFirstListener)

const initSecondListener = () => console.log('init event listener 2')
eventEmitter.prependListener('init', initSecondListener)

const connectFirstListener = (connection: string) => console.log(`connect event listener ${connection}`)
eventEmitter.on('connect', connectFirstListener)

eventEmitter.emit('init')
console.log(eventEmitter.emit('connect', 'connection success'))
