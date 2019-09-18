import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constants/Colors';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : null,
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primaryColor,
  // headerTitle: 'A Screen'
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: { headerTitle: 'Meal Categories' },
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetails: MealDetailsScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: {
      screen: FavoritesScreen,
      // navigationOptions: { headerTitle: 'Favorites' },
    },
    MealDetail: {
      screen: MealDetailsScreen,
      navigationOptions: { headerTitle: 'Meal' },
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
        ) : (
          'Meals'
        ),
    },
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      tabBarLabel: 'Favorites!',
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
        ) : (
          'Favorites'
        ),
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: '#fff',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: 'open-sans-bold',
          },
          activeTintColor: Colors.accentColor,
        },
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters',
    // },
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals',
      },
    },
    Filters: {
      screen: FiltersNavigator,
      // navigationOptions: {
      //   drawerLabel: 'Filters',
      // },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold',
      },
    },
  }
);

export default createAppContainer(MainNavigator);
