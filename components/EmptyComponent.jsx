import { View, Text } from 'react-native'
const EmptyComponent = ({title}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100 }}>
            <Text style={{ fontSize: 18, color: 'red', textAlign: 'center' }}>
                {title}
            </Text>
        </View>
    )
}
export default EmptyComponent