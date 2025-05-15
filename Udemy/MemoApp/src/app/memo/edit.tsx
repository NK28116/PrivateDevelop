import {View,StyleSheet,TextInput , KeyboardAvoidingView} from 'react-native'
import {JSX} from "react";

import Header from '../../components/Header'
import CicleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import {router} from "expo-router";

const handlePress=():void=>{
    router.back()//1つ前の画面に戻る
}

const Edit = () :JSX.Element=> {
    return (
        <KeyboardAvoidingView behavior={'height'} style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput multiline style={styles.input} value={"買い物\nリスト"}/>
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

export default Edit