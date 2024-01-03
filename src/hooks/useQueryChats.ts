import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

import supabase from "@/libs/supabase";
import { EditedChat, FetchChat } from "@/schemas/chat";
import { atomEditedChat } from "@/stores/atoms";

export const useQueryChat = () => {
  const selectorQuery = async () => {
    const { data, error } = await supabase
      .from("chat")
      .select("*")
      .order("updatedAt", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const getAllChats = useQuery<FetchChat[], Error>({
    queryKey: ["query:chats"],
    queryFn: selectorQuery,
    staleTime: Infinity,
    refetchInterval: 250,
  });

  return { getAllChats };
};

export const useMutateChat = () => {
  const queryClient = useQueryClient();
  const [, setEditedChat] = useAtom(atomEditedChat);

  /**
   * チャットデータを作成する
   */
  const createMutationChat = useMutation({
    mutationFn: async (
      chat: Omit<FetchChat, "id" | "createdAt" | "updatedAt">,
    ) => {
      const { data, error } = await supabase.from("chat").insert(chat).select();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (result: FetchChat[]) => {
      const previousChats = queryClient.getQueryData<FetchChat[]>([
        "query:chats",
      ]);
      if (previousChats && result != null) {
        queryClient.setQueryData(
          ["query:chats"],
          [...previousChats, result[0]],
        );
      }
    },
    onError(error: any) {
      console.error(error.message);
    },
  });

  /**
   * チャットデータを更新する
   */
  const updateMutationChat = useMutation({
    mutationFn: async (chat: EditedChat) => {
      const { data, error } = await supabase
        .from("chat")
        .update({ title: chat.title })
        .eq("id", chat.id)
        .select();
      if (error) throw new Error(error.message);
      queryClient.invalidateQueries({ queryKey: ["query:chats"] });
      return data;
    },
    onSuccess: (result: FetchChat[], variables: FetchChat) => {
      const previousTodos = queryClient.getQueryData<FetchChat[]>([
        "query:chats",
      ]);
      if (previousTodos && result != null) {
        const newChats = previousTodos.map((chat) =>
          chat.id === variables.id ? result[0] : chat
        );
        queryClient.setQueryData(["query:chats"], newChats);
      }
      setEditedChat("");
    },
    onError(error: any) {
      console.error(error.message);
      setEditedChat("");
    },
  });

  /**
   * チャットデータを削除する
   */
  const deleteMutationChat = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("chat")
        .delete()
        .eq("id", id);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (_, variables) => {
      const previousTodos = queryClient.getQueryData<FetchChat[]>([
        "query:chats",
      ]);
      if (previousTodos) {
        queryClient.setQueryData(
          ["query:chats"],
          previousTodos.filter((chat) => chat.id !== variables),
        );
      }
      setEditedChat("");
    },
    onError(error: any) {
      console.error(error.message);
      setEditedChat("");
    },
  });

  return {
    createMutationChat,
    updateMutationChat,
    deleteMutationChat,
  };
};
