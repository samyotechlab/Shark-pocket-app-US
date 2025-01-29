import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function InfoModal({ isVisible, close ,data}) {
    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={close}
        >
            <View style={styles.centeredView}>
                <LinearGradient style={styles.modalView}
                    colors={['#F38424', '#F7A552', '#F9D479']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0.8, y: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={[styles.modalText,{fontSize:hp('2.5%')}]}>Game Information</Text>
                        <Text style={styles.modalText}>
                            {data.game_info}
                        </Text>
                    </ScrollView>
                    <TouchableOpacity
                        style={[
                            styles.playButton,
                            {
                                backgroundColor: '#00b63d',
                                borderTopColor: '#00e968',
                                borderBottomColor: '#018312',
                            },
                        ]}
                        onPress={close}
                    >
                        <Text style={styles.playButtonText}>Close</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    modalView: {
        width: '80%',
        maxHeight: '30%',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: wp('1%'),
        borderColor: '#F2E30B',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: wp('3.5%'),
        color: '#000000',
        fontFamily: 'Audiowide-Regular',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10, // Add some spacing above the button
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    playButton: {
        borderRadius: 8,
        paddingVertical: hp('0.7%'),
        paddingHorizontal: wp('1%'),
        alignItems: 'center',
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 5,
        borderBottomWidth: 5,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOpacity: 0.8,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 11 },
        width: '60%',
        borderTopRightRadius: wp(3.3),
    },
    playButtonText: {
        letterSpacing: 2,
        fontSize: wp('4.5%'),
        fontFamily: 'LilitaOne-Regular',
        color: '#FFFFFF',
        textShadowColor: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textTransform: 'uppercase',
    },
});