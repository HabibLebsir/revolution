import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';

import ToDoListScreen from './screens/ToDoListScreen';

function DailyAchievementScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Accomplissement quotidien</Text>
    </View>
  );
}

function RoutinesScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Routines</Text>
    </View>
  );
}

function GoalsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Objectifs</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === 'ToDoList') {
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
            } else if (route.name === 'DailyAchievement') {
              iconName = focused ? 'today' : 'today-outline';
            } else if (route.name === 'Routines') {
              iconName = focused ? 'repeat' : 'repeat-outline';
            } else if (route.name === 'Goals') {
              iconName = focused ? 'flag' : 'flag-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8e8e93',
        })}
      >

        <Tab.Screen
          name="ToDoList"
          component={ToDoListScreen}
          options={{ title: 'To-Do List' }}
        />

        <Tab.Screen
          name="DailyAchievement"
          component={DailyAchievementScreen}
          options={{ title: 'Accomplissement' }}
        />

        <Tab.Screen
          name="Routines"
          component={RoutinesScreen}
          options={{ title: 'Routines' }}
        />

        <Tab.Screen
          name="Goals"
          component={GoalsScreen}
          options={{ title: 'Objectifs' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
