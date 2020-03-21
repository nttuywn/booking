package com.booking.sms;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "sms_table")
public class SMS {

    @PrimaryKey(autoGenerate = true)
    public int uid;

    @ColumnInfo(name = "name")
    public String name;

    @ColumnInfo(name = "phone")
    public String phone;

    @ColumnInfo(name = "month")
    public String month;

    @ColumnInfo(name = "day")
    public String day;

    @ColumnInfo(name = "hour")
    public String hour;

    @ColumnInfo(name = "minute")
    public String minute;

    @ColumnInfo(name = "status")
    public Boolean status;

    @ColumnInfo(name = "type")
    public String type;
}