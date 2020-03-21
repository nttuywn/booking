package com.booking;

import android.app.Application;
import android.content.Intent;
import android.os.Bundle;

import androidx.lifecycle.LiveData;

import com.booking.sms.SMS;
import com.booking.sms.SMSRepository;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

import java.util.List;

import javax.annotation.Nullable;

public class SMSEventService extends HeadlessJsTaskService {

    @Nullable
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        WritableMap data = extras != null ? Arguments.fromBundle(extras) : Arguments.createMap();
        return new HeadlessJsTaskConfig(
                "SMS",
                data,
                5000,
                true);
    }
}