package com.booking.mvideo;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.os.RemoteException;
import android.support.v4.media.MediaBrowserCompat;
import android.support.v4.media.MediaMetadataCompat;
import android.support.v4.media.session.MediaControllerCompat;
import android.support.v4.media.session.MediaSessionCompat;
import android.support.v4.media.session.PlaybackStateCompat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.booking.MainActivity;
import com.booking.R;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.ui.PlayerView;

public class MVideoViewManager extends SimpleViewManager<MVideo> {

    private ReactApplicationContext context;
    public static final String REACT_CLASS = "MVideo";

    private SimpleExoPlayer exoPlayer;

    private ServiceConnection connection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
            if(iBinder instanceof MVideoService.VideoServiceBinder){
                exoPlayer = ((MVideoService.VideoServiceBinder) iBinder).getExoPlayerInstance();
            }
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {

        }
    };

    public MVideoViewManager(@NonNull ReactApplicationContext reactContext) {
        Intent intent = new Intent(reactContext, MVideoService.class);
        reactContext.bindService(intent, connection, Context.BIND_AUTO_CREATE);
        this.context = reactContext;
    }

    @Override
    public void onDropViewInstance(@NonNull MVideo view) {
        super.onDropViewInstance(view);
        context.unbindService(connection);
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @NonNull
    @Override
    protected MVideo createViewInstance(@NonNull ThemedReactContext reactContext) {
        MVideo videoView = new MVideo(reactContext, exoPlayer);
        return videoView;
    }

}
