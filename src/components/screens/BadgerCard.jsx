import { Pressable, StyleSheet, View } from 'react-native';

export default function BadgerCard(props) {
    return <Pressable onPress={props.onPress} onLongPress={props.onLongPress}>
        <View style={[styles.card, props.style]}>
            {props.children}
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 10,
        marginBottom: 10,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    }
})