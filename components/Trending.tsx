import {
  View,
  Text,
  Image,
  FlatList,
  ViewToken,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { CustomAnimation } from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';
import { Movie } from '@/utils/Api';

const zoomIn: CustomAnimation = {
  from: {
    scaleY: 0.9,
    scaleX: 0.9,
  },
  to: {
    scaleY: 1,
    scaleX: 1,
  },
};

const zoomOut = {
  from: {
    scaleY: 1,
    scaleX: 1,
  },
  to: {
    scaleY: 0.9,
    scaleX: 0.9,
  },
};

interface TrendingProps {
  trendingMovies: Movie[] | null;
}

interface TrendingItemProps {
  item: Movie;
  activeItem: number | null;
}
const TrendingItem: React.FC<TrendingItemProps> = ({ item, activeItem }) => {
  return (
    <Animatable.View
      className='h-72 w-40 items-center'
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={500}
    >
      <Image
        source={{ uri: item.image }}
        className='w-36 h-48 mb-2 rounded-lg'
      />
      <Text className='text-white font-psemibold text-base text-center'>
        {item.title} - {item.releaseDate}
      </Text>
      <Text className='text-white font-psemibold text-center'>{item.type}</Text>
      <View className='flex flex-row items-center justify-center gap-1'>
        <MaterialIcons name='star' size={24} color={'#FF9C01'} />
        <Text className='text-white text-base'>
          {item.rating.toFixed(1)}/10
        </Text>
      </View>
    </Animatable.View>
  );
};
const Trending: React.FC<TrendingProps> = ({ trendingMovies }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(Number(viewableItems[0].key));
    }
  };

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
      renderItem={({ item }) => (
        <TrendingItem item={item} activeItem={activeItem} />
      )}
      ListEmptyComponent={() => {
        return <Text className='text-white'> No Movies Found </Text>;
      }}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
    />
  );
};

export default Trending;
