import { View, Text, Image, FlatList, ViewToken, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Movie } from '@/utils/Api';
import * as Animatable from 'react-native-animatable';
import { CustomAnimation } from 'react-native-animatable';

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
      <Image source={{ uri: item.image }} className='w-36 h-48 mb-2' />
      <Text className='text-white font-psemibold text-base text-center'>
        {item.title} - {item.releaseDate}
      </Text>
      <Text className='text-white font-psemibold'>{item.type}</Text>
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
  return (
    <FlatList
      className='w-96 self-center'
      data={trendingMovies}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TrendingItem item={item} activeItem={activeItem} />
      )}
      ListEmptyComponent={() => {
        return <Text className='text-white'> EMPTY </Text>;
      }}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
    />
  );
};

export default Trending;
