import React, { useState, useEffect, useContext } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BadgerCard from "./BadgerCard";
import NewsContext from "../contexts/NewsContext";

function BadgerNewsScreen(props) {
    const [newsArticles, setNewsArticles] = useState([]);                    // Stores articles fetched from API
    const [loading, setLoading] = useState(true);                            // Indicates whether screen loading or not
    const navigation = useNavigation();                                      // Utilized for stackable navigation
    //const { userPreferences, togglePreference, addTags } = usePreferences(); // Import context
    const [prefs, setPrefs] = useContext(NewsContext);
    // Fetch News Articles from API
    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw8/articles', {
            headers: {
                'X-CS571-ID': 'bid_b12898bda46ac66e7703c0762de9def4c784a66f024e5b5de19d6da1de871384'
            }
        })
        .then(res => res.json())
        .then(data => {
            setNewsArticles(data);
            setLoading(false); // Set loading to false when data is fetched

            // Extract tags from articles and add them to preferences
            const tags = data.reduce((acc, article) => {
                return acc.concat(article.tags);
            }, []);

            setPrefs(tags.reduce((acc, tag) => {
                acc[tag] = true;
                return acc;
            }, {}));
        })
        .catch(error => {
            console.error('Error fetching news articles:', error);
            setLoading(false); // Set loading to false in case of an error
        });
    }, []);
    
    // Function Definiton for Stackable Navigation on Card Press
    function handlePress(articleId, title, image) {
        navigation.push('Article', { articleId, title, image });
    }

    // Create a Filtered List fo Articles from the Initially Fetched List Based on User Preferences
    const filteredArticles = newsArticles.filter(article => {
        return Object.keys(prefs).some(tag => {
            return prefs[tag] && article.tags.includes(tag);
        }); 
    });

    return (
        loading ? <Text> Loading articles... </Text>
        :
        <View style={{ flex: 1, padding: 10 }}>
            <ScrollView>
                {
                filteredArticles.length === 0 ? <Text> No Articles to Display </Text>
                :
                filteredArticles.map(article => (
                    <BadgerCard key={article.id} onPress={() => handlePress(article.fullArticleId, article.title, article.img)}>
                        <Image
                            style={{
                                width: '100%',
                                height: 250,
                                marginBottom: 10
                            }}
                            source={{
                                uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${article.img}`
                            }}
                        />
                        <Text style={{fontSize: 25}}>{article.title}</Text>
                    </BadgerCard>
                ))}
            </ScrollView>
        </View>
    );
}

export default BadgerNewsScreen;
