import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import shop from '../assets/images/shop5.jpg';
import { useTailwind } from 'tailwind-rn/dist';

const Card = (company) => {
  console.log(company);
  const tw = useTailwind();
  return (
    <View key={company.id} style={tw('border border-gray-200 ml-1 rounded-xl')}>
      <Image
        style={tw('w-64 h-32 m-1 rounded-md')}
        source={{ uri: company.image }}
      />

      <View style={tw('mx-2 ')}>
        <Text style={tw('text-lg font-semibold')}>{company.name}...</Text>
        <Text style={tw('text-gray-400 font-semibold')}>@Aunty</Text>
        <Text style={tw('text-lg')}>{company.description}</Text>
        <View style={tw('w-full flex justify-center items-center')}>
          <TouchableOpacity
            style={tw(
              'bg-[#570606] w-32 text-center  py-3 px-4 text-white rounded-xl m-2'
            )}
          >
            <Text style={tw('text-white text-lg text-center w-full')}>
              Call Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;
