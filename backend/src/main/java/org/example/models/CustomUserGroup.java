package org.example.models;

public class CustomUserGroup {

    private String uuid;
    private int isPublic;
    private String name;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public int getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(int isPublic) {
        this.isPublic = isPublic;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CustomUserGroup(String uuid, int isPublic, String name) {
        this.uuid = uuid;
        this.isPublic = isPublic;
        this.name = name;
    }
}
