package org.example.services;

import org.example.daos.CustomUserGroupsDAO;
import org.example.daos.SingDao;
import org.example.daos.UserDao;
import org.example.models.CustomUserGroup;
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

    @Autowired
    private CustomUserGroupsDAO customUserGroupsDAO;

    public Boolean isOwner(int singId, String username){
        Sing sing = singDao.getSingById(singId);
        String singOwner = sing.getOwner_id();
        User user = userDao.getUserByUsername(username);
        String uuid = user.getUuid();

        return uuid.equals(singOwner);
    }

    public Boolean isGroupOwner(int group_id, String username){
        CustomUserGroup group = customUserGroupsDAO.getCustomGroupByGroupId(group_id);
        String groupOwner = group.getUuid();
        User user = userDao.getUserByUsername(username);
        String uuid = user.getUuid();

        return uuid.equals(groupOwner);

   }
}
