import {View, Text, StyleSheet, TextInput, Alert,TouchableOpacity} from "react-native";
import {JSX, useState} from "react";
import {Link, router} from "expo-router"
import {createUserWithEmailAndPassword} from 'firebase/auth'

import {auth} from "../../../firebaseConfig";
import Button from '../../components/Button'

const handlePress=(email:string,password:string):void=>{
    //会員登録処理
    console.log(email,password)//terminal log
    createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            console.log(userCredential.user.uid)
            router.replace('/memo/list')
        })//成功した時に実行されるコールバック関数
        .catch((error)=>{
            const {code,message}=error
            console.log(code,message)
            Alert.alert(message)
        })//失敗した時に実行されるコールバック関数

}

const SignUp =():JSX.Element => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    return(
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text)=>{setEmail(text)}}
                    autoCapitalize={'none'}//自動で先頭を大文字にしない
                    keyboardType={'email-address'}//@を見やすくする
                    placeholder={'Email Address'}
                    textContentType={'emailAddress'}//キーチェーンに情報があると自動保管
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text)=>{setPassword(text)}}
                    autoCapitalize={'none'}
                    secureTextEntry//入力した文字をマスクする
                    placeholder={'Password'}
                    textContentType={'password'}
                 />
                <View style={styles.button}>
                     <Button
                         label={'Sign Up'}
                         onPress={()=>{handlePress(email,password)}}
                     />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already Registered?</Text>
                    <Link href={"/auth/login"} asChild replace>
                    <TouchableOpacity>
                        <Text style={styles.footerLink}> Login here</Text>
                    </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F4F8'
    },
    title:{
        fontSize:24,
        lineHeight:32,
        fontWeight:'bold',
        marginBottom:24,
    },
    inner:{
        paddingHorizontal:24,
        paddingVertical:27
    },
    input:{
        borderWidth:1,
        borderColor:'#DDDDDD',
        backgroundColor:'#ffffff',
        height:48,
        padding:8,
        fontSize:16,
        marginBottom:16,
    },
    button:{
        backgroundColor:'#467FD3',
        borderRadius:4,
        alignSelf:'flex-start',
        marginBottom:24,
    },
    buttonLabel:{
        fontSize:16,
        lineHeight:32,
        color:'#ffffff',
        paddingVertical:8,
        paddingHorizontal:24,
    },
    footer:{
        flexDirection:'row'
    },
    footerText:{
        fontSize:14,
        lineHeight:24,
        marginRight:8,
        color:'#0000000'
    },
    footerLink:{
        fontSize:14,
        lineHeight:24,
        color:'#467fd3',
    },
})

export default SignUp

