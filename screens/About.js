import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMedal, faHome} from '@fortawesome/free-solid-svg-icons';
import content from '../constants/aboutPageContent';

const Medal = ({title, ...props}) => (
  <TouchableOpacity className="flex items-center w-28 py-2" {...props}>
    <FontAwesomeIcon icon={faMedal} size={36} />
    <Text style={{fontFamily: 'Poppins-Medium'}} {...props}>
      {title}
    </Text>
  </TouchableOpacity>
);
export default function About() {
  const [changeContent, setChangeContent] = useState(0);
  return (
    <ScrollView>
      <View className="px-4 pt-4">
        <Text
          className="text-lg text-gray-600"
          style={{fontFamily: 'BalooBhai2-Bold'}}>
          About Our Company
        </Text>
        <View className="h-[1px] bg-slate-400 mt-1 mb-2 " />

        <Text style={{fontFamily: 'Poppins-Medium'}}>
          The feedback from our clients is important to us at Agriculture
          Monitoring System. As a reputable used vehicle dealership in Quentin
          Rise, Livingston, Midlothian, it is our goal to develop strong bonds
          with each of our clients. Therefore, if you have any concerns about
          our hardware units or services, don't hesitate to get in touch with us
          by phone or email. We also always appreciate your comments and
          suggestions.
        </Text>

        <Text className="mt-2" style={{fontFamily: 'Poppins-Medium'}}>
          Our friendly service will go beyond and above to make sure you get the
          guidance you require. The majority of our clients return to us because
          of this.
        </Text>

        <View className="flex flex-row justify-between flex-wrap my-4">
          <Medal
            onPress={() => setChangeContent(0)}
            title="Our Mission"
            className="bg-gray-400 text-black rounded-md shadow"
          />
          <Medal
            onPress={() => setChangeContent(1)}
            title="Our Vision"
            className="bg-blue-400 text-white rounded-md shadow"
          />
          <Medal
            onPress={() => setChangeContent(2)}
            title="Our Value"
            className="bg-green-500 text-white rounded-md shadow"
          />
        </View>

        <Text
          className="my-2 border-[1px] border-gray-500 p-1   text-gray-500 bg-white"
          style={{fontFamily: 'Poppins-Medium'}}>
          {content[changeContent]?.text}
        </Text>

        <View className="mt-4">
          <Text
            className="text-lg text-gray-600"
            style={{fontFamily: 'BalooBhai2-Bold'}}>
            Contact Us
          </Text>
          <View className="h-[1px] bg-slate-400 mt-1 mb-2 rounded " />
          <View className="bg-[#103D49] p-2 mb-2">
            <Text
              className="text-white text-base"
              style={{fontFamily: 'BalooBhai2-Bold'}}>
              Address
            </Text>
            <Text
              className="text-white"
              style={{fontFamily: 'Poppins-Regular'}}>
              59 Quentin Rise Livingstone EH54 6NT
            </Text>
          </View>

          <View className="bg-[#103D49] p-2 mb-2 rounded">
            <Text
              className="text-white text-base"
              style={{fontFamily: 'BalooBhai2-Bold'}}>
              Contact
            </Text>
            <Text
              className="text-white"
              style={{fontFamily: 'Poppins-Regular'}}>
              Phone: 07881678509
            </Text>

            <Text
              className="text-white"
              style={{fontFamily: 'Poppins-Regular'}}>
              Email: contact@mycodehub.co.uk
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
