package com.booking.mvideo;

import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nonnull;

public class MVideoModule extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "MVideo";
    private static ReactApplicationContext reactContext;

    public MVideoModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        MVideoModule.reactContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

//    @Override
//    public MExoPlayer startService() {
//        MExoPlayer player = new MExoPlayer();
//        player.Init(reactContext);
//        Toast.makeText(reactContext, "Lel", Toast.LENGTH_SHORT).show();
//
//        return player;
//    }

    @ReactMethod
    public void open(Promise promise) {

    }

    @ReactMethod
    public void stopService() {

    }
}
