import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Pressable, PressableProps } from 'react-native'
import { colors } from '../theme/colors'

export default function AddButton(props: PressableProps) {
    return (
        <Pressable
            onPress={props.onPress}
            pressRetentionOffset={10}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button]}
        >
            <MaterialCommunityIcons color='#FFFFFF' name='plus' size={24} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.mainBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
