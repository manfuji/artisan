import { View, Text, Image } from 'react-native';
import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
import { useTailwind } from 'tailwind-rn';

const ReviewCard = ({ picture, name, content, review }) => {
  const tw = useTailwind();

  return (
    <View
      style={tw(
        'w-[99%] mx-auto justify-center items-center my-3 bg-white px-1 py-2 rounded'
      )}
    >
      <View style={tw('flex flex-row ')}>
        <Image style={tw('h-14 w-14 rounded-full')} source={picture} />
        <View style={tw('pl-2 flex flex-col')}>
          <Text style={tw('text-xl font-bold text-center')}>{name}</Text>
          <View style={tw('flex flex-col justify-center items-center')}>
            <AirbnbRating
              count={5}
              defaultRating={review || 3}
              // onFinishRating={ratingCompleted}
              size={20}
              showRating={false}
              isDisabled
              starContainerStyle={tw(' mr-0')}
            />
          </View>
          <Text style={tw('')}>{content}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;
