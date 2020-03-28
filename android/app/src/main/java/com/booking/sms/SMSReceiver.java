package com.booking.sms;

import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.telephony.SmsMessage;

import com.booking.utils.ChatHeadPopup;
import com.google.gson.*;

import android.widget.Toast;

import androidx.annotation.RequiresApi;

public class SMSReceiver extends BroadcastReceiver {
    public static final String SMS_EXTRA_NAME = "pdus";

    @RequiresApi(api = Build.VERSION_CODES.M)
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

            for (Object o : smsExtra) {
                SmsMessage sms = SmsMessage.createFromPdu((byte[]) o);
                String body = sms.getMessageBody().toString();
                messages = body + "\n";
            }

//            Intent myIntent = new Intent(context, HeartbeatEventService.class);

            Gson gson = new GsonBuilder().create();
            if(messages.contains("\"name\":")) {
                SMS data = gson.fromJson("{" + messages + "}", SMS.class);

                mRepository.insert(data);
//                Bundle bundle = new Bundle();
//                bundle.putString("name", data.name);
//                bundle.putString("phone", data.phone);
//                bundle.putString("day", data.day);
//                bundle.putString("month", data.month);
//                bundle.putString("hour", data.hour);
//                bundle.putString("minute", data.minute);
//                bundle.putBoolean("minute", false);
//                myIntent.putExtras(bundle);

//                context.startService(myIntent);
//                HeadlessJsTaskService.acquireWakeLockNow(context);
                if(!isAppForground(context)){
                    ChatHeadPopup chatHead = new ChatHeadPopup();
                    chatHead.create(context);
                }
            }

            // Display SMS message
            Toast.makeText(context, messages, Toast.LENGTH_SHORT).show();

        }

        // WARNING!!!
        // If you uncomment the next line then received SMS will not be put to incoming.
        // Be careful!
        // this.abortBroadcast();
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    public boolean isAppForground(Context mContext) {

        ActivityManager am = (ActivityManager) mContext.getSystemService(Context.ACTIVITY_SERVICE);
        ActivityManager.RecentTaskInfo tasks = new ActivityManager.RecentTaskInfo();
        if (!tasks.origActivity.getPackageName().equals(mContext.getPackageName())) return false;
        else return true;
    }

}