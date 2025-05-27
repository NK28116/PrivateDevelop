import {View, StyleSheet, Text, FlatList} from 'react-native'
import {JSX, useEffect,useState} from "react";
import {collection, onSnapshot,query,orderBy } from 'firebase/firestore'
import {router ,useNavigation} from "expo-router";

import Header from '../../components/Header'
import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton";
import {Feather} from "@expo/vector-icons";
import Icon from '../../components/Icon'
import LogOutButton from "../../components/logout";
import {db,auth} from "@/firebaseConfig";
import {type Memo} from "@/types/memo";


const handlePress =():void=>{
    router.push('/memo/create')
}

const List = () :JSX.Element=> {
    const [memos,setMemos]=useState<Memo[]>([])
    const navigation=useNavigation()
    useEffect(()=>{
        navigation.setOptions({
            headerRight:()=>{
                return <LogOutButton />
            }
        })
    },[])
    useEffect(()=>{
        if(auth.currentUser === null){return}
        const ref=collection(db,`users/${auth.currentUser.uid}/memos`)
        const q =query(ref,orderBy(`updatedAt`,'desc'))
        const unsubscribe= onSnapshot(q,(snapshot)=>{
            const remoteMemos:Memo[]=[]//remoteMemosの型が決まってないとダメ->types/memo.ts
            snapshot.forEach((doc)=>{
                //console.log("list.tsx/unscribe:",'memo',doc.data())
                const {bodyText,updatedAt}=doc.data()
                remoteMemos.push({
                    id:doc.id,
                    bodyText,
                    updatedAt,
                })
            })
            setMemos(remoteMemos)
        })
        return unsubscribe//画面が消えた時に監視を止める
    },[])

    return(
        <View style={styles.container}>
            <FlatList
                data={memos}
                renderItem ={({item})=><MemoListItem memo={item} />}
          />
          <CircleButton onPress={handlePress}>
              <Icon name={'plus'} size={40} color={'red'}/>
          </CircleButton>
      </View>
  )
}

const styles=StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#fff'
        }
    }
)

export default List