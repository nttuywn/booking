package com.booking;

import android.app.Application;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import androidx.lifecycle.LifecycleOwner;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.Observer;

import com.booking.sms.SMS;
import com.booking.sms.SMSDao;
import com.booking.sms.SMSRepository;
import com.booking.sms.SMSRoomDB;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.lang.reflect.Array;
import java.util.List;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class HeartbeatModule extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "Heartbeat";
    private static ReactApplicationContext reactContext;

    public HeartbeatModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        HeartbeatModule.reactContext = reactContext;
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void startService() {
        SMSRepository mRepository = new SMSRepository(reactContext);

        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                mRepository.getAllSMS().observe((LifecycleOwner) reactContext.getCurrentActivity(), new Observer<List<SMS>>() {
                    @Override
                    public void onChanged(List<SMS> listSms) {
                        WritableMap map = new WritableNativeMap();
                        WritableArray a = new WritableNativeArray();
                        for (SMS sms : listSms) {
                            WritableMap b = new WritableNativeMap();
                            b.putString("name", sms.name);
                            b.putString("name", sms.name);
                            b.putString("phone", sms.phone);
                            b.putString("day", sms.day);
                            b.putString("month", sms.month);
                            b.putString("hour", sms.hour);
                            b.putString("minute", sms.minute);
                            b.putBoolean("minute", false);
                            a.pushMap(b);
                        }
                        map.putArray("listSMS", a);
//                        Log.e("123123123", sms.get(0).toString() + "");
                        sendEvent(reactContext, "newSMS", map);
                    }
                });
            }
        });

//        reactContext.startService(new Intent(reactContext, HeartbeartService.class));
    }

    @ReactMethod
    public void stopService() {
        reactContext.stopService(new Intent(reactContext, HeartbeartService.class));
    }
}
