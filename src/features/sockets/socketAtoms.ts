import { atom } from 'jotai';
import { Socket } from 'socket.io-client';

// WebSocketコネクション
export const socketAtom = atom(null as unknown as Socket);
socketAtom.debugLabel = 'socketAtom';
