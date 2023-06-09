package com.eyebox.helper;

import android.annotation.TargetApi;
import android.app.usage.NetworkStats;
import android.app.usage.NetworkStatsManager;
import android.content.Context;
import android.net.ConnectivityManager;
import android.os.Build;
import android.telephony.TelephonyManager;
import android.util.Log;
import java.util.Date;

@TargetApi(Build.VERSION_CODES.M)
public class NetworkStatsHelper {

    NetworkStatsManager networkStatsManager;
    int packageUid;

    public NetworkStatsHelper(NetworkStatsManager networkStatsManager) {
        this.networkStatsManager = networkStatsManager;
    }

    public NetworkStatsHelper(NetworkStatsManager networkStatsManager, int packageUid) {
        this.networkStatsManager = networkStatsManager;
        this.packageUid = packageUid;
    }

    public long getAllRxBytesMobile() {
        return getAllRxBytesMobile(null, null);
    }

    public long getAllRxBytesMobile(Date startDate, Date endDate) {
        NetworkStats.Bucket bucket;
        try {
            bucket = networkStatsManager.querySummaryForDevice(ConnectivityManager.TYPE_MOBILE,
                                "",
                                startDate != null ? startDate.getTime() : 0,
                                endDate != null ? endDate.getTime() : System.currentTimeMillis());
        } catch (Exception e) {
            return -1;
        }
        return bucket.getRxBytes();
    }

    public long getAllTxBytesMobile() {
        return getAllTxBytesMobile(null, null);
    }

    public long getAllTxBytesMobile(Date startDate, Date endDate) {
        NetworkStats.Bucket bucket;
        try {
            bucket = networkStatsManager.querySummaryForDevice(ConnectivityManager.TYPE_MOBILE,
                                    "",
                                    startDate != null ? startDate.getTime() : 0,
                                    endDate != null ? endDate.getTime() : System.currentTimeMillis());
        } catch (Exception e) {
            return -1;
        }
        return bucket.getTxBytes();
    }

    public long getAllRxBytesWifi() {
        return getAllRxBytesWifi(null, null);
    }

    public long getAllRxBytesWifi(Date startDate, Date endDate) {
        NetworkStats.Bucket bucket;
        try {
            bucket = networkStatsManager.querySummaryForDevice(ConnectivityManager.TYPE_WIFI,
                                null,
                                startDate != null ? startDate.getTime() : 0,
                                endDate != null ? endDate.getTime() : System.currentTimeMillis());
        } catch (Exception e) {
            return -1;
        }
        return bucket.getRxBytes();
    }

    public long getAllTxBytesWifi() {
        return getAllTxBytesWifi(null, null);
    }

    public long getAllTxBytesWifi(Date startDate, Date endDate) {
        NetworkStats.Bucket bucket;
        try {
            bucket = networkStatsManager.querySummaryForDevice(ConnectivityManager.TYPE_WIFI,
                    null,
                    startDate != null ? startDate.getTime() : 0,
                    endDate != null ? endDate.getTime() : System.currentTimeMillis());
        } catch (Exception e) {
            return -1;
        }
        return bucket.getTxBytes();
    }

    public long getPackageRxBytesMobile() {
        return getPackageRxBytesMobile(null, null);
    }

    public long getPackageRxBytesMobile(Date startDate, Date endDate) {
        NetworkStats networkStats = null;
        try {
            networkStats = networkStatsManager.queryDetailsForUid(
                                    ConnectivityManager.TYPE_MOBILE,
                                    "",
                                    startDate != null ? startDate.getTime() : 0,
                                    endDate != null ? endDate.getTime() : System.currentTimeMillis(),
                                    packageUid);
        } catch (Exception e) {
            return -1;
        }
        NetworkStats.Bucket bucket = new NetworkStats.Bucket();
        networkStats.getNextBucket(bucket);
        networkStats.getNextBucket(bucket);
        long rx = bucket.getRxBytes();
        networkStats.close();
        // Log.i("rx",rx.toString());
        return rx;
    }

    public long getPackageTxBytesMobile() {
        return getPackageTxBytesMobile(null, null);
    }

    public long getPackageTxBytesMobile(Date startDate, Date endDate) {
        NetworkStats networkStats = null;
        try {
            networkStats = networkStatsManager.queryDetailsForUid(
                                ConnectivityManager.TYPE_MOBILE,
                                "",
                                startDate != null ? startDate.getTime() : 0,
                                endDate != null ? endDate.getTime() : System.currentTimeMillis(),
                                packageUid);
        } catch (Exception e) {
            return -1;
        }
        NetworkStats.Bucket bucket = new NetworkStats.Bucket();
        networkStats.getNextBucket(bucket);
        long tx = bucket.getTxBytes();
        networkStats.close();
        // Log.i("tx:", tx.toString());
        return tx;
    }

    public long getPackageRxBytesWifi() {
        return getPackageRxBytesWifi(null, null);
    }

    public long getPackageRxBytesWifi(Date startDate, Date endDate) {
        NetworkStats networkStats = null;
        try {
            networkStats = networkStatsManager.queryDetailsForUid(
                                ConnectivityManager.TYPE_WIFI,
                                null,
                                startDate != null ? startDate.getTime() : 0,
                                endDate != null ? endDate.getTime() : System.currentTimeMillis(),
                    packageUid);
        } catch (Exception e) {
            return -1;
        }

        long usage = 0L;

        do {
            NetworkStats.Bucket bucket = new NetworkStats.Bucket();
            networkStats.getNextBucket(bucket);
            if (bucket.getUid() == packageUid) {
                // in some devices this is immediately looping twice
                // and the second iteration is returning correct value.
                // So result is returned in the end.
                usage += bucket.getRxBytes();
            }
        } while (networkStats.hasNextBucket());
        networkStats.close();
        return usage;
    }

    public long getPackageTxBytesWifi() {
        return getPackageTxBytesWifi(null, null);
    }

    public long getPackageTxBytesWifi(Date startDate, Date endDate) {
        NetworkStats networkStats = null;
        try {
            networkStats = networkStatsManager.queryDetailsForUid(
                                    ConnectivityManager.TYPE_WIFI,
                                    null,
                                    startDate != null ? startDate.getTime() : 0,
                                    endDate != null ? endDate.getTime() : System.currentTimeMillis(),
                                    packageUid);
        } catch (Exception e) {
            return -1;
        }

        long usage = 0L;

        do {
            NetworkStats.Bucket bucket = new NetworkStats.Bucket();
            networkStats.getNextBucket(bucket);
            if (bucket.getUid() == packageUid) {
                // in some devices this is immediately looping twice
                // and the second iteration is returning correct value.
                // So result is returned in the end.
                usage += bucket.getTxBytes();
            }
        } while (networkStats.hasNextBucket());
        networkStats.close();
        return usage;
    }

    public long getPackageBytesWifi() {
        return getPackageBytesWifi(null, null);
    }

    public long getPackageBytesWifi(Date startDate, Date endDate) {
        NetworkStats networkStats = null;
        try {
            networkStats = networkStatsManager.queryDetailsForUid(
                                    ConnectivityManager.TYPE_WIFI,
                                    null,
                                    startDate != null ? startDate.getTime() : 0,
                                    endDate != null ? endDate.getTime() : System.currentTimeMillis(),
                                    packageUid);
        } catch (Exception e) {
            return -1;
        }

        long usage = 0L;

        do {
            NetworkStats.Bucket bucket = new NetworkStats.Bucket();
            networkStats.getNextBucket(bucket);
            if (bucket.getUid() == packageUid) {
                usage += (bucket.getTxBytes() + bucket.getRxBytes());
            }
        } while (networkStats.hasNextBucket());
        networkStats.close();
        return usage;
    }

    private String getSubscriberId(Context context, int networkType) {
        try{
            if (ConnectivityManager.TYPE_MOBILE == networkType) {
                TelephonyManager tm = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
                return tm.getSubscriberId();
            }
        } catch(Exception e) {
            return null;
        }
        return null;
    }
}