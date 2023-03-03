import { FlashList } from '@shopify/flash-list'
import * as SQLite from 'expo-sqlite'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Tile from '../components/Tile'
import { Title } from '../components/Title'
import data from '../data/localset.json'
import { RootTabScreenProps, Items, InventoryItem } from '../navigation/types'
import { colors } from '../theme/colors'

export default function InventoryScreen({ navigation, route }: RootTabScreenProps<'Inventory'>) {
    /* TBC -> Worth doing in a state?... Not ideal we pass twice 1 - Empty ARR 2 - Array with items, x2 renders */
    const [items, setItems] = useState<Items>([])

    /* Init DB for local item storage */
    const db = SQLite.openDatabase('db.db')

    /* For our demo purpose, we init the DB with 3 initial items so that the flashlist is already filled up. */
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists items (id integer primary key not null, value text unique);',
            )
            tx.executeSql('insert or ignore into items (value) values (?)', [
                JSON.stringify(data.items[0]),
            ])
            tx.executeSql('insert or ignore into items (value) values (?)', [
                JSON.stringify(data.items[1]),
            ])
            tx.executeSql('insert or ignore into items (value) values (?)', [
                JSON.stringify(data.items[2]),
            ])
            tx.executeSql('select * from items', [], (_, { rows: { _array } }) => {
                // console.log(JSON.stringify(_array))
                /* Trick to use in debug to see what's logged in DB */
                const _items: Items = []
                for (let i = 0; i < _array.length; i++) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                    _items.push(JSON.parse(_array[i].value)) // TO FIX
                }

                setItems(_items)
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* To use if we want to clear the DB to reset the demo */
    // useEffect(() => {
    //     db.closeAsync()
    //     const deletedDb = async () => {
    //         await db.deleteAsync()
    //     }

    //     deletedDb().catch(console.error)
    //     console.log('DB', db)
    // }, [])

    const handleAddButtonPress = () => navigation.navigate('AddItem')
    const handleItemPress = () => navigation.navigate('Item')

    const keyExtractor = (_item: InventoryItem, index: number) => {
        return index.toString()
    }

    const renderItem = (item: InventoryItem) => {
        // TODO: Understand why item.item...
        return (
            <Tile
                handleItemPress={handleItemPress}
                image={item.item.photo}
                price={item.item.purchasePrice}
                title={item.item.name}
            />
        )
    }

    const contentContainerStyle = {
        padding: '7%',
    }

    return (
        <View style={styles.container}>
            <Title onButtonPress={handleAddButtonPress}>{route.name}</Title>
            <View style={styles.listContainer}>
                <FlashList // TODO: Add estimated Size List for virtualization
                    contentContainerStyle={contentContainerStyle}
                    data={items}
                    estimatedItemSize={225} // TO DO or via warnings
                    horizontal={false}
                    keyExtractor={keyExtractor}
                    numColumns={2}
                    renderItem={renderItem} // TO DO Fix typing
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
    },
    tileContainer: {
        width: '92%', // Trick to get space in-between columns: columnWrapperStyle unsupported in Flashlist
        height: 250, // TODO: Better calculation
        borderRadius: 18,
        marginBottom: '8%',
        overflow: 'hidden',
        borderWidth: 0.3,
        borderColor: 'blue',
    },
    listContainer: {
        flex: 1,
        paddingLeft: '4%',
    },
})
