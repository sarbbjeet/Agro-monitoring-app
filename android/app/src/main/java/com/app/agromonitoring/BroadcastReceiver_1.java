package com.app.agromonitoring;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.location.LocationManager;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.util.Log;

import com.app.agromonitoring.MainActivity;

public class BroadcastReceiver_1 extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle bundle = new Bundle();
        Intent serviceIntent = new Intent(context, BroadcastHeadless.class);
   if(intent.getAction().matches("android.location.PROVIDERS_CHANGED")){

//            if(intent.getAction().equals(Intent.ACTION_AIRPLANE_MODE_CHANGED)){
            final LocationManager manager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
            Log.d("broadcast", "location mode change");
            if (!manager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
                bundle.putString("gps", "off");
            }
            else{
                bundle.putString("gps", "on");
            }
            serviceIntent.putExtras(bundle);
            context.startService(serviceIntent);
            //HeadlessJsTaskService.acquireWakeLockNow(context);
        }
        else if (intent.getAction().matches(WifiManager.SUPPLICANT_CONNECTION_CHANGE_ACTION))
            if (intent.getBooleanExtra(WifiManager.EXTRA_SUPPLICANT_CONNECTED, false))
            {
                bundle.putString("wifi", "on");
                // wifi is enabled
            }
            else {
                bundle.putString("wifi", "off");
                // wifi is disabled
            }
            serviceIntent.putExtras(bundle);
            context.startService(serviceIntent);
    }
}