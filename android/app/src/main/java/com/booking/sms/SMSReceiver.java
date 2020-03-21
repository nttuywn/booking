package com.booking.sms;

import android.annotation.SuppressLint;
import android.app.Application;
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

import androidx.lifecycle.LiveData;

import com.facebook.react.HeadlessJsTaskService;

import java.util.List;

public class SMSReceiver extends BroadcastReceiver {
    public static final String SMS_EXTRA_NAME = "pdus";

    @SuppressLint("ClickableViewAccessibility")
    @Override
    public void onReceive(Context context, Intent intent) {
        // Get the SMS map from Intent
        Bundle extras = intent.getExtras();

        SMSRepository mRepository = new SMSRepository(context);

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
                    SMS data = gson.fromJson("{" + body + "}", SMS.class);

                    mRepository.insert(data);

                    context.startService(myIntent);
                    HeadlessJsTaskService.acquireWakeLockNow(context);
//                    ChatHeadPopup chatHead = new ChatHeadPopup();
//                    chatHead.create(context);
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