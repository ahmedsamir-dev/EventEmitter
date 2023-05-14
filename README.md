# Node.js EventEmitter

This project is an implementation of the Node.js EventEmitter using Node.js and TypeScript.

The EventEmitter class provides a simple way to emit and listen for events within your application. It allows you to create custom events and register event listeners to handle those events.
## Installation

To use this project in your Node.js application, you can follow these steps: 
1. Clone the repository:

```bash

git clone https://github.com/ahmedsamir-dev/EventEmitter.git
``` 
2. Navigate to the project directory:

```bash

cd EventEmitter
``` 
3. Install the dependencies:

```

npm install
```
## Usage

You can use the EventEmitter class by importing it into your code:

```typescript

import EventEmitter from './src/events';

// Create an instance of EventEmitter
const emitter = new EventEmitter();

// Register an event listener
emitter.on('eventName', (arg1, arg2) => {
  // Handle the event
});

// Emit an event
emitter.emit('eventName', arg1, arg2);
```


### API

The EventEmitter class provides the following methods: 
- `on(eventName, eventListener)`: Adds an event listener for the specified event. 
- `once(eventName, eventListener)`: Adds a one-time event listener that will be automatically removed after being called once. 
- `off(eventName, eventListener)`: Removes an event listener. 
- `addListener(eventName, eventListener)`: Adds an event listener for the specified event. 
- `prependListener(eventName, eventListener)`: Adds an event listener to the beginning of the listeners array for the specified event. 
- `emit(eventName, ...args)`: Emits the specified event, triggering all registered event listeners. 
- `removeListener(eventName, eventListener)`: Removes an event listener. 
- `removeAllListeners(eventName)`: Removes all event listeners for the specified event. 
- `eventNames()`: Returns an array of event names for which listeners have been registered. 
- `listeners(eventName)`: Returns an array of event listeners for the specified event. 
- `listenerCount(eventName, eventListener)`: Returns the number of listeners for the specified event. 
- `getMaxListeners()`: Returns the maximum number of listeners that can be registered for an event. 
- `setMaxListeners(maxNumber)`: Sets the maximum number of listeners that can be registered for an event.
## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/ahmedsamir-dev/EventEmitter) .

When contributing, please ensure that you follow the existing code style and write unit tests for any new functionality.
## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) . You can find more details in the [LICENSE](https://chat.openai.com/LICENSE)  file.
## Credits

This project was created by [Ahmed Samir]. You can find the original repository [here](https://github.com/ahmedsamir-dev/EventEmitter) .

If you have any questions or need further assistance, feel free to contact me at [[ahmedsamirwarda22@gmail.com](ahmedsamirwarda22@gmail.com) ].

Thank you for using the Node.js EventEmitter implementation!
