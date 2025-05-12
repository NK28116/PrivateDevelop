import {View , StyleSheet} from 'react-native'
import {JSX} from "react";
import Header from '../../components/Header'
import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton";
import {Feather} from "@expo/vector-icons";
import Icon from '../../components/Icon'

const List = () :JSX.Element=> {
  return(
      <View style={styles.container}>
          <Header />
          <View>
              <MemoListItem memoListName={'買い物'} ></MemoListItem>
              <MemoListItem memoListName={'やること'} ></MemoListItem>
              <MemoListItem memoListName={'勉強'} ></MemoListItem>
          </View>
          <CircleButton>
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