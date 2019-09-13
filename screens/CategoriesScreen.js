import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Platform } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id,
            },
          });
        }}
      >
        <View>
          <Text>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // <View style={styles.screen}>
    //   <Text>The Categories Screen!</Text>
    //   <Button
    //     title="Go to Meals"
    //     onPress={() => {
    //       // props.navigation.navigate({
    //       //   routeName: 'CategoryMeals',
    //       // });
    //       props.navigation.navigate('CategoryMeals');
    //       // props.navigation.push('CategoryMeals');
    //     }}
    //   />
    // </View>

    <FlatList
      data={CATEGORIES}
      numColumns={2}
      keyExtractor={(item, index) => item.id}
      renderItem={renderGridItem}
    />
  );
};

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : null,
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primaryColor,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default CategoriesScreen;
