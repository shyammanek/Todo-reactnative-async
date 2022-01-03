import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import CustomButton from '../utils/CustomButton';

import {useDispatch, useSelector} from 'react-redux';
import {SetTasks} from '../Redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

export default function Task({navigation}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [done,setDone] = useState(false);
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setDesc(Task.Desc);
      setDone(Task.Done)
    }
  };

  const setTask = () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'No List here..');
    } else {
      try {
        var Task = {
          ID: taskID,
          Title: title,
          Desc: desc,
          Done:done,
        };
        const index = tasks.findIndex(task => task.ID === taskID);

        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasks, Task];
        }
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(SetTasks(newTasks));
            Alert.alert('Success!', 'Task Saved.');
            navigation.goBack();
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <TextInput
        value={title}
        style={styles.input}
        placeholder="Title"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        value={desc}
        style={styles.input}
        placeholder="Description"
        onChangeText={value => setDesc(value)}
        multiline
      />

      <View style={styles.checkbox}>
        <CheckBox value={done} onValueChange={newValue => setDone(newValue)} />
        <Text style={styles.text}>Is Done</Text>
      </View>

      <CustomButton
        title="Save Task"
        color="#1eb900"
        style={{width: '100%'}}
        onPressFunction={setTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 23,
    margin: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },
});
