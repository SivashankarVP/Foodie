package com.cravego.servlet;

import com.cravego.dao.UserDAO;
import com.cravego.dao.impl.UserDAOImpl;
import com.cravego.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private final UserDAO userDAO = new UserDAOImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String identifier = request.getParameter("identifier");
        String password = request.getParameter("password");

        User user = userDAO.validateUser(identifier, password);

        if (user != null) {
            HttpSession session = request.getSession();
            session.setAttribute("user", user);

            out.write("{\"status\":\"success\", \"message\":\"Login successful\", \"user\": {");
            out.write("\"id\":" + user.getId() + ",");
            out.write("\"name\":\"" + user.getName() + "\",");
            out.write("\"username\":\"" + user.getUsername() + "\",");
            out.write("\"email\":\"" + user.getEmail() + "\",");
            out.write("\"phone\":\"" + (user.getPhone() != null ? user.getPhone() : "") + "\",");
            out.write("\"city\":\"" + (user.getCity() != null ? user.getCity() : "") + "\"");
            out.write("}}");
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.write("{\"status\":\"error\", \"message\":\"Invalid username/email or password\"}");
        }
        out.flush();
    }
}
