import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import * as Font from 'expo-font';
const StopwatchApp: React.FC = () => {

  //nor working
  // const fetchFonts = async () => {
  //   await Font.loadAsync({
  //     'custom-font': require('./assets/fonts/DS-DIGIT.ttf'),
  //   });
  //   console.log(Font.isLoaded('custom-font')); // Check if the custom font is loaded
  // };
  
  // fetchFonts();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
SystemNavigationBar.setNavigationColor('black')
SystemNavigationBar.setNavigationBarContrastEnforced(true)
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      stopStopwatch();
    }
  };

  const stopStopwatch = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (time: number): string => {

    
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);
    console.log("minutes : "+Math.floor((time/60000)%60))
    console.log("seconds : "+Math.floor((time/1000)%60))
    console.log("milliseconds : "+Math.floor((time/10)%100 ))

    return `${formatDigit(minutes)}:${formatDigit(seconds)}:${formatDigit(milliseconds)}`;
  };

  const formatDigit = (digit: number): string => {
    return digit < 10 ? '0' + digit : String(digit);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'}/>
      <Text style={[styles.timeText]}>{formatTime(elapsedTime)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={startStopwatch}>
          <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : 'black'
  },
  timeText: {
    fontSize: 112,
    color : 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    
  },
  buttonContainer: {
    flexDirection: 'row',

    
  },
  button: {
    backgroundColor: '#494F55',
    borderRadius: 10,
    
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default StopwatchApp;
