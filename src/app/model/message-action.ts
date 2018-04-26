/**
 * User can send different type of message or add smile for example
 * e.g. we can send private message via /w username say something
 */
export interface MessageAction {
  shortcut: string;
  tooltip: string;
  action: (msg) => void;
}
