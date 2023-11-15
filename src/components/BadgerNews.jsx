import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import BadgerPreferencesScreen from './screens/BadgerPreferencesScreen';
import NewsFeedStack from './navigation/NewsFeedStack';
import NewsContext from './contexts/NewsContext';

const BadgerNews = () => {
    const [prefs, setPrefs] = useState({});
    const NewsTabs = createBottomTabNavigator();

    return (
        <>
        <NewsContext.Provider value={[prefs, setPrefs]}>
        <NavigationContainer>
            <NewsTabs.Navigator screenOptions={{
                "tabBarActiveTintColor": "red",
                "tabBarStyle": [{"display": "flex"},null]}}>
                <NewsTabs.Screen 
                    name="News"
                    component={NewsFeedStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => 
                            (<FontAwesome name="newspaper-o" size={size} color={color} />)
                        
                    }}
                />
                <NewsTabs.Screen
                    name="Preferences"
                    component={BadgerPreferencesScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => 
                            (<FontAwesome name="gear" size={size} color={color} />)
                    }}
                />
            </NewsTabs.Navigator>
        </NavigationContainer>
        </NewsContext.Provider>
        </>
    );
}

export default BadgerNews;
