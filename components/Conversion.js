// components/Conversion.js
import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import tw from "tailwind-react-native-classnames";

const Conversion = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("GHS");
  const [result, setResult] = useState("");

  const convertCurrency = async () => {
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const exchangeRate = response.data.rates[toCurrency];
      const convertedAmount = parseFloat(amount) * exchangeRate;
      setResult(convertedAmount.toFixed(2));
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <Text
        style={[
          tw`text-3xl font-bold mb-8 text-center text-blue-600`,
          { fontFamily: "Arial" },
        ]}
      >
        Currency Converter
      </Text>
      <TextInput
        style={[
          tw`border border-gray-300 rounded-md p-4 w-80 mb-4 bg-white shadow-md`,
          { fontFamily: "Arial" },
        ]}
        placeholder={`Enter amount in ${fromCurrency}`}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <View style={tw`flex flex-row justify-between w-80 mb-4`}>
        <TouchableOpacity
          style={[
            tw`bg-blue-600 rounded-md p-4 flex-1 mr-2 items-center shadow-md`,
            { fontFamily: "Arial" },
          ]}
          onPress={() => {
            setFromCurrency("USD");
            setToCurrency("GHS");
          }}
        >
          <Text style={tw`text-white text-lg`}>USD to GHS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`bg-blue-600 rounded-md p-4 flex-1 ml-2 items-center shadow-md`,
          ]}
          onPress={() => {
            setFromCurrency("GHS");
            setToCurrency("USD");
          }}
        >
          <Text style={tw`text-white text-lg`}>GHS to USD</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[tw`bg-blue-600 rounded-md p-4 w-80 items-center shadow-md`]}
        onPress={convertCurrency}
      >
        <Text style={tw`text-white text-lg`}>Convert</Text>
      </TouchableOpacity>
      {result !== "" && (
        <Text
          style={[tw`text-lg mt-6 text-green-600`, { fontFamily: "Arial" }]}
        >
          {amount} {fromCurrency} is equal to {result} {toCurrency}
        </Text>
      )}
    </View>
  );
};

export default Conversion;
