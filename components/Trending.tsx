import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Movie } from '@/utils/Api';

interface TrendingProps {
  trendingMovies: Movie[] | null;
}

interface TrendingItemProps {
  item: Movie;
}
const TrendingItem: React.FC<TrendingItemProps> = ({ item }) => {
  return (
    <View className='h-72 w-40 items-center'>
      <View className='mb-2 w-36 h-44'>
        <Image
          source={{ uri: item.image }}
          className='w-full h-full rounded-lg'
        />
      </View>
      <View>
        <Text className='text-white font-psemibold text-base text-center'>
          {item.title} - {item.releaseDate}
        </Text>
        <Text className='text-white font-psemibold text-center'>
          {item.type}
        </Text>
        <View className='flex flex-row items-center justify-center gap-1'>
          <MaterialIcons name='star' size={24} color={'#FF9C01'} />
          <Text className='text-white text-base'>
            {item.rating.toFixed(1)}/10
          </Text>
        </View>
      </View>
    </View>
  );
};
const Trending: React.FC<TrendingProps> = ({ trendingMovies }) => {
  if (trendingMovies?.length === 0) {
    return (
      <ActivityIndicator color={'#FF9C01'} size={'large'} className='mt-8' />
    );
  }
  return (
    <FlatList
      className='w-96 self-center'
      data={trendingMovies}
      horizontal
      scrollEventThrottle={16}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TrendingItem item={item} />}
      ListEmptyComponent={() => {
        return <Text className='text-white'> No Movies Found </Text>;
      }}
    />
  );
};

export default Trending;
