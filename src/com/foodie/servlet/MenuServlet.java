package com.foodie.servlet;

import com.foodie.dao.MenuDAO;
import com.foodie.dao.impl.MenuDAOImpl;
import com.foodie.model.Menu;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/menu")
public class MenuServlet extends HttpServlet {
    private final MenuDAO menuDAO = new MenuDAOImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String restaurantIdStr = request.getParameter("restaurantId");
        if (restaurantIdStr == null || restaurantIdStr.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"status\":\"error\", \"message\":\"Missing restaurantId\"}");
            out.flush();
            return;
        }

        try {
            int restaurantId = Integer.parseInt(restaurantIdStr);
            List<Menu> list = menuDAO.getMenuByRestaurantId(restaurantId);

            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (int i = 0; i < list.size(); i++) {
                Menu m = list.get(i);
                sb.append("{");
                sb.append("\"id\":").append(m.getId()).append(",");
                sb.append("\"restaurantId\":").append(m.getRestaurantId()).append(",");
                sb.append("\"itemName\":\"").append(m.getItemName().replace("\"", "\\\"")).append("\",");
                sb.append("\"description\":\"").append(m.getDescription() != null ? m.getDescription().replace("\"", "\\\"") : "").append("\",");
                sb.append("\"price\":").append(m.getPrice()).append(",");
                sb.append("\"rating\":").append(m.getRating()).append(",");
                sb.append("\"isAvailable\":").append(m.isAvailable()).append(",");
                sb.append("\"imagePath\":\"").append(m.getImagePath()).append("\"");
                sb.append("}");
                if (i < list.size() - 1) {
                    sb.append(",");
                }
            }
            sb.append("]");

            out.write(sb.toString());
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"status\":\"error\", \"message\":\"Invalid restaurantId format\"}");
        }
        out.flush();
    }
}
