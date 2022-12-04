package com.app.agromonitoring;

import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class ConnectivityStatus extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    ConnectivityStatus(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        statusCheck();
        IntentFilter filter = new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION);
        filter.addAction(WifiManager.SUPPLICANT_CONNECTION_CHANGE_ACTION);
        filter.addAction("android.location.PROVIDERS_CHANGED");
        filter.addAction("Intent.ACTION_AIRPLANE_MODE_CHANGED");
        reactContext.registerReceiver(new BroadcastReceiver_1(),filter);
    }

    @ReactMethod
    public void toggleGpsButton() {
        Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);
    }

    @ReactMethod
    public void isWifiGPSOn(Callback cb){
        WifiManager wifi =(WifiManager)getCurrentActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        LocationManager location = (LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);
        if (!location.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
            cb.invoke(wifi.isWifiEnabled(),false); //wifi and location state
        }
        else {
            cb.invoke(wifi.isWifiEnabled(),true);
        }
    }


    public void statusCheck() {
        final LocationManager manager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);

        Intent serviceIntent = new Intent(reactContext, BroadcastHeadless.class);
        Bundle bundle = new Bundle();
        if (!manager.isProviderEnabled(LocationManager.GPS_PROVIDER))
            bundle.putString("location", "off");
        else
            bundle.putString("location", "on");
        serviceIntent.putExtras(bundle);
        reactContext.startService(serviceIntent);
    }

    @NonNull
    @Override
    public String getName() {
        return "ConnectivityStatus";
    }
}