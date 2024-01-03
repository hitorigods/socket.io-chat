import { atom } from "jotai";
import { Socket } from "socket.io-client";
import { FetchChat } from "@/schemas/chat";

// 状態：WebSocketコネクション
export const atomSocket = atom(null as unknown as Socket);
atomSocket.debugLabel = "atomSocket";

// 状態：ユーザー名
export const atomUserName = atom("");
atomUserName.debugLabel = "atomUserName";

// 状態：チャットの編集内容
export const atomEditedChat = atom("");
atomEditedChat.debugLabel = "atomEditedChat";

// 状態：チャット編集中の判定
export const atomIsEditedChat = atom(false);
atomIsEditedChat.debugLabel = "atomIsEditedChat";
