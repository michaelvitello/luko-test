import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './src/navigation'
import { fonts } from './src/theme/fonts'

export default function App() {
    const [fontsLoaded] = useFonts({
        [fonts.regular]: 'https://fonts.cdnfonts.com/s/15011/CircularStd-Medium.woff',
        [fonts.bold]: 'https://fonts.cdnfonts.com/s/15011/CircularStd-Bold.woff',
    })

    if (!fontsLoaded)
        return <ActivityIndicator size='large' style={{ justifyContent: 'center', flex: 1 }} />

    return (
        <SafeAreaProvider>
            <Navigation />
            <StatusBar />
        </SafeAreaProvider>
    )
}
