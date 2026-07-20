package com.cravego.servlet;

import com.cravego.dao.OrderDAO;
import com.cravego.dao.OrderItemDAO;
import com.cravego.dao.impl.OrderDAOImpl;
import com.cravego.dao.impl.OrderItemDAOImpl;
import com.cravego.model.Order;
import com.cravego.model.OrderItem;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;

@WebServlet("/orderHistory")
public class OrderHistoryServlet extends HttpServlet {
    private final OrderDAO orderDAO = new OrderDAOImpl();
    private final OrderItemDAO orderItemDAO = new OrderItemDAOImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String userIdStr = request.getParameter("userId");
        if (userIdStr == null || userIdStr.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"status\":\"error\", \"message\":\"Missing userId\"}");
            out.flush();
            return;
        }

        try {
            int userId = Integer.parseInt(userIdStr);
            List<Order> orders = orderDAO.getOrdersByUserId(userId);
            SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy HH:mm");

            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (int i = 0; i < orders.size(); i++) {
                Order order = orders.get(i);
                List<OrderItem> items = orderItemDAO.getOrderItemsByOrderId(order.getId());

                sb.append("{");
                sb.append("\"id\":").append(order.getId()).append(",");
                sb.append("\"orderNumber\":\"").append("FD").append(String.format("%06d", order.getId())).append("\",");
                sb.append("\"restaurant\":\"").append(order.getRestaurantName().replace("\"", "\\\"")).append("\",");
                sb.append("\"price\":").append(order.getTotalAmount()).append(",");
                sb.append("\"status\":\"").append(order.getStatus()).append("\",");
                sb.append("\"paymentMethod\":\"").append(order.getPaymentMode()).append("\",");
                sb.append("\"address\":\"").append(order.getAddress().replace("\"", "\\\"")).append("\",");
                sb.append("\"date\":\"").append(sdf.format(order.getOrderDate())).append("\",");
                
                // Add items array
                sb.append("\"items\":[");
                for (int j = 0; j < items.size(); j++) {
                    OrderItem item = items.get(j);
                    sb.append("{");
                    sb.append("\"name\":\"").append(item.getItemName().replace("\"", "\\\"")).append("\",");
                    sb.append("\"quantity\":").append(item.getQuantity()).append(",");
                    sb.append("\"price\":").append(item.getItemPrice());
                    sb.append("}");
                    if (j < items.size() - 1) {
                        sb.append(",");
                    }
                }
                sb.append("]");
                sb.append("}");

                if (i < orders.size() - 1) {
                    sb.append(",");
                }
            }
            sb.append("]");

            out.write(sb.toString());
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"status\":\"error\", \"message\":\"Invalid userId format\"}");
        }
        out.flush();
    }
}
