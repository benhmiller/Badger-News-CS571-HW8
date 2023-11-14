import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import BadgerCard from "./BadgerCard";

function BadgerNewsScreen(props) {
    const [newsArticles, setNewsArticles] = useState([]); // Stores articles fetched from API
    const [loading, setLoading] = useState(true);         // Indicates whether screen loading or not

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
        })
        .catch(error => {
            console.error('Error fetching news articles:', error);
            setLoading(false); // Set loading to false in case of an error
        });
    }, []);
    console.log("hello");

    return (
        loading ? <Text> Loading articles... </Text>
        :
        <View style={{ flex: 1, padding: 10 }}>
            <ScrollView>
                {newsArticles.map(article => (
                    <BadgerCard key={article.id}>
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
