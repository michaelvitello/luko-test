import * as SQLite from 'expo-sqlite'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from '../components/Title'
import data from '../data/localset.json'
import { RootTabScreenProps } from '../navigation/types'
import { colors } from '../theme/colors'

export default function InventoryScreen({ navigation, route }: RootTabScreenProps<'Inventory'>) {
    /* Init DB for local item storage */
    const db = SQLite.openDatabase('db.db')

    /* For our demo purpose, we init the DB with 3 initial items so that the flashlist is already filled up. */
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists items (id integer primary key not null, done int, value text);',
            )
            tx.executeSql('insert into items (done, value) values (0, ?)', [
                JSON.stringify(data.items[0]),
                JSON.stringify(data.items[1]),
                JSON.stringify(data.items[2]),
            ])
            /* Trick to use in debug to see what's logged in DB */
            // tx.executeSql('select * from items', [], (_, { rows }) =>
            //     console.log(JSON.stringify(rows)),
            // )
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddButtonPress = () => navigation.navigate('AddItem')

    return (
        <View style={styles.container}>
            <Title onButtonPress={handleAddButtonPress}>{route.name}</Title>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
    },
})
