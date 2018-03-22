package nl.gamesetstats.GameSetStats;
import com.reactnativenavigation.controllers.SplashActivity;


public class MainActivity extends SplashActivity {

 @Override
    protected void onStart() {
        super.onStart();
        setContentView(R.layout.splash);
    }
}
