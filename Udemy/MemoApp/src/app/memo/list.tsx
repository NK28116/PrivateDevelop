import {View, StyleSheet, Text} from 'react-native'
import {JSX, useEffect} from "react";
import Header from '../../components/Header'
import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton";
import {Feather} from "@expo/vector-icons";
import Icon from '../../components/Icon'
import LogOutButton from "../../components/logout";
import {router ,useNavigation} from "expo-router";

const handlePress =():void=>{
    router.push('/memo/create')
}

const List = () :JSX.Element=> {
    const navigation=useNavigation()
    useEffect(()=>{
        navigation.setOptions({
            headerRight:()=>{
                return <LogOutButton />
            }
        })
    },[])

  return(
      <View style={styles.container}>
          <View>
              <MemoListItem memoListName={'買い物'} ></MemoListItem>
              <MemoListItem memoListName={'やること'} ></MemoListItem>
              <MemoListItem memoListName={'勉強'} ></MemoListItem>
          </View>
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