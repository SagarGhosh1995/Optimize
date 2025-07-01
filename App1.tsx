/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Video, { ResizeMode } from 'react-native-video';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const onBuffer = () => {

  }

  const onError = () => {

  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <NewAppScreen templateFileName="App.tsx" /> */}
      <Video
        // Can be a URL or a local file.
        source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
        // Callback when remote video is buffering                                      
        onBuffer={onBuffer}
        // Callback when the video cannot be loaded              
        onError={onError}
        style={{
          height: 400,
          width: 400
        }}
        muted
        controls
        resizeMode={ResizeMode.STRETCH}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
