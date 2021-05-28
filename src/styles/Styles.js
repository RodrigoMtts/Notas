import { StyleSheet } from 'react-native'

const majorColor = '#29292b'
const whiteColor = '#eee'

const Styles = StyleSheet.create({
    majorColor:{
        backgroundColor: majorColor
    },
    header: {
        backgroundColor: majorColor,
    },
    searchBar: {
        backgroundColor: '#4e4e50'
    },
    titleCard:{
        fontSize: 18,
        color: whiteColor,
        padding: 10
    },
    bodyCard:{
        fontSize: 14,
        paddingHorizontal: 10,
        paddingBottom: 10,
        color: whiteColor
    },
    menu:{
        color: whiteColor,
        fontSize: 30,
        alignSelf: 'center'
    },
    archiveAlarmIcon:{
        color: whiteColor,
        marginHorizontal: 5
    }
})

export default Styles;