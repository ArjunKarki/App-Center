/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CodePush from 'react-native-code-push';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const CodePushOptions = {
  installMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: true,
};

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [status, setStatus] = useState('NOOOOO...');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const codePushStatusDidChange = (syncStatus: any) => {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setStatus('Checking for update.');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setStatus('Downloading package.');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        setStatus('Awaiting user action.');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setStatus('Installing update.');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setStatus('App up to date.');
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setStatus('Update cancelled by user.');
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setStatus('Update installed and will be applied on restart.');
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setStatus('An unknown error occurred.');
        break;
      default:
        setStatus('Fuck off..........');
    }
  };

  useEffect(() => {
    syncImmediate();
  }, []);

  const syncImmediate = () => {
    CodePush.sync(
      {installMode: CodePush.InstallMode.IMMEDIATE},
      codePushStatusDidChange,
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={{fontSize: 20, color: 'black'}}>{status}</Text>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const MyApp = CodePush(CodePushOptions)(App);
export default MyApp;
