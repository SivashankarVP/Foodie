package com.foodie.servlet;

import com.foodie.dao.OrderDAO;
import com.foodie.dao.OrderItemDAO;
import com.foodie.dao.impl.OrderDAOImpl;
import com.foodie.dao.impl.OrderItemDAOImpl;
import com.foodie.model.Order;
import com.foodie.model.OrderItem;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/placeOrder")
public class OrderServlet extends HttpServlet {
    private final OrderDAO orderDAO = new OrderDAOImpl();
    private final OrderItemDAO orderItemDAO = new OrderItemDAOImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        // Read JSON payload manually to avoid third-party JSON parser dependency
        StringBuilder sb = new StringBuilder();
        String line;
        try (BufferedReader reader = request.getReader()) {
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }

        String json = sb.toString();
        try {
            // Very basic JSON parsing for fields: userId, restaurantId, totalAmount, paymentMode, address, items
            int userId = Integer.parseInt(extractJsonValue(json, "userId"));
            int restaurantId = Integer.parseInt(extractJsonValue(json, "restaurantId"));
            int totalAmount = Integer.parseInt(extractJsonValue(json, "totalAmount"));
            String paymentMode = extractJsonValue(json, "paymentMode");
            String address = extractJsonValue(json, "address");

            Order order = new Order();
            order.setUserId(userId);
            order.setRestaurantId(restaurantId);
            order.setTotalAmount(totalAmount);
            order.setStatus("Confirmed");
            order.setPaymentMode(paymentMode);
            order.setAddress(address);

            boolean orderCreated = orderDAO.createOrder(order);
            if (orderCreated) {
                // Parse items array
                List<OrderItem> items = parseItems(json, order.getId());
                for (OrderItem item : items) {
                    orderItemDAO.createOrderItem(item);
                }

                String orderNumber = "FD" + String.format("%06d", order.getId());
                out.write("{\"status\":\"success\", \"message\":\"Order placed successfully\", \"orderId\":" + order.getId() + ", \"orderNumber\":\"" + orderNumber + "\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.write("{\"status\":\"error\", \"message\":\"Failed to create order\"}");
            }

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"status\":\"error\", \"message\":\"Invalid request format: " + e.getMessage() + "\"}");
        }
        out.flush();
    }

    private String extractJsonValue(String json, String key) {
        String pattern = "\"" + key + "\":";
        int index = json.indexOf(pattern);
        if (index == -1) return "";
        int start = index + pattern.length();
        // Check if value is a string or number
        char c = json.charAt(start);
        while (Character.isWhitespace(c) || c == '"') {
            start++;
            c = json.charAt(start);
        }
        int end = start;
        while (end < json.length()) {
            char ec = json.charAt(end);
            if (ec == '"' || ec == ',' || ec == '}' || ec == ']') {
                break;
            }
            end++;
        }
        return json.substring(start, end).trim();
    }

    private List<OrderItem> parseItems(String json, int orderId) {
        List<OrderItem> list = new ArrayList<>();
        int itemsIndex = json.indexOf("\"items\":");
        if (itemsIndex == -1) return list;
        
        int arrayStart = json.indexOf("[", itemsIndex);
        int arrayEnd = json.indexOf("]", arrayStart);
        if (arrayStart == -1 || arrayEnd == -1) return list;

        String itemsJson = json.substring(arrayStart + 1, arrayEnd);
        String[] objects = itemsJson.split("\\}");
        for (String obj : objects) {
            if (!obj.contains("{")) continue;
            try {
                int menuId = Integer.parseInt(extractJsonValue(obj, "menuId"));
                int quantity = Integer.parseInt(extractJsonValue(obj, "quantity"));
                int itemPrice = Integer.parseInt(extractJsonValue(obj, "price"));

                list.add(new OrderItem(0, orderId, menuId, quantity, itemPrice));
            } catch (Exception ignored) {}
        }
        return list;
    }
}
