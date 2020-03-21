package com.booking.sms;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;

import java.util.List;

@Dao
public interface SMSDao {
    @Query("SELECT * FROM sms_table")
    LiveData<List<SMS>> getAll();

//    @Query("SELECT * FROM user WHERE uid IN (:userIds)")
//    ArrayList<SMS> loadAllByIds(int[] userIds);
//
//    @Query("SELECT * FROM user WHERE first_name LIKE :first AND " +
//            "last_name LIKE :last LIMIT 1")
//    SMS findByName(String first, String last);

    @Insert
    void insert(SMS... sms);

    @Delete
    void delete(SMS sms);
}