package nl.gamesetstats.GameSetStats;

import com.reactnativenavigation.NavigationApplication;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import nl.gamesetstats.GameSetStats.BuildConfig;

import android.support.annotation.Nullable;

import java.util.Arrays;
import java.util.List;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;

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
                new VectorIconsPackage(),
                new RNViewShotPackage(),
                new RNFirebasePackage(),
                new RNFirebaseCrashlyticsPackage()
        );
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}