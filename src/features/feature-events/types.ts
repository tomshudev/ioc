export interface IEventsService {
  fetchEvents: () => { hasNext: boolean; events: Object[]; offset: number };
}

export const EventsServiceSymbol = "EventsServiceSymbol";
