package com.cravego.dao;

import com.cravego.model.Menu;
import java.util.List;

public interface MenuDAO {
    boolean createMenu(Menu menu);
    Menu getMenuById(int id);
    List<Menu> getMenuByRestaurantId(int restaurantId);
    boolean updateMenu(Menu menu);
}
