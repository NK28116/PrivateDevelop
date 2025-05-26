import {TouchableOpacity, Text, StyleSheet, Alert} from "react-native";
import {JSX} from "react";
import {signOut} from 'firebase/auth'
import{router} from 'expo-router'
'use dom';

import {auth} from "../config";

const handlePress=():void=>{
    signOut(auth)
        .then(()=>{
            router.replace('/auth/login')
        })
        .catch(()=>{
            Alert.alert('ログアウトに失敗しました')
        })
}
const LogOutButton=():JSX.Element=>{
    return(
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.logout}>ログアウト</Text>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    logout:{
        fontSize:12,
        lineHeight:24,
        color:'rgba(255,255,255,0.7)'
    }
})

export default LogOutButton