import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BadgerNewsScreen from '../screens/BadgerNewsScreen';
import BadgerNewsDetailsScreen from '../screens/BadgerNewsDetailsScreen';

export default function NewsFeedStack() {
    const NewsStack = createNativeStackNavigator()

    return <>
    <NewsStack.Navigator>
        <NewsStack.Screen name="Articles" component={BadgerNewsScreen} options={{headerShown: true}} />
        <NewsStack.Screen name="Article" component={BadgerNewsDetailsScreen} options={{headerShown: true}} />
    </NewsStack.Navigator>
    
    </>

}