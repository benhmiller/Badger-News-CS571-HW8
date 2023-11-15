import { useEffect, useState, useRef } from 'react'
import { Text, View, ScrollView, Image, Animated, Pressable, Linking } from "react-native";

import BadgerCard from './BadgerCard';

export default function BadgerNewsDetailsScreen(props) {
    // State Variables for Fetching Additional Article Details
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Extract Parameter Values
    const { articleId, title, image } = props.route.params;

    // Reference Value for Animation
    const opVal = useRef(new Animated.Value(0)).current;
    const descriptionOpVal = useRef(new Animated.Value(0)).current;

    // Fetch additional article information
    useEffect(() => {
        fetch(`https://cs571.org/api/f23/hw8/article?id=${articleId}`, {
            headers: {
                'X-CS571-ID': 'bid_b12898bda46ac66e7703c0762de9def4c784a66f024e5b5de19d6da1de871384'
            }
        })
        .then(res => res.json())
        .then(data => {
            setArticle(data);
            setLoading(false);

            // Begin Fade-In for Additional Details
            Animated.timing(descriptionOpVal, {
                toValue: 1,
                duration: 2500,
                useNativeDriver: true
            }).start()
        })
    }, [])

    // Animation Control for Image and Title
    useEffect(() => {
        Animated.timing(opVal, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }, []);

    const handleLink = () => {
        Linking.openURL(article.url)
    }

    return <Animated.View style={{ flex: 1, padding: 10, opacity: opVal}}>
            <ScrollView>
                <BadgerCard>
                    <Image
                        style={{
                            width: '100%',
                            height: 250,
                            marginBottom: 10
                        }}
                        source={{
                            uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${image}`
                        }}
                    />
                    <Text style={{fontSize: 25, marginBottom: 20}}>{title}</Text>
                    {loading ? ( // Display loading if additional information not yet fetched
                        <Text>Loading additional details...</Text>
                    ) : (
                    <>
                        <Animated.View style={{ opacity: descriptionOpVal }}>
                            <Text style={{ fontSize: 15, marginBottom: 15 }}>By {article.author} on {article.posted} </Text>
                            {
                                article.body.map((paragraph, index) => (
                                <Text key={index} style={{ fontSize: 15, marginBottom: 20 }}>
                                    {paragraph}
                                </Text>
                                ))
                            }
                            <Pressable onPress={handleLink}>
                                <Text style={{ fontSize: 15, marginBottom: 15, color: 'blue', textDecorationLine: 'underline' }}>Read Full Article Here</Text>
                            </Pressable>
                            
                        </Animated.View>
                    </>
                    )}
                </BadgerCard>
            </ScrollView>
        </Animated.View>



}