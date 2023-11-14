import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BadgerNewsScreen from '../screens/BadgerNewsScreen';

export default function NewsFeedStack() {
    const NewsStack = createNativeStackNavigator()

    return <>
    <NewsStack.Navigator>
        <NewsStack.Screen name="allposts" component={BadgerNewsScreen} options={{headerShown: false}} />
    </NewsStack.Navigator>
    
    </>

}