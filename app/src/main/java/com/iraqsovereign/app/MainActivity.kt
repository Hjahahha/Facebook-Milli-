package com.iraqsovereign.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.iraqsovereign.app.navigation.AppNavigation
import com.iraqsovereign.app.ui.theme.IraqSovereignTheme
import com.iraqsovereign.app.ui.theme.SovereignBlack
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            IraqSovereignTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = SovereignBlack
                ) {
                    AppNavigation()
                }
            }
        }
    }
}
