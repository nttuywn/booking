package com.booking.sms;

import android.annotation.SuppressLint;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.telephony.SmsMessage;

import com.booking.HeartbeatEventService;
import com.booking.Reserve;
import com.booking.utils.ChatHeadPopup;
import com.google.gson.*;
import android.widget.Toast;

import com.facebook.react.HeadlessJsTaskService;

public class SMSReceiver extends BroadcastReceiver {
    public static final String SMS_EXTRA_NAME = "pdus";

    private void createNotificationChannel(Context context) {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel("SMS_RECIEVER", "HEARTBEAT", importance);
            channel.setDescription("CHANEL DESCRIPTION");
            channel.enableLights(true);
            channel.setLightColor(Color.RED);
            channel.setVibrationPattern(new long[]{0, 1000, 500, 1000});
            channel.enableVibration(true);
            NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @SuppressLint("ClickableViewAccessibility")
    @Override
    public void onReceive(Context context, Intent intent) {
        // Get the SMS map from Intent
        Bundle extras = intent.getExtras();

        String messages = "";

        if (extras != null) {
            // Get received SMS array
            Object[] smsExtra = (Object[]) extras.get(SMS_EXTRA_NAME);

            // Get ContentResolver object for pushing encrypted SMS to the incoming folder
            ContentResolver contentResolver = context.getContentResolver();

            for (int i = 0; i < smsExtra.length; ++i) {
                SmsMessage sms = SmsMessage.createFromPdu((byte[]) smsExtra[i]);

                String body = sms.getMessageBody().toString();
                String address = sms.getOriginatingAddress();

                messages += "SMS from " + address + " :\n";
                messages += body + "\n";

                Intent myIntent = new Intent(context, HeartbeatEventService.class);

                Gson gson = new GsonBuilder().create();
                if(body.contains("\"name\":")) {
                    Reserve data = gson.fromJson("{" + body + "}", Reserve.class);

                    Bundle bundle = new Bundle();
                    bundle.putString("name", data.name);
                    bundle.putString("phone", data.phone);
                    bundle.putString("date", data.date);
                    bundle.putString("hour", data.hour);
                    bundle.putString("minute", data.minute);
                    myIntent.putExtras(bundle);

                    context.startService(myIntent);
                    HeadlessJsTaskService.acquireWakeLockNow(context);
                    ChatHeadPopup chatHead = new ChatHeadPopup();
                    chatHead.create(context);
                }

                // Here you can add any your code to work with incoming SMS
                // I added encrypting of all received SMS

//                putSmsToDatabase( contentResolver, sms );
            }

            // Display SMS message
            Toast.makeText(context, messages, Toast.LENGTH_SHORT).show();

        }

        // WARNING!!!
        // If you uncomment the next line then received SMS will not be put to incoming.
        // Be careful!
        // this.abortBroadcast();
    }

}