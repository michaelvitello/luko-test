import React from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../components/Button'
import { RootTabScreenProps } from '../navigation/types'
import { colors } from '../theme/colors'

const ItemScreen = ({ navigation }: RootTabScreenProps<'ItemScreen'>) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button onPress={() => navigation.goBack()} title='Back' />
                <Button disabled onPress={() => undefined} title='Edit' />
            </View>
        </View>
    )
}

export default ItemScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
        paddingTop: 10,
    },
    buttonsContainer: {
        width: '100%',
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
})
