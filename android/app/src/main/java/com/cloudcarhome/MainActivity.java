package com.cloudcarhome;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "CloudCarHome";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) { // 2. 显示启动方法
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
}
