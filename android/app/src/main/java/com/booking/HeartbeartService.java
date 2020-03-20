package com.booking;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;

import androidx.core.app.NotificationCompat;

import com.booking.sms.SMSReceiver;

public class HeartbeartService extends Service {

    private static final int SERVICE_NOTIFICATION_ID = 12345;
    private static final String CHANNEL_ID = "HEARTBEAT";

    private SMSReceiver mSMSreceiver;
    private IntentFilter mIntentFilter;

    private Handler handler = new Handler();
    private Runnable runnableCode = new Runnable() {
        @Override
        public void run() {
//            Intent myIntent = new Intent(getApplicationContext(), HeartbeatEventService.class);
//            getApplicationContext().startService(myIntent);
//            HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
//            handler.postDelayed(this, 2000);
        }
    };
    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "HEARTBEAT", importance);
            channel.setDescription("CHANEL DESCRIPTION");
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        mSMSreceiver = new SMSReceiver();
        mIntentFilter = new IntentFilter();
        mIntentFilter.addAction("android.provider.Telephony.SMS_RECEIVED");
        registerReceiver(mSMSreceiver, mIntentFilter);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterReceiver(mSMSreceiver);
        this.handler.removeCallbacks(this.runnableCode);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        this.handler.post(this.runnableCode);
        createNotificationChannel();
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setCategory(Notification.CATEGORY_CALL)
                .setPriority(Notification.PRIORITY_MAX)
                .setContentTitle("Quản Lý Đặt Chỗ")
                .setContentText("Đang chạy...")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setFullScreenIntent(contentIntent,true)
                .setOngoing(true)
                .build();
        startForeground(SERVICE_NOTIFICATION_ID, notification);
        return START_STICKY;
    }

}
