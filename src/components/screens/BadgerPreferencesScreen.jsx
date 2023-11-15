import React from 'react';
import { View, Text, Switch } from 'react-native';
import { usePreferences } from "../contexts/PreferencesContext";
import BadgerCard from './BadgerCard';

function BadgerPreferencesScreen() {
    const { userPreferences, togglePreference } = usePreferences();

    return (
    <View style={{ flex: 1, padding: 10 }}>
        {
            Object.keys(userPreferences).map((tag) => (
                <BadgerCard key={tag}>
                    <Text>{tag}</Text>
                    <Switch
                        value={userPreferences[tag]}
                        onValueChange={() => togglePreference(tag)}
                    />
                </BadgerCard>
            ))
        }
    </View>
    );
}

export default BadgerPreferencesScreen;
