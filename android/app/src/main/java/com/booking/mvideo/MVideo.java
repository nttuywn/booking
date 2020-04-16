package com.booking.mvideo;

import android.content.Context;
import android.os.Build;
import androidx.annotation.RequiresApi;

import com.booking.R;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.ui.PlayerControlView;
import com.google.android.exoplayer2.ui.PlayerView;

@RequiresApi(api = Build.VERSION_CODES.M)
class MVideo extends PlayerView {

    public MVideo(Context context, SimpleExoPlayer exoPlayer) {
        super(context,null,0);
        this.setPlayer(exoPlayer);
        initView(context);
    }

    private void initView(Context context){
        this.setUseController(true);
        this.addView(new PlayerControlView(context));
    }

}
