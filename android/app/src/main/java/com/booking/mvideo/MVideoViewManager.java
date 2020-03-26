package com.booking.mvideo;

import android.app.Activity;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class MVideoViewManager extends SimpleViewManager<MVideo> {

    public static final String REACT_CLASS = "MVideo";

    @NonNull
    @Override
    public String getName() {
        return  REACT_CLASS;
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @NonNull
    @Override
    protected MVideo createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new MVideo(reactContext, reactContext.getCurrentActivity());
    }
}
