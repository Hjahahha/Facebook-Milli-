package com.iraqsovereign.app.navigation

import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.iraqsovereign.app.data.model.ModuleType
import com.iraqsovereign.app.ui.screens.home.HomeScreen
import com.iraqsovereign.app.ui.screens.home.ModuleSelectorScreen
import com.iraqsovereign.app.ui.screens.store.StoreHomeScreen
import com.iraqsovereign.app.ui.screens.cars.CarsHomeScreen
import com.iraqsovereign.app.ui.screens.realestate.RealEstateHomeScreen
import com.iraqsovereign.app.ui.screens.services.ServicesHomeScreen
import com.iraqsovereign.app.ui.screens.chat.ChatListScreen
import com.iraqsovereign.app.ui.screens.profile.ProfileScreen
import com.iraqsovereign.app.ui.screens.auth.LoginScreen
import com.iraqsovereign.app.ui.screens.promotion.PromotionDashboardScreen
import com.iraqsovereign.app.ui.screens.admin.AdminDashboardScreen
import com.iraqsovereign.app.ui.theme.*

@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val currentModule = remember(currentRoute) {
        when {
            currentRoute?.startsWith("cars/") == true -> ModuleType.CARS
            currentRoute?.startsWith("realestate/") == true -> ModuleType.REAL_ESTATE
            currentRoute?.startsWith("services/") == true -> ModuleType.SERVICES
            else -> ModuleType.STORE
        }
    }

    val moduleColors = remember(currentModule) {
        when (currentModule) {
            ModuleType.STORE -> StoreModuleColors
            ModuleType.CARS -> CarsModuleColors
            ModuleType.REAL_ESTATE -> RealEstateModuleColors
            ModuleType.SERVICES -> ServicesModuleColors
        }
    }

    val showBottomBar = currentRoute in listOf(
        NavRoute.Home.route,
        NavRoute.StoreHome.route,
        NavRoute.CarsHome.route,
        NavRoute.RealEstateHome.route,
        NavRoute.ServicesHome.route,
        NavRoute.ChatList.route,
        NavRoute.Profile.route,
        NavRoute.Favorites.route
    )

    ModuleTheme(moduleColors = moduleColors) {
        Scaffold(
            bottomBar = {
                if (showBottomBar) {
                    SovereignBottomBar(
                        navController = navController,
                        currentRoute = currentRoute,
                        moduleColors = moduleColors
                    )
                }
            },
            containerColor = SovereignBlack
        ) { paddingValues ->
            NavHost(
                navController = navController,
                startDestination = NavRoute.Home.route,
                modifier = Modifier.padding(paddingValues),
                enterTransition = {
                    fadeIn(animationSpec = tween(300)) +
                        slideInHorizontally(animationSpec = tween(300)) { it / 4 }
                },
                exitTransition = {
                    fadeOut(animationSpec = tween(300))
                },
                popEnterTransition = {
                    fadeIn(animationSpec = tween(300)) +
                        slideInHorizontally(animationSpec = tween(300)) { -it / 4 }
                },
                popExitTransition = {
                    fadeOut(animationSpec = tween(300))
                }
            ) {
                composable(NavRoute.Login.route) {
                    LoginScreen(navController = navController)
                }

                composable(NavRoute.Home.route) {
                    HomeScreen(navController = navController)
                }

                composable(NavRoute.ModuleSelector.route) {
                    ModuleSelectorScreen(navController = navController)
                }

                composable(NavRoute.StoreHome.route) {
                    ModuleTheme(moduleColors = StoreModuleColors) {
                        StoreHomeScreen(navController = navController)
                    }
                }

                composable(NavRoute.CarsHome.route) {
                    ModuleTheme(moduleColors = CarsModuleColors) {
                        CarsHomeScreen(navController = navController)
                    }
                }

                composable(NavRoute.RealEstateHome.route) {
                    ModuleTheme(moduleColors = RealEstateModuleColors) {
                        RealEstateHomeScreen(navController = navController)
                    }
                }

                composable(NavRoute.ServicesHome.route) {
                    ModuleTheme(moduleColors = ServicesModuleColors) {
                        ServicesHomeScreen(navController = navController)
                    }
                }

                composable(NavRoute.ChatList.route) {
                    ChatListScreen(navController = navController)
                }

                composable(NavRoute.Profile.route) {
                    ProfileScreen(navController = navController)
                }

                composable(NavRoute.PromotionDashboard.route) {
                    PromotionDashboardScreen(navController = navController)
                }

                composable(NavRoute.AdminDashboard.route) {
                    AdminDashboardScreen(navController = navController)
                }
            }
        }
    }
}
