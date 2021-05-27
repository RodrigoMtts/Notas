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
        color: whiteColor
    },
    bodyCard:{
        fontSize: 14,
        paddingHorizontal: 18,
        paddingBottom: 10,
        color: whiteColor
    },
    menu:{
        color: whiteColor,
        fontSize: 30,
        alignSelf: 'center'
    }
})

export default Styles;