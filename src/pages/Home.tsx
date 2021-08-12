import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks([...tasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTaks = tasks.map(task => ({ ...task }))

    const item = updatedTaks.find(t => t.id === id)

    if (!item) {
      return
    }
    
    item.done = !item.done

    setTasks(updatedTaks);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => (oldState.filter(task => task.id !== id)))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})