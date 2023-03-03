/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dispatch, SetStateAction } from 'react'

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | { title: string }
    AddItem: { dbLength: number }
    Item: undefined
    NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>

export type RootTabParamList = {
    Inventory: undefined
    Home: undefined
    Insurance: undefined
    Realty: undefined
    Menu: undefined
    AddItemScreen: undefined
    ItemScreen: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>

export type InventoryItem = {
    id?: string
    name: string
    value: string | number
    type?: string
    description?: string
    photo: string
}

export type Items = InventoryItem[]
