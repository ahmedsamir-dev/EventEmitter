import { Event, EventListener, WarnedEvent } from './common/types'
import * as constants from './common/constants'

export default class EventEmitter {
    private events: Event[] = []
    private warnedEvents: WarnedEvent = new Map<string, boolean>()
    private maxListeners = constants.DEFAULT_MAX_LISTENERS

    on(eventName: string, eventListener: EventListener) {
        return this._addListener(eventName, eventListener)
    }

    once(eventName: string, eventListener: EventListener) {
        const wrapperListener: EventListener = (...args: any[]) => {
            eventListener(...args)
            this.removeListener(eventName, wrapperListener)
        }
    
        return this._addListener(eventName, wrapperListener)
    }

    off(eventName: string, eventListener: EventListener) {
        return this.removeListener(eventName, eventListener)
    }

    addListener(eventName: string, eventListener: EventListener) {
        return this._addListener(eventName, eventListener)
    }

    prependListener(eventName: string, eventListener: EventListener) {
        return this._addListener(eventName, eventListener, true)
    }

    emit(eventName: string, ...args: any) {
        const event = this.findEventByName(eventName)

        if (!event) return false

        event?.listeners.forEach((eventListener: EventListener) => eventListener(args))
        return true
    }

    removeListener(eventName: string, eventListener: EventListener) {
        const event = this.findEventByName(eventName)

        if (event) {
            const listenersLength = event.listeners.length
            for (let index = listenersLength - 1; index >= 0; index--){
                if (eventListener.toString() == event.listeners[index].toString()){
                    event.listeners.splice(index, 1)
                    break;
                }
            }
        }

        return this
    }

    removeAllListeners(eventName: string) {
        const event = this.findEventByName(eventName)
        
        const listeners = event?.listeners
        listeners?.splice(0, listeners.length)

        return this
    }

    eventNames() {
        return this.events.map((event) => event.name)
    }

    listeners(eventName: string) {
        const event = this.findEventByName(eventName) 
        return event?.listeners
    }

    listenerCount(eventName: string, eventListener?: EventListener): number {
        const event = this.findEventByName(eventName) 

        if (event) {
            if (eventListener)
                return event.listeners.filter((listener: EventListener) => {                    
                    return listener.toString() == eventListener.toString()
                }).length
            else return event.listeners.length
        }
        
        return 0
    }

    getMaxListeners() {
        return this.maxListeners
    }

    setMaxListeners(maxNumber: number) {
        this.maxListeners = maxNumber

        return this
    }

    private _addListener(eventName: string, eventListener: EventListener, prepend = false) {
        const event = this.findEventByName(eventName)        

        if(event){
            prepend ? event.listeners.unshift(eventListener) : event.listeners.push(eventListener)

            const eventListenerCount = this.listenerCount(eventName)

            if (this.isMaxListenerExceded(eventListenerCount))
                this.showMaxListenerWarning(eventName, eventListenerCount)       
        }    

        else this.events.push({
            name: eventName,
            listeners: [eventListener]
        })

        return this
    }

    private findEventByName(eventName: string) {
        const event = this.events.find((event: Event) => {
            return event.name == eventName
        })  

        return event
    }

    private isMaxListenerExceded (eventListenerCount: number) {
        if ([0, Infinity].includes(this.getMaxListeners())) 
            return false
        return eventListenerCount > this.getMaxListeners()
    }

    private showMaxListenerWarning(eventName: string, eventListenerCount: number) {
        if (!this.warnedEvents.get(eventName)) {

            const errorMessage = constants.MEMORY_LEAK_WARNING_MESSAGE(eventListenerCount, eventName, this.constructor.name)
            process.emitWarning(errorMessage, {
                type: 'warning',
                code: 'MaxListenersExceededWarning',
            })

            this.warnedEvents.set(eventName, true)
        }
    }
}