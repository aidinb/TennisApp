package com.tennisapp;

import android.app.Application;

import com.reactnativenavigation.NavigationApplication;

import com.facebook.react.ReactApplication;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import android.support.annotation.Nullable;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends NavigationApplication implements ReactApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
                new LinearGradientPackage(),
                new VectorIconsPackage()
        );
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}