import {Redirect} from "expo-router";
import {JSX} from 'react'

const Index = ():JSX.Element => {
    return<Redirect href={'memo/detail'} />
}

export default Index