import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CommonHeader from '../../Components/CommonHeader';
import TabNavigation from './TabNavigation';
import Deposite from '../WalletDetails/Deposite';
import Bonus from '../WalletDetails/Bonus';
import Winning from '../WalletDetails/Winning';
import WithDraw from '../WalletDetails/WithDraw';
import AnimatedLoader from '../../Components/AnimatedLoader';
import styles from './styles';

export default function WalletDetails() {
  const route = useRoute();
  const { user_id } = route.params;
  const [selectedTab, setSelectedTab] = useState('Deposite');
  const [loader, setLoader] = useState(false);

  const renderContent = () => {
    if (loader) return <AnimatedLoader />;
    switch (selectedTab) {
      case 'Deposite':
        return <Deposite user_id={user_id} />;
      case 'Bonus':
        return <Bonus user_id={user_id} />;
      case 'Winning':
        return <Winning user_id={user_id} />;
      case 'Withdraw':
        return <WithDraw user_id={user_id} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Wallet Details" />
      <View style={styles.content}>
        <TabNavigation selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      </View>
      <View style={styles.tabContent}>{renderContent()}</View>
    </SafeAreaView>
  );
}

