import {JSX,useEffect,useState} from "react";
import {doc,getDoc,setDoc,Timestamp} from "firebase/firestore";

import CicleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import {router,useLocalSearchParams} from "expo-router";

import {db,auth} from "../../config";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import {TextInput,View,StyleSheet} from "react-native";
'use dom';
const handlePress=(id:string,bodyText:string):void=>{
    if(auth.currentUser === null){return}
    const ref=doc(db,`users/${auth.currentUser.uid}/memos`,id)
    setDoc(ref,{bodyText,updatedAt:Timestamp.fromDate(new Date())})
    .then(()=>{
        router.back()//1つ前の画面に戻る
    })
    .catch((error)=>{
        console.log(error)
        
    })

}

const Edit = () :JSX.Element=> {
    const id=String(useLocalSearchParams().id)
    const [bodyText,setBodyText]=useState('')
    //console.log("editId",id)
    useEffect(()=>{
        if(auth.currentUser === null){return}
        const ref=doc(db,`users/${auth.currentUser.uid}/memos`,id)
        getDoc(ref)
        .then((docRef)=>{
            //console.log("docRef:",docRef.data())
            const RemoteBodyText=docRef.data()?.bodyText
            setBodyText(RemoteBodyText)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                multiline
                style={styles.input}
                value={bodyText}
                onChangeText={(text)=>{setBodyText(text)}}//memoの内容を編集
                autoFocus
                />
            </View>
            <CicleButton onPress={()=>{handlePress(id,bodyText)}}>
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
        flex:1,
    },
    input:{
        paddingVertical:32,
        paddingHorizontal:27,
        flex:1,
        textAlignVertical:'top',//androidf
        fontSize:16,
        lineHeight:24,

    }
})

export default Edit