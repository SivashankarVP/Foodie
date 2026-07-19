package com.foodie.dao;

import com.foodie.model.Restaurant;
import java.util.List;

public interface RestaurantDAO {
    boolean createRestaurant(Restaurant restaurant);
    Restaurant getRestaurantById(int id);
    List<Restaurant> getAllRestaurants();
    List<Restaurant> getActiveRestaurants();
    boolean updateRestaurant(Restaurant restaurant);
}
