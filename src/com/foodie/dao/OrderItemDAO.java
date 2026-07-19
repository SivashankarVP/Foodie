package com.foodie.dao;

import com.foodie.model.OrderItem;
import java.util.List;

public interface OrderItemDAO {
    boolean createOrderItem(OrderItem orderItem);
    List<OrderItem> getOrderItemsByOrderId(int orderId);
}
