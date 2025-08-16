import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ActivityIndicator, Text, View } from "react-native";

export default function App() {
  const tasks = useQuery(api.tasks.getTasks);
  if (tasks === undefined) {
    return <ActivityIndicator />;
  }
  const task = tasks[0];
  console.log(tasks);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">{task.text}</Text>
    </View>
  );
}
