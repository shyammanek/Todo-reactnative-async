import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {BorderlessButton, FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {SetTasks, SetTasksId} from '../Redux/actions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { black } from 'react-native-paper/lib/typescript/styles/colors';

function Todohome({navigation}) {
  const {tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    AsyncStorage.getItem('Tasks')
      .then(tasks => {
        const parsedTasks = JSON.parse(tasks);
        if (parsedTasks && typeof parsedTasks === 'object') {
          dispatch(SetTasks(parsedTasks));
        }
      })
      .catch(err => console.log(err));
  };

  const deleteTask = id => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(SetTasks(filteredTasks));
        Alert.alert('Success!', 'Task removed successfully.');
      })
      .catch(err => console.log(err));
  };

  
  const checkTask = (id, newValue) => {
    const index = tasks.findIndex(task => task.ID === id);
    console.log(id);
    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].Done = newValue;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(SetTasks(newTasks));
          Alert.alert('Success!', 'Task state is changed.');
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <View style={styles.body}>
      <FlatList
        data={tasks.filter(task => task.Done === true)}
        renderItem={({item}) => (
         <View style={styles.item} >

            <View style={styles.item_row}>
              
                <CheckBox
                  value={item.Done}
                  onValueChange={newValue => {
                    checkTask(item.ID, newValue);
                  }}
                />

          <TouchableOpacity
            onPress={() => {
              dispatch(SetTasksId(item.ID));
              navigation.navigate('Task');
            }}>

              <View style={styles.item_body}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.Title}
                </Text>

                <Text style={styles.subtitle} numberOfLines={1}>
                  {item.Desc}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  deleteTask(item.ID);
                }}> 
              
                <Icon name={'trash'} size={25} color={'#ff3636'} />

              </TouchableOpacity>
            
          </TouchableOpacity>
          </View>
          </View>
        )}
        keyExtrator={(item, index) => index.toString()}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(SetTasksId(tasks.length + 1));
          navigation.navigate('Task');
        }}>
        <Icon name={'plus'} size={20} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'relative',
    bottom: 0,
    elevation: 5,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },

  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor:"black",
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
});

export default Todohome;
