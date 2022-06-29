import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Linking,
  TextInput,
  Button,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// import { ImageBackground } from 'react-native-web';
import { useTailwind } from 'tailwind-rn';
import logo from '../assets/logo2.jpg';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faStar,
  faMailBulk,
  faBackward,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import TimeAgo from 'react-native-timeago';
import { AirbnbRating, Rating } from 'react-native-ratings';
import Modal from 'react-native-modal';
import ReviewCard from './ReviewCard';
import logo1 from '../assets/logo.jpg';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
const CardDetail = () => {
  // creating comment toggle
  const [isCommentVisible, setCommentVisible] = useState(false);

  const toggleComment = () => {
    setCommentVisible(!isCommentVisible);
  };
  // initializing toggle for modal

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const tw = useTailwind();
  const navigation = useNavigation();
  const stateData = navigation.getState().routes[2];
  // console.log('detailded data', stateData);
  // useEffect(() => {

  // }, []);reciever
  const categoryData = stateData.params.details;
  // console.log(categoryData);
  const baseUrl = 'https://artisanshub.pythonanywhere.com';

  // fetching the reviews
  const [userReview, setUserReview] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://artisanshub.pythonanywhere.com/api/reviews/${categoryData.Owner.id}/`
      )
      .then((res) => {
        if (res.data.status === 'failed') {
          setUserReview([]);
        } else {
          setUserReview(res.data);
        }
      })
      .catch((err) => {
        Toast.show(err.message);
      });
  }, []);
  console.log('data', userReview);

  userReview.map((res) => {
    console.log(res.reciever.reviews);
  });

  // code for rating
  const rating = (rate) => {
    const displayRate = [];
    // return()
    for (let index = 1; index <= rate; index++) {
      displayRate.push(
        <FontAwesomeIcon
          // key={index}
          style={tw(' flex flex-row text-[#570606] m-1')}
          icon={faStar}
          key={index}
        />
      );
    }
    return displayRate;
  };

  const UnRated = (rateNo) => {
    const unRated = [];
    // return()
    for (let index = 1; index <= rateNo; index++) {
      unRated.push(
        <FontAwesomeIcon
          style={tw(' flex flex-row text-green-600 m-1 opacity-80')}
          icon={faStar}
          key={index}
        />
      );
    }
    return unRated;
  };
  // creating review of the services provided
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(0);

  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
    setUserRating(rating);
  };
  const handleSubmit = () => {
    const body = {
      userRating,
      comment,
    };
    console.log(body);
  };
  //caculating users reviews

  return (
    <SafeAreaView style={tw('pt-6 w-full h-full')}>
      <ScrollView style={tw('w-full h-full')}>
        <ImageBackground
          style={tw('w-full h-[200px] rounded-lg flex justify-end ')}
          source={{ uri: baseUrl + categoryData.image }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw(
              'justify-center -top-1/2 mx-3 bg-[#570606]  p-3 rounded-full w-10 h-10 justify-center items-center'
            )}
          >
            <FontAwesomeIcon icon={faBackward} style={tw('text-white')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleComment}
            style={tw(
              'bg-orange-500 rounded-xl w-32 justify-center items-center m-2 text-white py-3 px-1'
            )}
          >
            <Text style={tw('text-white font-bold')}>Write Review</Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={tw('flex flex-row justify-between w-[90%] mb-4 mt-2')}>
          <Text style={tw('text-gray-900 text-base font-bold w-2/3 ml-4')}>
            {categoryData.name}
          </Text>
          <Image
            style={tw('w-24 h-24 m-1 rounded-full -mt-14 ml-6')}
            source={
              !categoryData.Owner.image
                ? logo
                : { uri: baseUrl + categoryData.Owner.image }
            }
            defaultSource={logo}
          />
        </View>
        <View style={tw('w-[90%] mx-auto -mt-10')}>
          <View style={tw(' mb-6 mt-4 h-8 flex flex-row  ')}>
            <AirbnbRating
              count={5}
              reviews={[]}
              defaultRating={categoryData.Owner.rating}
              // onFinishRating={ratingCompleted}
              size={20}
              isDisabled
              starContainerStyle={tw('flex justify-center')}
            />
            <Text style={tw('text-base -mb-2 mt-4 ')}>
              (
              {userReview.map((reviews) => (
                <Text style={tw('')}>{reviews.reciever.reviews}</Text>
              ))}
              )
            </Text>
          </View>
          <View style={tw('w-full flex justify-center items-center mb-4')}>
            <TouchableOpacity
              style={tw(
                'bg-[#570606] w-full text-center  py-3 px-4 text-white rounded-xl m-2'
              )}
              onPress={() => Linking.openURL(`tel:${categoryData.phone}`)}
            >
              <Text style={tw('text-white text-lg text-center w-full')}>
                Contact owner
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw('justify-center items-center')}>
            <Text
              style={tw(
                'uppercase font-semibold text-lg justify-center p-1 rounded items-center text-center mb-5 border'
              )}
            >
              Shop Description
            </Text>
          </View>
          <Text style={tw('text-lg')}>{categoryData.description}</Text>
        </View>
        <View style={tw('w-[90%] mx-auto mt-6')}>
          <View style={tw('justify-center items-center')}>
            <Text
              style={tw(
                'uppercase font-semibold text-lg justify-center p-1 rounded items-center text-center mb-5 border'
              )}
            >
              Contact Information
            </Text>
          </View>

          <Text style={tw('font-semibold')}>
            <Text style={tw('font-bold pr-2 text-lg')}>
              {/* <FontAwesomeIcon icon={faMailBulk} size={16} />: */}
              Email:{' '}
            </Text>
            <Text style={tw('pr-2 font-bold text-base')}>
              {categoryData.Owner.user.email || 'No Contact Email'}
            </Text>
          </Text>
          <Text style={tw('font-semibold mt-2')}>
            <Text style={tw('text-xl font-bold pl-2')}>Phone: </Text>
            <Text style={tw('font-bold m-2 text-base')}>
              {categoryData.phone || 'No Contact Number'}
            </Text>
          </Text>
        </View>

        <View style={tw('w-[90%] mx-auto mt-6 pb-4')}>
          <View style={tw('justify-center items-center')}>
            <Text
              style={tw(
                'uppercase font-semibold text-lg justify-center p-1 rounded items-center text-center mb-5 border'
              )}
            >
              Owner's Details
            </Text>
          </View>

          <Text style={tw('font-semibold')}>
            <Text style={tw('font-bold pr-2 text-lg')}>First Name: </Text>
            <Text style={tw('pr-2 font-bold text-base capitalize')}>
              {categoryData.Owner.user.first_name || 'No First Name'}
            </Text>
          </Text>
          <Text style={tw('font-semibold mt-2')}>
            <Text style={tw('text-xl font-bold pl-2 ')}>Last Name: </Text>
            <Text style={tw('font-bold m-2 text-base capitalize')}>
              {categoryData.Owner.user.last_name || 'No Last Name'}
            </Text>
          </Text>
          <View style={tw('font-semibold mt-2 flex flex-row')}>
            <Text style={tw('text-xl font-bold pl-2 ')}>Rating: </Text>
            <View style={tw('font-bold  text-base capitalize')}>
              <View style={tw(' text-[#570606]')}>
                {/* <FontAwesomeIcon style={tw('')} icon={faStar} /> */}
                {/* {rating(categoryData.rating)}
                {UnRated(5 - categoryData.rating)} */}
                <View style={tw(' px-1')}>
                  <AirbnbRating
                    count={5}
                    reviews={[]}
                    defaultRating={categoryData.rating}
                    // onFinishRating={ratingCompleted}
                    size={20}
                    showRating={false}
                    isDisabled
                    starContainerStyle={tw('mt-1')}
                  />
                </View>
              </View>
            </View>
          </View>
          <Text style={tw('font-semibold mt-2')}>
            <Text style={tw('text-xl font-bold pl-2 ')}>Working since: </Text>
            <Text style={tw('font-bold m-2 text-base capitalize')}>
              <View
                style={tw(
                  'flex flex-row text-[#570606] capitalize mt-1 font-bold'
                )}
              >
                <TimeAgo time={categoryData.Owner.user.date_joined} />
              </View>
            </Text>
          </Text>
          {/* displaying reviews */}
          <View style={tw('w-[90%] mt-4')}>
            <Text style={tw('text-2xl font-bold flex  text-center ')}>
              Reviews And Ratings
            </Text>

            {userReview.length > 0 ? (
              userReview?.slice(0, 3).map((review) => (
                <View style={tw('')}>
                  <ReviewCard
                    key={review.id}
                    name={review.sender.user.username}
                    picture={logo1}
                    content={review.comment}
                    review={review.rating}
                  />
                </View>
              ))
            ) : (
              <Text style={tw('text-2xl font-bold my-3 flex flex-row')}>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  size={20}
                  style={tw('text-gray-700')}
                />{' '}
                No Review,be the first
              </Text>
            )}
            {userReview.length < 1 ? (
              <Text>""</Text>
            ) : (
              <Button
                title="See More Review"
                color="#570606"
                onPress={toggleModal}
              />
            )}

            <Modal isVisible={isModalVisible} animationIn="wobble">
              <View style={tw('w-full bg-gray-200 flex-1 ')}>
                <View style={tw('mb-5 ')}>
                  <Button title="Close" onPress={toggleModal} color="#570606" />
                </View>
                <ScrollView style={tw('px-4')}>
                  {userReview.map((review) => (
                    <View style={tw('')}>
                      <ReviewCard
                        key={review.id}
                        name={review.sender.user.username}
                        picture={logo1}
                        content={review.comment}
                        review={4}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Modal>
          </View>
          <View style={tw('w-[90%] mx-auto mt-6')}>
            {/* rating review code */}
            {/* <Button
              title="Write Review"
              color="#570606"
              onPress={toggleComment}
            /> */}
            <Modal isVisible={isCommentVisible}>
              <View style={tw('w-full h-2/3 rounded-xl bg-gray-200  pb-6')}>
                <View style={tw('mb-5 ')}>
                  <Button
                    title="Close"
                    onPress={toggleComment}
                    color="#570606"
                  />
                </View>
                <AirbnbRating
                  count={5}
                  reviews={[
                    'Terrible',
                    'Bad',
                    'OK',
                    'Good',
                    'Very Good',
                    'Amazing',
                  ]}
                  defaultRating={1}
                  onFinishRating={ratingCompleted}
                  size={20}
                />
                <TextInput
                  style={tw(
                    ' w-full h-24 py-8 border mt-6 rounded-md px-4 bg-gray-200 border-gray-300'
                  )}
                  placeholder="Comment here..."
                  value={comment}
                  onChangeText={(text) => setComment(text)}
                />

                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={tw(
                    'bg-green-600 justify-center mt-8 items-center w-full px-1 py-3 rounded-xl'
                  )}
                >
                  <Text style={tw('text-base text-white')}>Rate</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

export default CardDetail;
