import {View,StyleSheet,TextInput , KeyboardAvoidingView} from 'react-native'
import {JSX} from "react";
import {router} from "expo-router";
import {collection,addDoc} from 'firebase/firestore'

import Header from '../../components/Header'
import CicleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { db } from '../../config'

const handlePress= async ():void=>{

    addDoc(collection(db,'memos'),{
        bodyText:'test'
    })
        .then((docRef)=>{//documentへの参照
            console.log('success',docRef.id)
            router.back()
        })
        .catch((error)=>{
            console.log(error)
        })
        /*
    await addDoc(collection(db,'memos'),{
        bodyText:'test2'
    })
    .catch((error)=>{
        console.log(error)
    })
    router.back()
    */
}
const Create = () :JSX.Element=> {
    return (
        <KeyboardAvoidingView behavior={'height'} style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput multiline style={styles.input} value=""/>
            </View>
            <CicleButton onPress={handlePress}>
                <Icon name={'check'} size={40} color={'#ffffff'}/>
            </CicleButton>
        </KeyboardAvoidingView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    inputContainer:{
        paddingVertical:32,
        paddingHorizontal:27,
        flex:1,
    },
    input:{
        flex:1,
        textAlignVertical:'top',//androidf
        fontSize:16,
        lineHeight:24,

    }
})

export default Create