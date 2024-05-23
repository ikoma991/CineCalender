import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { images } from '@/constants';

const Start = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full flex justify-center items-center h-full px-4'>
          <Image source={images.logo} className='w-64' resizeMode='contain' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Start;
