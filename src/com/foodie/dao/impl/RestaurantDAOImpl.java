package com.foodie.dao.impl;

import com.foodie.dao.RestaurantDAO;
import com.foodie.model.Restaurant;
import com.foodie.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RestaurantDAOImpl implements RestaurantDAO {

    @Override
    public boolean createRestaurant(Restaurant restaurant) {
        String sql = "INSERT INTO restaurants (name, cuisine_type, delivery_time, address, rating, image_path, active) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, restaurant.getName());
            ps.setString(2, restaurant.getCuisineType());
            ps.setString(3, restaurant.getDeliveryTime());
            ps.setString(4, restaurant.getAddress());
            ps.setDouble(5, restaurant.getRating());
            ps.setString(6, restaurant.getImagePath());
            ps.setBoolean(7, restaurant.isActive());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public Restaurant getRestaurantById(int id) {
        String sql = "SELECT * FROM restaurants WHERE id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return extractRestaurantFromResultSet(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        List<Restaurant> list = new ArrayList<>();
        String sql = "SELECT * FROM restaurants";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                list.add(extractRestaurantFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List<Restaurant> getActiveRestaurants() {
        List<Restaurant> list = new ArrayList<>();
        String sql = "SELECT * FROM restaurants WHERE active = TRUE";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                list.add(extractRestaurantFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public boolean updateRestaurant(Restaurant restaurant) {
        String sql = "UPDATE restaurants SET name = ?, cuisine_type = ?, delivery_time = ?, address = ?, rating = ?, image_path = ?, active = ? WHERE id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, restaurant.getName());
            ps.setString(2, restaurant.getCuisineType());
            ps.setString(3, restaurant.getDeliveryTime());
            ps.setString(4, restaurant.getAddress());
            ps.setDouble(5, restaurant.getRating());
            ps.setString(6, restaurant.getImagePath());
            ps.setBoolean(7, restaurant.isActive());
            ps.setInt(8, restaurant.getId());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private Restaurant extractRestaurantFromResultSet(ResultSet rs) throws SQLException {
        return new Restaurant(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getString("cuisine_type"),
            rs.getString("delivery_time"),
            rs.getString("address"),
            rs.getDouble("rating"),
            rs.getString("image_path"),
            rs.getBoolean("active")
        );
    }
}
