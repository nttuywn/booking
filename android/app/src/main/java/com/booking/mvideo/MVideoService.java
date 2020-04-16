package com.booking.mvideo;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Binder;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;
import android.widget.RemoteViews;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.booking.R;
import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.audio.AudioAttributes;
import com.google.android.exoplayer2.source.LoopingMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Util;

@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class MVideoService extends Service {

    /** Declare for media control */
    private static final String MEDIA_CONTROL_ACTION = "controlAction";
    private int PLAY_ACTION = 1;
    private int PAUSE_ACTION = 0;

    private static final String URI_SAMPLE = "https://vn.dungmori.com/720p/kanji-1.2.mp4/index.m3u8?58";
    private static final int SERVICE_NOTIFICATION_ID = 789;
    private static final String CHANNEL_ID = "MVideo";

    private SimpleExoPlayer exoPlayer;

    private PendingIntent createNotiAction(int action){
        Intent intent  = new Intent(this, MVideoService.class);
        intent.putExtra(MEDIA_CONTROL_ACTION, action);

        return PendingIntent.getService(this, 0, intent, 0);
    }

    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "MVideo", importance);
            channel.setDescription("CHANEL DESCRIPTION");
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);

            RemoteViews remoteView = new RemoteViews(getApplicationContext().getPackageName(), R.layout.video_notification);
            remoteView.setOnClickPendingIntent(R.id.pause_player_btn, createNotiAction(PAUSE_ACTION));
            if(exoPlayer.isPlaying()) {
                remoteView.setImageViewResource(R.id.pause_player_btn, R.drawable.ic_pause);
//                remoteView.setOnClickPendingIntent(R.id.pause_player_btn, createNotiAction(PAUSE_ACTION));

            } else {
                remoteView.setImageViewResource(R.id.pause_player_btn, R.drawable.ic_play);
            }

            Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContent(remoteView)
                    .setSmallIcon(R.drawable.ic_home_black)
                    .setOngoing(true)
                    .build();
            startForeground(SERVICE_NOTIFICATION_ID, notification);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        createNotificationChannel();

        exoPlayer.setPlayWhenReady(true);
        exoPlayer.addListener(new Player.EventListener() {

            @Override
            public void onTracksChanged(TrackGroupArray trackGroups, TrackSelectionArray trackSelections) {
            }

            @Override
            public void onLoadingChanged(boolean isLoading) {

            }

            @Override
            public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
                switch (playbackState){
                    case ExoPlayer.STATE_READY:
                        break;
                    default:
                        break;
                }
            }

            @Override
            public void onRepeatModeChanged(int repeatMode) {

            }

            @Override
            public void onShuffleModeEnabledChanged(boolean shuffleModeEnabled) {

            }

            @Override
            public void onPlayerError(ExoPlaybackException error) {
                exoPlayer.stop();
            }

            @Override
            public void onPositionDiscontinuity(int reason) {

            }

            @Override
            public void onPlaybackParametersChanged(PlaybackParameters playbackParameters) {

            }

            @Override
            public void onSeekProcessed() {

            }
        });

        Uri mp4VideoUri = Uri.parse(URI_SAMPLE);
        DataSource.Factory dataSourceFactory = new DefaultDataSourceFactory(getApplicationContext(), Util.getUserAgent(getApplicationContext(), "exoplayer2example"));
        MediaSource videoSource = new HlsMediaSource.Factory(dataSourceFactory).createMediaSource(mp4VideoUri);
        final LoopingMediaSource loopingSource = new LoopingMediaSource(videoSource);
        // Prepare the player with the source.
        exoPlayer.prepare(loopingSource);
        exoPlayer.setPlayWhenReady(true);

        return new VideoServiceBinder();
    }

     class VideoServiceBinder extends Binder {

        /**
         * This method should be used only for setting the exoplayer instance.
         * If exoplayer's internal are altered or accessed we can not guarantee
         * things will work correctly.
         */
        public SimpleExoPlayer getExoPlayerInstance() {
            return exoPlayer;
        }
    }

    @Override
    public void onCreate() {
        super.onCreate();
        exoPlayer = new SimpleExoPlayer.Builder(getApplicationContext()).build();
        exoPlayer.setAudioAttributes(
                new AudioAttributes
                        .Builder()
                        .setContentType(C.CONTENT_TYPE_MUSIC)
                        .setUsage(C.USAGE_MEDIA)
                        .build(), true);

    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        exoPlayer.release();
        NotificationManager manager = (NotificationManager) getApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE);
        manager.cancel(SERVICE_NOTIFICATION_ID);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

//        PendingIntent openAppIntent = PendingIntent.getActivity(this, 0, new Intent(this, MainActivity.class), PendingIntent.FLAG_UPDATE_CURRENT);
//
//        PendingIntent stopVideoIntent = PendingIntent.getService(this, 0, new Intent(this, MVideoService.class), 0);
//        remoteView.setOnClickPendingIntent(R.id.pause_player_btn, stopVideoIntent);

        int action = intent.getIntExtra(MEDIA_CONTROL_ACTION, -1);
        switch (action) {
            case 0:
                Log.e("ExoPlayerTest", PAUSE_ACTION +  " ---" + action);
                exoPlayer.setPlayWhenReady(false);
                break;
            case 1:
                Log.e("ExoPlayerTest", PLAY_ACTION +  " ---" + action);
                exoPlayer.setPlayWhenReady(true);
                break;
            default:
                break;
        }

        return super.onStartCommand(intent,flags,startId);
    }

}
