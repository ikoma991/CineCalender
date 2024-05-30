import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Api, Movie } from '@/utils/Api';
import Trending from '@/components/Trending';
const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    Api.getTrendingMovies().then((data) => {
      setTrendingMovies(data.results.slice(0, 5));
    });
  }, []);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex flex-row pt-5 pb-2'>
        <Image
          source={images.logo}
          className='w-40 h-10 ml-2'
          resizeMode='contain'
        />
      </View>
      <View>
        <Text className='text-secondary font-pbold text-lg font-p my-3 ml-2'>
          TRENDING
        </Text>
      </View>
      <Trending trendingMovies={trendingMovies} />
    </SafeAreaView>
  );
};

export default Home;
