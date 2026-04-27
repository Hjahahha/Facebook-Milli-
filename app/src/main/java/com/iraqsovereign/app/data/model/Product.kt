package com.iraqsovereign.app.data.model

data class Product(
    val id: String = "",
    val title: String = "",
    val titleAr: String = "",
    val description: String = "",
    val descriptionAr: String = "",
    val priceIQD: Long = 0L,
    val originalPriceIQD: Long? = null,
    val images: List<String> = emptyList(),
    val categoryId: String = "",
    val moduleType: ModuleType = ModuleType.STORE,
    val sellerId: String = "",
    val sellerName: String = "",
    val isSellerVerified: Boolean = false,
    val rating: Float = 0f,
    val reviewCount: Int = 0,
    val viewCount: Long = 0L,
    val engagementScore: Double = 0.0,
    val promotionLevel: PromotionLevel = PromotionLevel.NONE,
    val promotionCreditsSpent: Long = 0L,
    val isFavorited: Boolean = false,
    val isInStock: Boolean = true,
    val createdAt: Long = System.currentTimeMillis(),
    val location: String = "",
    val tags: List<String> = emptyList()
)

enum class ModuleType(val nameAr: String) {
    STORE("المتجر"),
    CARS("السيارات"),
    REAL_ESTATE("العقارات"),
    SERVICES("الخدمات")
}

enum class PromotionLevel(val multiplier: Double, val nameAr: String) {
    NONE(1.0, "بدون ترويج"),
    BRONZE(1.5, "برونزي"),
    SILVER(2.5, "فضي"),
    GOLD(4.0, "ذهبي"),
    PLATINUM(7.0, "بلاتيني")
}

data class Category(
    val id: String = "",
    val name: String = "",
    val nameAr: String = "",
    val icon: String = "",
    val moduleType: ModuleType = ModuleType.STORE,
    val parentId: String? = null,
    val sortOrder: Int = 0
)
