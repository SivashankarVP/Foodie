package com.foodie.servlet;

import com.foodie.dao.UserDAO;
import com.foodie.dao.impl.UserDAOImpl;
import com.foodie.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private final UserDAO userDAO = new UserDAOImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String name = request.getParameter("name");
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String phone = request.getParameter("phone");
        String city = request.getParameter("city");

        if (userDAO.getUserByUsernameOrEmail(username) != null || userDAO.getUserByUsernameOrEmail(email) != null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"status\":\"error\", \"message\":\"Username or Email already registered\"}");
            out.flush();
            return;
        }

        User user = new User();
        user.setName(name);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setPhone(phone);
        user.setCity(city);

        if (userDAO.createUser(user)) {
            User registeredUser = userDAO.getUserByUsernameOrEmail(username);
            out.write("{\"status\":\"success\", \"message\":\"Registration successful\", \"user\": {");
            out.write("\"id\":" + registeredUser.getId() + ",");
            out.write("\"name\":\"" + registeredUser.getName() + "\",");
            out.write("\"username\":\"" + registeredUser.getUsername() + "\",");
            out.write("\"email\":\"" + registeredUser.getEmail() + "\"");
            out.write("}}");
        } else {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.write("{\"status\":\"error\", \"message\":\"Registration failed\"}");
        }
        out.flush();
    }
}
