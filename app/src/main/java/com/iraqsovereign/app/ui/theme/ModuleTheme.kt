package com.iraqsovereign.app.ui.theme

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

/**
 * Each module (Store, Cars, Real Estate, Services) has its own visual identity.
 * This enables the "Independent Nation" concept — when a user enters a section,
 * the entire app identity transforms.
 */
@Immutable
data class ModuleColorScheme(
    val accent: Color,
    val accentDim: Color,
    val glow: Color,
    val surface: Color,
    val secondary: Color,
    val moduleName: String,
    val moduleNameAr: String
)

val StoreModuleColors = ModuleColorScheme(
    accent = NeonBlue,
    accentDim = NeonBlueDim,
    glow = NeonBlueGlow,
    surface = NeonBlueSurface,
    secondary = PureGold,
    moduleName = "Store",
    moduleNameAr = "المتجر"
)

val CarsModuleColors = ModuleColorScheme(
    accent = CarsAccent,
    accentDim = CarsAccentDim,
    glow = CarsGlow,
    surface = CarsSurface,
    secondary = CarsChrome,
    moduleName = "Cars",
    moduleNameAr = "السيارات"
)

val RealEstateModuleColors = ModuleColorScheme(
    accent = RealEstateAccent,
    accentDim = RealEstateAccentDim,
    glow = RealEstateGlow,
    surface = RealEstateSurface,
    secondary = RealEstateMarble,
    moduleName = "Real Estate",
    moduleNameAr = "العقارات"
)

val ServicesModuleColors = ModuleColorScheme(
    accent = ServicesAccent,
    accentDim = ServicesAccentDim,
    glow = ServicesGlow,
    surface = ServicesSurface,
    secondary = ServicesSteel,
    moduleName = "Services",
    moduleNameAr = "الخدمات"
)

val LocalModuleColors = staticCompositionLocalOf { StoreModuleColors }

@Composable
fun ModuleTheme(
    moduleColors: ModuleColorScheme,
    content: @Composable () -> Unit
) {
    CompositionLocalProvider(LocalModuleColors provides moduleColors) {
        content()
    }
}
