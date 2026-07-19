package com.foodie.dao;

import com.foodie.model.Order;
import java.util.List;

public interface OrderDAO {
    boolean createOrder(Order order);
    Order getOrderById(int id);
    List<Order> getOrdersByUserId(int userId);
    boolean updateOrderStatus(int orderId, String status);
}
