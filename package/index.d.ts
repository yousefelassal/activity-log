declare module 'instalog-logger' {
    interface EventObject {
        actor_id: string,
        action: {
            id: string,
            object: string,
            name: string
        },
        object: string,
        target_id: string,
        target_name: string,
        location: string,
        metadata: {
            redirect: string,
            description: string,
            x_request_id: string
        }
    }

    interface EventResponse {
        id: string,
        actor: {
            email: string,
            name: string
        },
        action_name: string,
        occurred_at: string
    }

    interface ListParams {
        page: number,
        limit: number,
        search: string
    }

    class InstaLog {
        constructor(secretKey: string);
        createEvent(eventObject: EventObject): Promise<EventResponse>;
        listEvents(params?: ListParams): Promise<EventResponse[]>;
    }

    export = InstaLog;
}