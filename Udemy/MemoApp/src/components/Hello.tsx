import {View,Text,StyleSheet,type TextStyle} from "react-native";
import {JSX} from "react";

interface Props {//これらはHelloに必ず渡す
    children:string
    bang?: boolean//"?"はオプション
    style?:TextStyle
}
//これらはHelloに必ず渡す
const Hello = (props:Props): JSX.Element => {
    //const children =props.children //<Hello>World</Hello>のworld部分
    const {children, bang ,style}=props // 分割代入:propsの中のchildrenプロパティを取り出す
    return(
        <View>
            <Text style={[styles.text , style]}>
                {/* style->styles.textの順に適用される*/}
                Hello {children}{bang ===true ? '!': '@'}
                {/* bangがnullableなのでnullの時はtrueにする条件を追加 */}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        color : '#ffffff',
        backgroundColor : 'blue',
        fontSize:40,
        fontWeight:'bold',
        padding:16,
    }
})

export default Hello