import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
import { useTailwind } from 'tailwind-rn';
import logo from '../assets/logo.jpg';
import TimeAgo from 'react-native-timeago';

const ReviewCard = ({ picture, name, content, review, date }) => {
  const tw = useTailwind();
  const baseUrl = 'https://artisanshub.pythonanywhere.com';

  return (
    <View style={tw('w-[99%] mx-auto my-3 bg-white px-3 py-2 rounded')}>
      <View style={tw('flex')}>
        <View style={tw('flex flex-row items-center')}>
          <Image
            style={tw('h-14 w-14 rounded-full')}
            // defaultSource={logo}
            // source={{ uri: baseUrl + picture }}
            source={logo}
          />
          <Text style={tw('text-xl text-center capitalize ml-3')}>{name}</Text>
        </View>
        <View style={tw('pr-2 flex  flex-row justify-start ')}>
          <AirbnbRating
            count={5}
            defaultRating={review}
            // onFinishRating={ratingCompleted}
            size={15}
            showRating={false}
            isDisabled
            starContainerStyle={tw(' mr-0')}
          />
          {/* <Text>({review})</Text> */}
          <Text>({<TimeAgo time={date} />})</Text>
        </View>
        <View style={tw('flex flex-col justify-center items-center')}></View>
        <Text style={tw('')}>{content}</Text>
        <View style={tw('flex flex-row justify-between mt-2')}>
          <Text style={tw('text-lg')}>Was This Review Helpful?</Text>
          <View style={tw('flex flex-row ')}>
            <TouchableOpacity style={tw('')}>
              <Text
                style={tw(
                  'px-2 py-0.5 text-center border-gray-400 border mx-1 rounded-lg'
                )}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw('')}>
              <Text
                style={tw(
                  'px-2 py-0.5 text-center border-gray-400 border mx-1 rounded-lg'
                )}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;
