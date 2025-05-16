import {TouchableOpacity,Text,StyleSheet} from "react-native";
import {JSX} from "react";

const LogOutButton=():JSX.Element=>{
    return(
        <TouchableOpacity>
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