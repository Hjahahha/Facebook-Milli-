package com.iraqsovereign.app.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val SovereignDarkColorScheme = darkColorScheme(
    primary = NeonBlue,
    onPrimary = TextOnNeon,
    primaryContainer = NeonBlueDim,
    onPrimaryContainer = TextPrimary,

    secondary = PureGold,
    onSecondary = TextOnGold,
    secondaryContainer = PureGoldDim,
    onSecondaryContainer = TextPrimary,

    tertiary = VerifiedBlue,
    onTertiary = TextPrimary,

    background = SovereignBlack,
    onBackground = TextPrimary,

    surface = SovereignSurface,
    onSurface = TextPrimary,
    surfaceVariant = SovereignCard,
    onSurfaceVariant = TextSecondary,

    error = ErrorRed,
    onError = TextPrimary,

    outline = SovereignBorder,
    outlineVariant = SovereignDivider
)

@Composable
fun IraqSovereignTheme(
    content: @Composable () -> Unit
) {
    val colorScheme = SovereignDarkColorScheme
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = SovereignBlack.toArgb()
            window.navigationBarColor = SovereignBlack.toArgb()
            WindowCompat.getInsetsController(window, view).apply {
                isAppearanceLightStatusBars = false
                isAppearanceLightNavigationBars = false
            }
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = SovereignTypography,
        content = content
    )
}
