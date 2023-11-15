import React, { useContext } from 'react';
import { View, Text, Switch } from 'react-native';

import BadgerCard from './BadgerCard';
import NewsContext from "../contexts/NewsContext";

function BadgerPreferencesScreen() {
    const [prefs, setPrefs] = useContext(NewsContext);

    const togglePreference = (tag) => {
        setPrefs((prevPrefs) => ({
          ...prevPrefs,
          [tag]: !prevPrefs[tag],
        }));
    };

    return (
    <View style={{ flex: 1, padding: 10 }}>
        {
            Object.keys(prefs).map((tag) => (
                <BadgerCard key={tag}>
                    <Text>{tag}</Text>
                    <Switch
                        value={prefs[tag]}
                        onValueChange={() => togglePreference(tag)}
                    />
                </BadgerCard>
            ))
        }
    </View>
    );
}

export default BadgerPreferencesScreen;
