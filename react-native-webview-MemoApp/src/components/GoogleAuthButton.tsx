import {View,Text,StyleSheet, TouchableOpacity, Alert} from "react-native";
import {JSX} from "react";
import {GoogleOAuthProvider}from "@react-oauth/google"

interface Props{
    label:string
    onPress?:()=>void
}

const CLIENT_ID="440811944861-pf0penc4chgerluv2m9nvhm7s9mshto8.apps.googleusercontent.com"

const GoogleAuthButton =():JSX.Element=>{
    return(
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <TouchableOpacity onPress={()=>{Alert.alert("Google Auth Button Pressed")}} style={styles.button}>
                <Text style={styles.buttonLabel} > Google Sign In </Text>
            </TouchableOpacity>
        </GoogleOAuthProvider>
    )
}

const LandingPage = ():JSX.Element => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the App</Text>
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Google Auth Button Pressed')}>
                <Text style={styles.buttonLabel}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button:{
        backgroundColor:'#467FD3',
        borderRadius:4,
        alignSelf:'flex-start',
        marginBottom:"auto",
    },
    buttonLabel:{
        fontSize:16,
        lineHeight:32,
        color:'#ffffff',
        paddingVertical:8,
        paddingHorizontal:24,
    },
})

export default GoogleAuthButton