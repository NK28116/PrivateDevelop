import {View,StyleSheet,TextInput } from 'react-native'
import {JSX} from "react";
import {router} from "expo-router";
import {collection,addDoc,Timestamp} from 'firebase/firestore'
import {useState} from "react";

import CicleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { db,auth } from '../../../firebaseConfig'
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'

const handlePress= async (bodyText:string):void=>{
    if(auth.currentUser === null){return}
    const ref =collection(db,`users/${auth.currentUser.uid}/memos`)//「``」は文字列の中で変数を使いたい時に使う
    //users>UJeXGKgOb1QmYVzVPIgcIb57WQu1>memos>BXh3nJMX8cpDefZ9Ib9n> bodyText:'current User test'
    addDoc(ref,{
        bodyText,//:bodyText <- プロパティと変数が同じなので省略可能
        updatedAt:Timestamp.fromDate(new Date())
        //updatedAt:new Date()
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
    const [bodyText,setBodyText]=useState('')
    return (
        <KeyboardAvoidingView  style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    style={styles.input}
                    value={bodyText}
                    onChangeText={(text)=>{setBodyText(text)}}
                    autoFocus
                />
            </View>
            <CicleButton onPress={()=>{handlePress(bodyText)}}>
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