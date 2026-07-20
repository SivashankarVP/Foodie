package com.cravego.servlet;

import com.cravego.dao.RestaurantDAO;
import com.cravego.dao.impl.RestaurantDAOImpl;
import com.cravego.model.Restaurant;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/restaurants")
public class RestaurantServlet extends HttpServlet {
    private final RestaurantDAO restaurantDAO = new RestaurantDAOImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        List<Restaurant> list = restaurantDAO.getActiveRestaurants();

        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < list.size(); i++) {
            Restaurant r = list.get(i);
            sb.append("{");
            sb.append("\"id\":").append(r.getId()).append(",");
            sb.append("\"name\":\"").append(r.getName().replace("\"", "\\\"")).append("\",");
            sb.append("\"cuisineType\":\"").append(r.getCuisineType().replace("\"", "\\\"")).append("\",");
            sb.append("\"deliveryTime\":\"").append(r.getDeliveryTime()).append("\",");
            sb.append("\"address\":\"").append(r.getAddress().replace("\"", "\\\"")).append("\",");
            sb.append("\"rating\":").append(r.getRating()).append(",");
            sb.append("\"imagePath\":\"").append(r.getImagePath()).append("\"");
            sb.append("}");
            if (i < list.size() - 1) {
                sb.append(",");
            }
        }
        sb.append("]");

        out.write(sb.toString());
        out.flush();
    }
}
