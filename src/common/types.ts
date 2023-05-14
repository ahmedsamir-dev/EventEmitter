export type EventListener = (...args: any[]) => void

export type Event =  {
    name: string,
    listeners: EventListener[]
}

export type WarnedEvent = Map<string, boolean>

