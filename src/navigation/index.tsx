/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { Pressable, Text, View } from 'react-native'

import { Title } from '../components/Title'
import AddItemScreen from '../screens/AddItemScreen'
import InventoryScreen from '../screens/InventoryScreen'
import ItemScreen from '../screens/ItemScreen'
import { colors } from '../theme/colors'
import { fonts } from '../theme/fonts'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from './types'

export default function Navigation() {
    return (
        <NavigationContainer theme={DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()
const NotFound = () => <Text>Not found</Text>
const FallbackScreen = ({ route }: RootTabScreenProps<'Inventory'>) => {
    return (
        <View
            style={{
                backgroundColor: colors.background,
                flex: 1,
                paddingHorizontal: 20,
            }}
        >
            <Title>{route?.name}</Title>
        </View>
    )
}

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                component={BottomTabNavigator}
                name='Root'
                options={{ headerShown: false }}
            />
            <Stack.Screen component={NotFound} name='NotFound' options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
                <Stack.Screen component={AddItemScreen} name='AddItem' />
                <Stack.Screen component={ItemScreen} name='Item' />
            </Stack.Group>
        </Stack.Navigator>
    )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()
const tabBarLabelStyle = { fontFamily: fonts.regular, fontSize: 10 }
function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName='Inventory'
            screenOptions={{
                tabBarActiveTintColor: colors.mainBlue,
                headerShown: false,
            }}
        >
            <BottomTab.Screen
                component={FallbackScreen}
                name='Home'
                options={({ navigation }: RootTabScreenProps<'Home'>) => ({
                    tabBarLabelStyle,
                    tabBarIcon: ({ color }) => <TabBarIcon color={color} name='home' />,
                })}
            />
            <BottomTab.Screen
                component={FallbackScreen}
                name='Insurance'
                options={({ navigation }: RootTabScreenProps<'Insurance'>) => ({
                    tabBarLabelStyle,
                    tabBarIcon: ({ color }) => <TabBarIcon color={color} name='umbrella' />,
                })}
            />
            <BottomTab.Screen
                component={InventoryScreen}
                name='Inventory'
                options={({ navigation }: RootTabScreenProps<'Inventory'>) => ({
                    tabBarLabelStyle,
                    tabBarIcon: ({ color }) => <TabBarIcon color={color} name='albums' />,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('AddItem')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <Ionicons name='add-circle' size={25} style={{ marginRight: 15 }} />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                component={FallbackScreen}
                name='Realty'
                options={({ navigation }: RootTabScreenProps<'Realty'>) => ({
                    tabBarLabelStyle,
                    tabBarIcon: ({ color }) => <TabBarIcon color={color} name='search' />,
                })}
            />
            <BottomTab.Screen
                component={FallbackScreen}
                name='Menu'
                options={({ navigation }: RootTabScreenProps<'Menu'>) => ({
                    tabBarLabelStyle,
                    tabBarIcon: ({ color }) => <TabBarIcon color={color} name='menu' />,
                })}
            />
        </BottomTab.Navigator>
    )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}
