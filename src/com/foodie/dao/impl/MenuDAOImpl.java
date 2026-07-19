package com.foodie.dao.impl;

import com.foodie.dao.MenuDAO;
import com.foodie.model.Menu;
import com.foodie.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MenuDAOImpl implements MenuDAO {

    @Override
    public boolean createMenu(Menu menu) {
        String sql = "INSERT INTO menu (restaurant_id, item_name, description, price, rating, is_available, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, menu.getRestaurantId());
            ps.setString(2, menu.getItemName());
            ps.setString(3, menu.getDescription());
            ps.setInt(4, menu.getPrice());
            ps.setDouble(5, menu.getRating());
            ps.setBoolean(6, menu.isAvailable());
            ps.setString(7, menu.getImagePath());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public Menu getMenuById(int id) {
        String sql = "SELECT * FROM menu WHERE id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return extractMenuFromResultSet(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Menu> getMenuByRestaurantId(int restaurantId) {
        List<Menu> list = new ArrayList<>();
        String sql = "SELECT * FROM menu WHERE restaurant_id = ? AND is_available = TRUE";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, restaurantId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    list.add(extractMenuFromResultSet(rs));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public boolean updateMenu(Menu menu) {
        String sql = "UPDATE menu SET restaurant_id = ?, item_name = ?, description = ?, price = ?, rating = ?, is_available = ?, image_path = ? WHERE id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, menu.getRestaurantId());
            ps.setString(2, menu.getItemName());
            ps.setString(3, menu.getDescription());
            ps.setInt(4, menu.getPrice());
            ps.setDouble(5, menu.getRating());
            ps.setBoolean(6, menu.isAvailable());
            ps.setString(7, menu.getImagePath());
            ps.setInt(8, menu.getId());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private Menu extractMenuFromResultSet(ResultSet rs) throws SQLException {
        return new Menu(
            rs.getInt("id"),
            rs.getInt("restaurant_id"),
            rs.getString("item_name"),
            rs.getString("description"),
            rs.getInt("price"),
            rs.getDouble("rating"),
            rs.getBoolean("is_available"),
            rs.getString("image_path")
        );
    }
}
