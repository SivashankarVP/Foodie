package com.cravego.dao;

import com.cravego.model.User;

public interface UserDAO {
    boolean createUser(User user);
    User getUserById(int id);
    User getUserByUsernameOrEmail(String identifier);
    User validateUser(String identifier, String password);
    boolean updateUser(User user);
}
