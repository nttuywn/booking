package com.booking;

import android.content.BroadcastReceiver;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import com.google.gson.*;
import android.widget.Toast;
import com.facebook.react.HeadlessJsTaskService;

public class SMSReceiver extends BroadcastReceiver {
    public static final String SMS_EXTRA_NAME = "pdus";

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