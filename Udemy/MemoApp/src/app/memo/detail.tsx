import { View , Text , StyleSheet ,ScrollView} from 'react-native'
import {JSX} from "react";
import {Feather} from "@expo/vector-icons";
import {router} from "expo-router";

import Header from '../../components/Header'
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";

const handlePress=():void=>{
    router.push('/memo/edit')
}

const Detail = ():JSX.Element => {
    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle}>買い物リスト</Text>
                <Text style={styles.memoDate}>2025/05/12 09:00</Text>
            </View>
            <View>
                <ScrollView style={styles.memoBody}>
                <Text style={styles.memoBodyText}>
                    買い物リスト
                    寿限無寿限無五劫の擦り切れ海砂利水魚の雲来松風来松
                    食う寝るところに住むところ
                    パイポパイポパイポのシューリンガンシューリンガンの
                    ポンポコピーのポンポコナーの長久名の長助
                </Text>
                </ScrollView>
            </View>
            <CircleButton style={{top:160,bottom:'auto'}} onPress={handlePress}>
               <Icon name={'pencil'} size={40} color={'pink'}/>
            </CircleButton>
        </View>
    )
}

const styles=StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#fff'
        },
        memoHeader:{
            backgroundColor:'#467fd3',
            height:96,
            justifyContent:'center',
            paddingVertical:24,
            paddingHorizontal:19,
        },
        memoTitle:{
            color:'#ffffff',
            fontSize:20,
            lineHeight:32,
            fontWeight:'bold',
        },
        memoDate:{
            color:'#ffffff',
            fontSize:12,
            lineHeight:16,
        },
        memoBody:{
            paddingHorizontal:27,
            paddingVertical:32,
        },
        memoBodyText:{
            fontSize:16,
            lineHeight:24,
            color:'#000000'
        },
    }
)

export default Detail