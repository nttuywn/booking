package com.booking.sms;

import android.app.Application;
import android.content.Context;

import androidx.lifecycle.LiveData;

import java.util.List;

public class SMSRepository {

    private SMSDao mSMSDao;
    private LiveData<List<SMS>> mAllSMS;

    // Note that in order to unit test the WordRepository, you have to remove the Application
    // dependency. This adds complexity and much more code, and this sample is not about testing.
    // See the BasicSample in the android-architecture-components repository at
    // https://github.com/googlesamples
    public SMSRepository(Context context) {
        SMSRoomDB db = SMSRoomDB.getDatabase(context);
        mSMSDao = db.SMSDao();
        mAllSMS = mSMSDao.getAll();
    }

    // Room executes all queries on a separate thread.
    // Observed LiveData will notify the observer when the data has changed.
    public LiveData<List<SMS>> getAllSMS() {
        return mAllSMS;
    }

    // You must call this on a non-UI thread or your app will throw an exception. Room ensures
    // that you're not doing any long running operations on the main thread, blocking the UI.
    void insert(SMS sms) {
        SMSRoomDB.databaseWriteExecutor.execute(() -> {
            mSMSDao.insert(sms);
        });
    }

}
