import {View,Text,StyleSheet} from 'react-native'
import {JSX} from "react";

interface Props{
    memoListName:string
}

const MemoListItem = (props:Props) : JSX.Element => {
    const{memoListName}=props
    return(
        <View style={styles.memoListItems}>
            {/*左側*/}
            <View>
                <Text style={styles.memoListTitle}>{memoListName}リスト</Text>
                <Text style={styles.memoListDate}>2025/05/10</Text>
            </View>
            {/*右側*/}
            <View>
                <Text>X</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    memoListItems:{
        backgroundColor:'#ffffff',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:16,
        paddingHorizontal:19,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'rgba(0,0,0,0.15)'
    },
    memoListTitle:{
        fontSize:16,
        lineHeight:32,
    },
    memoListDate:{
        fontSize:12,
        lineHeight:16,
        color:'#848484'
    },
})

export default MemoListItem