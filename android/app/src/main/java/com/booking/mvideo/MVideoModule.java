package com.booking.mvideo;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class MVideoModule extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "MVideo";
    private static ReactApplicationContext reactContext;
    private static WritableMap map;
    private static WritableArray a;

    public MVideoModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        MVideoModule.reactContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void startService() {
        Toast.makeText(reactContext, "Lel", Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void stopService() {

    }
}
