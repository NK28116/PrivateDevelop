import { View , Text , StyleSheet ,ScrollView} from 'react-native'
import {JSX, useEffect,useState} from "react";
import {Feather} from "@expo/vector-icons";
import {router,useLocalSearchParams} from "expo-router";
import {onSnapshot,doc} from "firebase/firestore";

import Header from '../../components/Header'
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";
import {auth,db} from "../../config";
import {type Memo} from "../../../types/memo";

const handlePress=():void=>{
    router.push('/memo/edit')
}

const Detail = ():JSX.Element => {
    const id=useLocalSearchParams()//listで選択したアイテムのid
    console.log(id)
    const [memo,setMemo]=useState<Memo|null>(null)
    useEffect(()=>{
        if(auth.currentUser ===null){return}
        const ref=doc(db,`users/${auth.currentUser.uid}/memmos`, String(id))
        onSnapshot(ref,(memoDoc)=>{
            console.log(memoDoc)
        })
    },[])//memoのデータを監視
    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle} numberOfLines={1}>{memo?.bodyText}</Text>
                <Text style={styles.memoDate}>{memo?.updatedAt?.toDate().toLocaleString('ja-JP')}</Text>
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
            <CircleButton style={{top:60,bottom:'auto'}} onPress={handlePress}>
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