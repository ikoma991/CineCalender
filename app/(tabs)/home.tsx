import { View, Text, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Movie, getTrendingMovies } from '@/lib/getTrendingMovies';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    getTrendingMovies().then((data) => {
      setTrendingMovies(data.results.slice(0, 5));
    });
  }, []);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex flex-row pt-5'>
        <Image
          source={images.logo}
          className='w-40 h-10'
          resizeMode='contain'
        />
      </View>
      <View>
        <Text className='text-secondary font-pbold text-lg font-p my-3 ml-2'>
          TRENDING
        </Text>
      </View>
      <FlatList
        className='w-96 self-center'
        data={trendingMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className='h-72 w-40 items-center'>
            <Image source={{ uri: item.image }} className='w-36 h-48 mb-2' />
            <Text className='text-white font-psemibold text-base text-center'>
              {item.title} - {item.releaseDate}
            </Text>
            <Text className='text-white font-psemibold'>{item.type}</Text>
          </View>
        )}
        ListEmptyComponent={() => {
          return <Text className='text-white'> EMPTY </Text>;
        }}
        horizontal
      />
    </SafeAreaView>
  );
};

export default Home;
