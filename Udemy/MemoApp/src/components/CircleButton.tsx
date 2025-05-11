import {View,Text,StyleSheet} from 'react-native'
import {JSX} from "react"

interface Props{
    mark:string
}

const CircleButton = (props:Props):JSX.Element =>{
    const {mark}=props
    return(
        <View style={styles.circleButton}>
            <Text style={styles.circleButtonLabel}>{mark}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    circleButton:{
        width:64,
        height:64,
        borderRadius:32,
        backgroundColor:'#467FD3',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:40,
        bottom:40,
        //shadowはiosのみ適用
        shadowColor:'#0000000',
        shadowOpacity:0.75,
        shadowRadius:8,
        shadowOffset:{width:0,height:8},
        //elevationはandroidのみ適用
        elevation:8,
    },
    circleButtonLabel:{
        color:'#ffffff',
        fontSize:40,
        lineHeight:48,
    },
})

export default CircleButton