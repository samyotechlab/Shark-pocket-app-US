import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Iconics from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default function WalletCard({
    icon,
    label,
    amount,
    buttonText,
    buttonIcon,
    buttonIconComponent: IconComponent,
    onPress,
}) {
    return (
        <View style={styles.row}>
            <View style={styles.iconContainer}>
                <LinearGradient
                    colors={['#3E180E1A', '#FFFFFF1A']}
                    style={styles.iconGradient}
                >
                    <Iconics name={icon} size={20} color="white" />
                </LinearGradient>
            </View>
            <View style={[styles.textContainer, { flex: buttonText ? 1 : 2 }]}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.amount}>₹ {amount.toFixed(2)}</Text>
            </View>
            {buttonText && (
                <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
                    {buttonText === 'ADD CASH' ? (
                        <LinearGradient
                            colors={['#67FF00', '#67FF00', '#3E9900']}
                            style={styles.addCashButton}
                        >
                            <Text style={styles.buttonText}>{buttonText}</Text>
                        </LinearGradient>
                    ) : (
                        <View style={styles.withdrawButton}>
                            {IconComponent && (
                                <IconComponent
                                    name={buttonIcon}
                                    size={30}
                                    color="white"
                                    style={styles.lockIcon}
                                />
                            )}
                            <Text style={styles.buttonText}>{buttonText}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
}