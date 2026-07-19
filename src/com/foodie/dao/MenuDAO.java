package com.foodie.dao;

import com.foodie.model.Menu;
import java.util.List;

public interface MenuDAO {
    boolean createMenu(Menu menu);
    Menu getMenuById(int id);
    List<Menu> getMenuByRestaurantId(int restaurantId);
    boolean updateMenu(Menu menu);
}
