import { api } from "@/convex/_generated/api";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const tasks = useQuery(api.tasks.getTasks);

  const [newTask, setNewTask] = useState("");

  const addTodo = useMutation(api.tasks.addTask);
  const clearAllTodo = useMutation(api.tasks.clearAllTasks);
  const deleteTask = useMutation(api.tasks.deleteTask);

  if (tasks === undefined) {
    return (
      <View className="flex-1 items-center justify-center flex">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 flex bg-white">
      <View className="p-5 gap-2.5">
        {/* add tasks */}
        <View className="flex flex-row items-center gap-2">
          <TextInput
            className="flex-1 border rounded-xl border-orange-400 border-solid p-3"
            placeholder="enter a task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity
            className="rounded-xl bg-stone-400 p-2"
            onPress={() => {
              addTodo({ text: newTask });
              setNewTask("");
            }}>
            <Ionicons name="add-sharp" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* tasks status bar */}
        <View className="flex flex-row items-center gap-2 bg-red-300 m-3.5 px-1 rounded-xl w-1/3">
          <Text>{tasks.length}</Text>
          <TouchableOpacity className="" onPress={() => clearAllTodo()}>
            <MaterialCommunityIcons
              name="delete-forever"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="justify-center items-center flex">
        {tasks?.map(({ _id, text }) => (
          <View key={_id} className="flex flex-row items-center gap-2">
            <Text className="text-4xl font-bold text-blue-500">{text}</Text>

            <View>
              <TouchableOpacity
                className="rounded-xl bg-stone-400 p-2"
                onPress={() => {
                  deleteTask({ id: _id });
                }}>
                <Feather name="delete" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
