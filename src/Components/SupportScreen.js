import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet
} from 'react-native';
import BackgroundScreen from './BackgroundScreen';
import CommonHeader from './CommonHeader';
import DropDownPicker from "react-native-dropdown-picker";
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { showReason } from '../Service/Bank';
import { helpAndSupport, showIssue } from '../Service/Help&Support';

const SupportScreen = () => {
    const route = useRoute();
    const { user_id } = route.params;
    const [issue, setIssue] = useState([]);
    const [remark, setRemark] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [loader,setLoader] = useState(false)


    useEffect(() => {
        const fetchReasons = async () => {
            try {
                const response = await showIssue();
                console.log("response",response)
                const formattedData = response.map((item) => ({
                    label: item.title,
                    value: item.title,
                }));
                setIssue(formattedData);
            } catch (error) {
                console.log("Error fetching reasons:", error);
            }
        };
        fetchReasons();
    }, []);

    const handleSubmit = async () => {
        setLoader(true)
        try {
            if (!value || !remark.trim()) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Incomplete Details',
                    text2: 'Please select an issue and enter details.',
                    visibilityTime: 3000
                });
                return;
            }
            const data = {
                user_id: user_id,
                title: value,
                description: remark
            }
            const response = await helpAndSupport(data)
            console.log("response",response)
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Request Submitted',
                text2: 'Our team will get back to you shortly.',
                visibilityTime: 3000
            });
            setValue(null);
            setRemark('');
        } catch (error) {
            console.log("error",error)
        }finally{
            setLoader(false)
        }

    };

    return (
        <>
            <BackgroundScreen />
            <CommonHeader title="Help & Support" />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.text}>
                    Need assistance? Select an issue and provide details. Our support team is here to help!
                </Text>

                <View style={styles.section}>
                    <Text style={styles.label}>Select Issue:</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={issue}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setIssue}
                        placeholder="Choose an issue"
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                        textStyle={styles.dropdownText}
                        ArrowDownIconComponent={() => <Icon name="chevron-down" size={22} color="#fff" />}
                        ArrowUpIconComponent={() => <Icon name="chevron-up" size={22} color="#fff" />}
                    />
                </View>

                <TextInput
                    style={styles.remarkInput}
                    placeholder="Describe your issue..."
                    placeholderTextColor="white"
                    value={remark}
                    onChangeText={setRemark}
                    multiline
                />

               <TouchableOpacity
                                           style={[styles.button]}
                                           onPress={handleSubmit}
                                       >
                                           <Text style={[styles.buttonText]}>{loader ? 'Loading...' : 'Submit'}</Text>
                                       </TouchableOpacity>
            </ScrollView>
            <Toast ref={Toast.setRef} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Montserrat-SemiBold',
    },
    section: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
        fontFamily: 'Montserrat-SemiBold',
    },
    dropdown: {
        backgroundColor: '#FFFFFF80',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
    },
    dropdownContainer: {
        backgroundColor: '#361911',
        borderColor: '#fff',
    },
    dropdownText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold',
    },
    remarkInput: {
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#FFFFFF80',
        color: '#fff',
        textAlignVertical: 'top',
        marginTop:20
    },
    button: {
        width: '93%',
        backgroundColor: '#2A1610',
        borderColor: '#F5D236',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#F5D236',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 15,
        marginTop:50
    },
    buttonText: {
        color: '#F5D236',
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
    },
});

export default SupportScreen;
