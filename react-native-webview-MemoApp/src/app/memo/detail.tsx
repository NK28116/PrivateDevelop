import { View , Text , StyleSheet ,ScrollView} from 'react-native'
import {JSX, useEffect,useState} from "react";
import {Feather} from "@expo/vector-icons";
import {router,useLocalSearchParams} from "expo-router";
import {onSnapshot,doc} from "firebase/firestore";

import Header from '../../components/Header'
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";
import {auth,db} from "@/firebaseConfig";
import {type Memo} from "@/types/memo";

const handlePress=(id:string):void=>{
    router.push({pathname:"/memo/edit",params:{id}})
}

const Detail = ():JSX.Element => {
    const id=String(useLocalSearchParams().id)//listで選択したアイテムのid
    //console.log("Detail(id)=",id)
    const [memo,setMemo]=useState<Memo|null>(null)
    useEffect(()=>{
        if(auth.currentUser ===null){return}
        const ref=doc(db,`users/${auth.currentUser.uid}/memos`, id)
        const unsubscribe= onSnapshot(ref,(memoDoc)=>{
            //console.log(memoDoc.data())
            const {bodyText,updatedAt}=memoDoc.data() as Memo
            setMemo({
                id:memoDoc.id,
                bodyText,
                updatedAt,
            })
            // {"id":"4Lz9CzKoh1jwLH733djb"} undefined>
        })
        return unsubscribe//クリーンアップ関数を返すことで、コンポーネントがアンマウントされるときにリスナーを解除する;
    },[])//memoのデータを監視
    //home>user>UJeXGKgOb1QmYVzVPIgcIb57WQu1>memos>BXh3nJMX8cpDefZ9Ib9n
    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle} numberOfLines={1}>{memo?.bodyText}</Text>{/**numberOfLines={1}は最初の1行*/}
                <Text style={styles.memoDate}>{memo?.updatedAt?.toDate().toLocaleString('ja-JP')}</Text>
            </View>
            <View>
                <ScrollView style={styles.memoBody}>
                <Text style={styles.memoBodyText}>
                    {memo?.bodyText}
                </Text>
                </ScrollView>
            </View>
            <CircleButton
            style={{top:60,bottom:'auto'}}
            onPress={()=>{handlePress(id)}}
            >
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
        },
        memoBodyText:{
            paddingVertical:32,
            fontSize:16,
            lineHeight:24,
            color:'#000000'
        },
    }
)

export default Detail