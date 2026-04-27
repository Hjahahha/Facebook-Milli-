package com.iraqsovereign.app.navigation

sealed class NavRoute(val route: String) {
    // Auth
    object Login : NavRoute("login")
    object Register : NavRoute("register")

    // Main
    object Home : NavRoute("home")
    object ModuleSelector : NavRoute("module_selector")

    // Store Module
    object StoreHome : NavRoute("store/home")
    object StoreProduct : NavRoute("store/product/{productId}") {
        fun createRoute(productId: String) = "store/product/$productId"
    }
    object StoreCategory : NavRoute("store/category/{categoryId}") {
        fun createRoute(categoryId: String) = "store/category/$categoryId"
    }
    object StoreCart : NavRoute("store/cart")
    object StoreCheckout : NavRoute("store/checkout")
    object StoreMerchantJoin : NavRoute("store/merchant-join")

    // Cars Module
    object CarsHome : NavRoute("cars/home")
    object CarDetail : NavRoute("cars/detail/{carId}") {
        fun createRoute(carId: String) = "cars/detail/$carId"
    }
    object CarPost : NavRoute("cars/post")

    // Real Estate Module
    object RealEstateHome : NavRoute("realestate/home")
    object PropertyDetail : NavRoute("realestate/detail/{propertyId}") {
        fun createRoute(propertyId: String) = "realestate/detail/$propertyId"
    }
    object PropertyPost : NavRoute("realestate/post")

    // Services Module
    object ServicesHome : NavRoute("services/home")
    object ServiceDetail : NavRoute("services/detail/{serviceId}") {
        fun createRoute(serviceId: String) = "services/detail/$serviceId"
    }
    object ServicePost : NavRoute("services/post")

    // Chat
    object ChatList : NavRoute("chat/list")
    object ChatConversation : NavRoute("chat/conversation/{conversationId}") {
        fun createRoute(conversationId: String) = "chat/conversation/$conversationId"
    }

    // Profile & Account
    object Profile : NavRoute("profile")
    object Wallet : NavRoute("wallet")
    object Favorites : NavRoute("favorites")
    object Orders : NavRoute("orders")
    object Settings : NavRoute("settings")

    // Admin
    object AdminDashboard : NavRoute("admin/dashboard")
    object AdminUsers : NavRoute("admin/users")
    object AdminProducts : NavRoute("admin/products")
    object AdminPromotions : NavRoute("admin/promotions")
    object AdminTransactions : NavRoute("admin/transactions")
    object AdminVerification : NavRoute("admin/verification")

    // Promotion
    object PromotionDashboard : NavRoute("promotion/dashboard")
    object PromotionCreate : NavRoute("promotion/create/{productId}") {
        fun createRoute(productId: String) = "promotion/create/$productId"
    }
}
