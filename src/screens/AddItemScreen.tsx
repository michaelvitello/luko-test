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

export default function AddItemScreen({ navigation }: RootTabScreenProps<'AddItemScreen'>) {
    /* Initialize Form for item addition */
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            name: '',
            value: '',
            description: '',
        },
    })

    /* Image state for item picture */
    const [image, setImage] = useState(null)

    /* Form submission - TODO: Write in DB to update list */
    const onSubmit = data => {
        // console.log(data) -> Logged data for debug
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
            contentContainerStyle={{ flexGrow: 1 }} // Not sure that works...
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
            </View>
            <Controller
                control={control}
                name='name'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        placeholder=' Name'
                        style={styles.input}
                        value={value}
                    />
                )}
                rules={{
                    required: true,
                }}
            />
            {errors.name && <Text>This is required.</Text>}
            <Controller
                control={control}
                name='value'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        keyboardType='numeric'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        placeholder=' 0 €'
                        style={styles.input}
                        value={value}
                    />
                )}
                rules={{
                    max: 40000,
                    min: 0,
                    required: true,
                    maxLength: 1000,
                }}
            />
            <Controller
                control={control}
                name='description'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        multiline={true}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        placeholder=' Description (optional)'
                        style={styles.descriptionInput}
                        value={value}
                    />
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
        borderColor: colors.mainGrey,
        borderRadius: 5,
        marginBottom: 50,
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
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
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
})
