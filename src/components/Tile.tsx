import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { fonts } from '../theme/fonts'

interface TileProps {
    image: string
    price: string | number
    title: string
}

const Tile = ({ image, price, title }: TileProps): JSX.Element => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.imageContainer} />
            <View style={styles.infoContainer}>
                <Text numberOfLines={2} style={styles.title}>
                    {title}
                </Text>
                <Text numberOfLines={1} style={styles.price}>{`${price} €`}</Text>
            </View>
        </View>
    )
}

export default Tile

const styles = StyleSheet.create({
    container: {
        width: '92%', // Trick to get space in-between columns: columnWrapperStyle unsupported in Flashlist
        height: 250, // TODO: Better calculation
        borderRadius: 18,
        marginBottom: '8%',
        overflow: 'hidden',
        borderWidth: 0.3,
        borderColor: 'blue',
    },
    imageContainer: {
        resizeMode: 'cover',
        height: '50%',
        width: '100%',
    },
    infoContainer: {
        width: '100%',
        height: '50%',
        justifyContent: 'space-around',
        paddingLeft: 15,
        paddingRight: 15,
    },
    title: {
        fontFamily: fonts.bold,
        fontSize: 24,
    },
    price: {
        fontFamily: fonts.regular,
        fontSize: 15,
        color: 'grey',
    },
})
