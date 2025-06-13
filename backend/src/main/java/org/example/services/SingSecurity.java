package org.example.services;

import org.example.daos.SingDao;
import org.example.daos.UserDao;
import org.example.models.Sing;
import org.example.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class SingSecurity {

    @Autowired
    private SingDao singDao;

    @Autowired
    private UserDao userDao;

    public Boolean isOwner(int singId, String username){
        Sing sing = singDao.getSingById(singId);
        String singOwner = sing.getOwner_id();
        User user = userDao.getUserByUsername(username);
        String uuid = user.getUuid();

        if (uuid.equals(singOwner)){return false;}else{return true;}
    }
}
