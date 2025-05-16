import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {JSX} from "react";
import {Link} from "expo-router"

import Icon from './Icon'
import {type Memo} from "../../types/memo";
interface Props{
    memo: Memo
}

const MemoListItem = (props:Props) : JSX.Element|null => {
    const{ memo } = props
    const {bodyText,updatedAt}=memo
    if(bodyText===null||updatedAt===null){return null}
    const dataString = updatedAt.toDate().toLocaleString('ja-JP')
    return(
        <Link href={'/memo/detail'} asChild>
        <TouchableOpacity style={styles.memoListItems}>
            {/*左側*/}
            <View>
                <Text numberOfLines={1} style={styles.memoListTitle}>{bodyText}</Text>
                {/**/}
                <Text style={styles.memoListDate}>{dataString}</Text>
            </View>
            {/*右側*/}
            <TouchableOpacity>
                <Icon name='delete' size={32} color='#B0B0B0' />
            </TouchableOpacity>
        </TouchableOpacity>
        </Link>
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