export const DEFAULT_MAX_LISTENERS = 10

export const MEMORY_LEAK_WARNING_MESSAGE = (eventListenerCount: number, eventName: string, target: string) =>  {
    return `possible EventEmitter memory leak detected. ${eventListenerCount} ${eventName} listeners added to [${target}]. Use emitter.setMaxListeners() to increase limit.` 
}
