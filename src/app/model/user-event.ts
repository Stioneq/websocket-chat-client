export class UserEvent {
  name: string;
  event: EventType
}
export enum EventType {
  JOIN, LOGOUT
}
