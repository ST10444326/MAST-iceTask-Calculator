import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleOperation = (operation) => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    // Reset error message
    setError('');

    if (isNaN(number1) || (isNaN(number2) && operation !== 'sqrt')) {
      setError('Please enter valid numbers');
      return;
    }

    if (operation === '/' && number2 === 0) {
      setError('Division by zero is not allowed');
      return;
    }

    let calcResult;

    switch (operation) {
      case '+':
        calcResult = number1 + number2;
        break;
      case '-':
        calcResult = number1 - number2;
        break;
      case 'x':
        calcResult = number1 * number2;
        break;
      case '/':
        calcResult = number1 / number2;
        break;
      case '^':
        calcResult = Math.pow(number1, number2);
        break;
      case 'sqrt':
        if (number1 < 0) {
          setError('Cannot calculate the square root of a negative number');
          return;
        }
        calcResult = Math.sqrt(number1);
        break;
      default:
        return;
    }

    setResult(calcResult);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />

      {error !== '' && <Text style={styles.errorText}>{error}</Text>}

      {result !== null && <Text style={styles.resultText}>Result: {result}</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('x')}>
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('^')}>
          <Text style={styles.buttonText}>^</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('sqrt')}>
          <Text style={styles.buttonText}>√</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 22,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 19,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '15%',
    height: 42.5,
    backgroundColor: '#f18973',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 35,
  },
});

export default Calculator;
