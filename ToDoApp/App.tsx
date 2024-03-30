import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import { Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Picker } from '@react-native-picker/picker';

// Define the Task interface
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Incompleted', value: 'incompleted' },
];

const App: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [lastIndex, setLastIndex] = useState<number>(0);

  useEffect(() => {
    getTasksFromStorage();
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const saveTasksToStorage = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    } catch (error : any) {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Dismiss',
          textColor: 'red',
          onPress: Snackbar.dismiss,
        },
      });
    }
  };

  const getTasksFromStorage = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error : any) {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Dismiss',
          textColor: 'red',
          onPress: Snackbar.dismiss,
        },
      });
    }
  };

  const handleTask = () => {
    if (task.trim() === '') return;
    const updatedTasks = [...tasks];
    if (index !== null) {
      updatedTasks[index].text = task;
      setIndex(null);
    } else {
      const newTask: Task = { id: lastIndex, text: task, completed: false };
      setLastIndex(lastIndex + 1);
      updatedTasks.push(newTask);
    }
    setTasks(updatedTasks);
    saveTasksToStorage(tasks);
    setTask('');
  };

  const editTask = (ind: number) => {
    setTask(tasks[ind].text);
    setIndex(ind);
  };

  const deleteTask = (ind: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(ind, 1);
    setTasks(updatedTasks);
    setIndex(null);
  };

  const toggleTaskCompletion = (ind: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[ind].completed = !updatedTasks[ind].completed;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incompleted') return !task.completed;
    return true;
  });

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => editTask(index)}>
          <Text style={[styles.taskText, item.completed && styles.completedTask]}>
            {item.text}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <BouncyCheckbox
            size={25}
            fillColor="#007bff"
            unfillColor="#FFFFFF"
            isChecked={item.completed}
            onPress={() => toggleTaskCompletion(index)}
          />
          <TouchableOpacity onPress={() => deleteTask(index)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To Do App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity onPress={handleTask}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Add Task</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
      />
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={filter}
          style={styles.dropdown}
          onValueChange={setFilter}>
          {filterOptions.map(option => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    color: 'black',
    marginBottom: 20,
  },
  addButton: {
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonLabel: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  taskText: {
    fontSize: 16,
    color: '#333333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  deleteButton: {
    fontSize: 16,
    color: '#ff0000',
    marginLeft: 10,
  },
  dropdownContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    
    borderColor: '#cccccc',
  },
  dropdown: {
    tintColor : 'black',
    width: 100,
    height: 40,
    color : 'black'
  },
});

export default App;
