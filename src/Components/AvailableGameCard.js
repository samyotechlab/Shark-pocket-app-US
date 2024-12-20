import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Game from '../../assets/images/Screens/game1.png'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
const AvailbleGameCard = () => {
    const route = useRoute();

    const navigation = useNavigation();

    const handleNavigation = ()=>{
        if(route.name === "Result"){
            navigation.navigate('LocalGameBoard')
        }else if(route.name === "Home"){
            navigation.navigate("AvailableGame")
        }else{
            navigation.navigate("GameName")
        }
    }
    
    return (
        <TouchableOpacity style={styles.container} onPress={()=>{
            handleNavigation()
        }}>
            <LinearGradient
                colors={['#F38424', '#F7A552', '#F9D479']} 
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0.8, y: 1 }}
                style={styles.card}
            >
                <View style={styles.content}>
                    <Image
                        source={Game}
                        style={styles.characterImage}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.headerText}>
                            GET ₹3000 & PLAY NOW
                        </Text>
                        <Text style={styles.description}>
                            You will get the ₹3000 prize money
                            enroll yourself before game start
                        </Text>
                        <Text style={styles.startText}>
                            Start <Text style={styles.dateText}>30 October</Text>
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>₹ 3000 CASH WIN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
    },
    card: {
        // backgroundColor: '#F8B600',
        borderRadius: 6,
        // padding: 5,
        width: '95%',
        height: 160,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 4,
        borderColor: '#F2E30B',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    characterImage: {
        width: 100,
        height: '120%',
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'Audiowide-Regular',
        color: '#2A1610',
    },
    description: {
        fontSize: 12,
        color: '#000000',
        marginVertical: 5,
        fontFamily: 'Montserrat-Bold'
    },
    startText: {
        fontSize: 14,
        color: '#FFFFFF',
        fontFamily: 'Audiowide-Regular',
        fontSize: 16
    },
    dateText: {
        color: '#FFFFFF',
        paddingHorizontal: 5,
        borderRadius: 3,
        fontFamily: 'Audiowide-Regular',
        fontSize: 16
    },
    buttonContainer: {
        alignItems: 'flex-start',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#3E2723',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        borderColor: '#F5D236',     
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Inter_18pt-Bold',
        color: '#FFDC4D',
        letterSpacing: 1,
        textShadowColor: '#F88600',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 15,
    },
});
export default AvailbleGameCard;


