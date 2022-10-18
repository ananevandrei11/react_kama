
let ws: WebSocket | null = null;
let subscribers = {
  'message-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
};

const closeHandler = () => setTimeout(createChannel, 3000);
const openHandler = () => notifySubscribersAboutStatus('ready')
const errorHandler = () => notifySubscribersAboutStatus('error')

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach(s => s(status));
}


const createChannel = () => {
  cleanUp();
  ws?.close();
  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
  );
  notifySubscribersAboutStatus('pending');
  ws?.addEventListener('close', closeHandler);
  ws?.addEventListener('message', messageHandler);
  ws?.addEventListener('open', openHandler);
  ws?.addEventListener('error', errorHandler);
}

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandler);
  ws?.removeEventListener('error', errorHandler);
}

const messageHandler = (e: any) => {
  let newMessages = JSON.parse(e.data);
  subscribers['message-received'].forEach(s => s(newMessages))
}

export const chatApi = {
  start() {
    createChannel()
  },
  stop() {
    subscribers['message-received'] = [];
    subscribers['status-changed'] = [];
    cleanUp();
    ws?.close();
  },
  subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
    };
  },
  unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type ChatMessageType = {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
};
type StatusType = 'pending' | 'ready' | 'error';
type EventsNamesType = 'message-received' | 'status-changed';