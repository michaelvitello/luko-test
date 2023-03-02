import React from 'react'
import { Pressable, PressableProps, Text } from 'react-native'
import { colors } from '../theme/colors'

export default function Button({ title, onPress, disabled }: PressableProps & { title: string }) {
    return (
        <Pressable
            disabled={disabled}
            hitSlop={20}
            onPress={onPress}
            pressRetentionOffset={20}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        >
            <Text style={{ fontSize: 17, color: disabled ? colors.mainGrey : colors.mainBlue }}>
                {title}
            </Text>
        </Pressable>
    )
}
