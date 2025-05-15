import {View,Text,StyleSheet, TextInput ,TouchableOpacity} from "react-native";
import {JSX} from "react";
import {Link,router} from "expo-router"

import Header from '../../components/Header'
import Button from'../../components/Button'

const handlePress=():void=>{
    //ログイン処理
    router.push('/memo/list')
}

const Login =():JSX.Element => {
    return(
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Log in</Text>
                <TextInput style={styles.input} value={'Email Address'} />
                <TextInput style={styles.input} value={'password'} />
                <View style={styles.button}>
                    <Button label={'Submit'} onPress={handlePress} />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not Register?</Text>
                    <Link href={'/auth/signup'} asChild>
                    <TouchableOpacity>
                        <Text style={styles.footerLink}> Sign up here</Text>
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

export default Login

