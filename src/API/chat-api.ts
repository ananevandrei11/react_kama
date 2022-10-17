
let ws: WebSocket | null = null;
let subscribers = [] as SubscriberType[];

const closeHandler = () => setTimeout(createChannel, 3000);

const createChannel = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.close();
  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
  );
  ws?.addEventListener('close', closeHandler);
  ws?.addEventListener('message', messageHandler);
}

const messageHandler = (e: any) => {
  let newMessages = JSON.parse(e.data);
  subscribers.forEach(s => s(newMessages))
}

export const chatApi = {
  start() {
    createChannel()
  },
  stop() {
    subscribers = [];
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('close', messageHandler);
    ws?.close();
  },
  subscribe(callback: SubscriberType) {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter(s => s !== callback);
    };
  },
  unsubscribe(callback: SubscriberType) {
    subscribers = subscribers.filter(s => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  }
}

type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
};