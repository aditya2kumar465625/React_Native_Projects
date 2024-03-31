import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';

const operators = ['+', '-', '*', '/', '%'];

const App = (): JSX.Element => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [oldResult, setOldResult] = useState('');

  const setExpression = (btnPressed: string) => {
    if (operators.includes(btnPressed)) {
      handleOperator(btnPressed);
    } else {
      if(input.length < 50){
      setInput(prevInput => prevInput + btnPressed);
    
          }
        else {
          return ;
        }    }
  };

  const handleOperator = (btnPressed: string) => {
    const operator = input[input.length - 1];
    if (!operators.includes(operator)) {
      setInput(prevInput => prevInput + btnPressed);
    } else {
      setInput(prevInput => prevInput.slice(0, -1) + btnPressed);
    }
  };

  const handleResult = () => {
    
    try {
      const res = eval(input);
   
      
      setResult(res.toString());
       
        if(res.toString() === oldResult){
          setInput(res.toString());
        }
        console.log(res)
      setOldResult(res.toString())
    } catch (error) {
      if (operators.includes(input[input.length - 1])) {
        const res = eval(input.slice(0, -1));
        setResult(res.toString());
        
        if(res.toString() === oldResult){
          setInput(res.toString());
        }

        setOldResult(res.toString())
      } else {
        setResult('Error');
      }
    }
   
  };

  const handleClear = () => {
    setInput('');
    if(input === ''){
      setResult('');
    }
  };

  const handleClearOne = () => {
    setInput(prevInput => prevInput.slice(0, -1));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calculator}>
        <View
          style={{
            height: 90,

            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'right',
              color: 'black',
              fontSize: 14,
            }}>
            {input}
          </Text>
        </View>
        <View style={styles.display}>
          <Text style={styles.displayText}>{result}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleClear();
              }}>
              <Text style={styles.buttonText}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleClearOne();
              }}>
              <Text style={styles.buttonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('%')}>
              <Text style={styles.buttonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('/')}>
              <Text style={styles.buttonText}>/</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('7')}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('8')}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('9')}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('*')}>
              <Text style={styles.buttonText}>*</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('4')}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('5')}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('6')}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('-')}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('1')}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('2')}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('3')}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('+')}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={{
                width: '44%',
                backgroundColor: '#5e69ee',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: 'auto',
              }}>
              <Text
                style={styles.buttonText}
                onPress={() => setExpression('0')}>
                0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpression('.')}>
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleResult()}>
              <Text style={styles.buttonText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculator: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    height: '95%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'space-between',
    padding: 10,
  },
  display: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    height: 70,
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
  },
  displayText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'right',
  },
  buttons: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5e69ee',
    borderRadius: 10,
    width: '22%',
    elevation: 10,
    shadowColor: 'black',

    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default App;
