import * as SQLite from 'expo-sqlite'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Platform,
    Text,
    Image,
} from 'react-native'
import Button from '../components/Button'
import { RootTabScreenProps } from '../navigation/types'
import { ImagePicker } from '../sdk/ImagePicker'
import { colors } from '../theme/colors'
import { fonts } from '../theme/fonts'

export default function AddItemScreen({ navigation, route }: RootTabScreenProps<'AddItemScreen'>) {
    /* Initialize Form for item addition */
    const {
        control,
        handleSubmit,
        // getFieldState,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            name: '',
            value: '',
            description: '',
        },
    })

    // const nameState = getFieldState('name')
    // const valueState = getFieldState('value')

    /* Image state for item picture */
    const [image, setImage] = useState(null)

    /* Open DB for local item storage */
    const db = SQLite.openDatabase('db.db')

    /* Form submission - TODO: Write in DB to update list */
    /* Using useForm, it's impossible to submit non valid items (see require rule), no need for further checks */
    const onSubmit = data => {
        const newItem = {
            id: route.params.dbLength + 1, // Current length of DB
            name: data.name,
            purchasePrice: data.value,
            type: data.type || '',
            description: data.description || '',
            photo: image || '',
        }

        // Convert to JSON for DB
        db.transaction(tx => {
            tx.executeSql('insert or ignore into items (value) values (?)', [
                JSON.stringify(newItem),
            ])
            // Log to track added items
            // tx.executeSql('select * from items', [], (_, { rows: { _array } }) => {
            //     console.log(JSON.stringify(_array))
            // })
        })

        // If successful, update items and go back to inventory screen
        navigation.goBack()
    }

    /* Image picker - TODO: Same with image capture (camera) */
    const imagePick = async () => {
        const result = await ImagePicker.pickImage()
        setImage(result.assets[0].uri)
    }

    /* Use enable, not disable for boolean JS ordering - we need true && true not false && true, which is false */
    const enableAddButton = isValid && image

    return (
        /* TODO - Fix Keyboard not overlapping view */
        /* Try KeyboardAwareScrollView ? https://github.com/APSL/react-native-keyboard-aware-scroll-view */
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled={false} // TO FIX
            style={styles.container}
        >
            <View style={styles.buttonsContainer}>
                <Button onPress={() => navigation.goBack()} title='Cancel' />
                <Button disabled={!enableAddButton} onPress={handleSubmit(onSubmit)} title='Add' />
            </View>
            <View style={styles.imagePicker}>
                <Pressable
                    onPress={imagePick}
                    pressRetentionOffset={10}
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.imageButton]}
                >
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <Text numberOfLines={1} style={styles.title}>
                            {'Add Photo'}
                        </Text>
                    )}
                </Pressable>
                {image ? (
                    <Text numberOfLines={1} style={[styles.subTitle, { color: colors.mainGrey }]}>
                        {'Tap to change'}
                    </Text>
                ) : (
                    <Text numberOfLines={1} style={[styles.subTitle, { color: 'red' }]}>
                        {'Mandatory'}
                    </Text>
                )}
            </View>
            <Controller
                control={control}
                name='name'
                render={({ field: { onChange, onBlur, value }, fieldState }) => (
                    <>
                        <Text numberOfLines={1} style={styles.headerTitle}>
                            {'Name'}
                        </Text>
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder=' Bracelet'
                            style={[
                                styles.input,
                                {
                                    borderColor:
                                        fieldState.isTouched && !value ? 'red' : colors.mainGrey,
                                },
                            ]}
                            value={value}
                        />
                    </>
                )}
                rules={{
                    required: true,
                    minLength: 1,
                }}
            />
            {errors.name && <Text>This is required.</Text>}
            <Controller
                control={control}
                name='value'
                render={({ field: { onChange, onBlur, value }, fieldState }) => (
                    <>
                        <Text numberOfLines={1} style={styles.headerTitle}>
                            {'Value'}
                        </Text>
                        <TextInput
                            keyboardType='numeric'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder=' 0 €'
                            style={[
                                styles.input,
                                {
                                    borderColor:
                                        fieldState.isTouched && !value ? 'red' : colors.mainGrey,
                                },
                            ]}
                            value={value}
                        />
                    </>
                )}
                rules={{
                    max: 40000,
                    min: 1,
                    required: true,
                    maxLength: 1000,
                    minLength: 1,
                }}
            />
            <Controller
                control={control}
                name='description'
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text numberOfLines={1} style={styles.headerTitle}>
                            {'Description'}
                        </Text>
                        <TextInput
                            multiline={true}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder=' Optional'
                            style={styles.descriptionInput}
                            value={value}
                        />
                    </>
                )}
            />
        </KeyboardAvoidingView>
    )
}

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
    formContainer: {
        width: '100%',
        height: 400,
        borderColor: 'yellow',
        borderWidth: 2,
    },
    input: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        fontFamily: fonts.bold,
        fontSize: 12,
        paddingHorizontal: 10,
        color: 'black',
    },
    descriptionInput: {
        height: 120,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.mainGrey,
        borderRadius: 5,
        fontFamily: fonts.bold,
        fontSize: 12,
        paddingHorizontal: 10,
        color: 'black',
    },
    imagePicker: {
        marginTop: 50,
        marginBottom: 50,
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: colors.mainBlue,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    title: {
        fontFamily: fonts.bold,
        fontSize: 12,
        color: colors.mainGrey,
    },
    subTitle: {
        paddingTop: 10,
        fontFamily: fonts.bold,
        fontSize: 10,
        // color: colors.mainGrey,
    },
    headerTitle: {
        paddingBottom: 10,
        fontFamily: fonts.bold,
        fontSize: 12,
        color: 'black',
    },
})
