import {View , Text ,StyleSheet} from 'react-native'
import {JSX} from "react";

const Index = () :JSX.Element=> {
  return(
      <View style={styles.container}>
          {/*<Header>*/}
          <View style={styles.header}>
              <View style={styles.headerInner}>
                  <Text style={styles.headerTitle}>Memo App</Text>
                  <Text style={styles.headerRight}>ログアウト</Text>
              </View>
          </View>
          {/*</Header>*/}
          {/*<body>*/}
          <View>

              <View style={styles.memoListItems}>
                  {/*左側*/}
                  <View>
                      <Text style={styles.memoListTitle}>買い物リスト</Text>
                      <Text style={styles.memoListDate}>2025/05/10</Text>
                  </View>
                  {/*右側*/}
                  <View>
                      <Text>X</Text>
                  </View>
              </View>

              <View style={styles.memoListItems}>
                  {/*左側*/}
                  <View>
                      <Text style={styles.memoListTitle}>やることリスト</Text>
                      <Text style={styles.memoListDate}>2025/05/10</Text>
                  </View>
                  {/*右側*/}
                  <View>
                      <Text>X</Text>
                  </View>
              </View>

              <View style={styles.memoListItems}>
                  {/*左側*/}
                  <View>
                      <Text style={styles.memoListTitle}>勉強リスト</Text>
                      <Text style={styles.memoListDate}>2025/05/10</Text>
                  </View>
                  {/*右側*/}
                  <View>
                      <Text>X</Text>
                  </View>
              </View>

          </View>
          <View style={styles.circleButton}>
              <Text style={styles.circleButtonLabel}>+</Text>
          </View>
          {/*</body>*/}
      </View>
  )
}

const styles=StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#fff'
        },
        header:{
            backgroundColor:'#467FD3',
            height:104,
            justifyContent:'flex-end'
        },
        headerInner:{
            alignItems:'center',
        },
        headerRight:{
            position: 'absolute',
            right:16,
            bottom:16,
            color:'rgba(255,255,255,0.7)'
        },
        headerTitle:{
            marginBottom:8,
            fontSize:22,
            lineHeight:32,
            fontWeight:'bold',
            color:'#fff'
        },
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
    }
)

export default Index