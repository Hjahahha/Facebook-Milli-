package com.iraqsovereign.app.data.model

data class RealEstateListing(
    val id: String = "",
    val title: String = "",
    val type: PropertyType = PropertyType.APARTMENT,
    val purpose: PropertyPurpose = PropertyPurpose.SALE,
    val priceIQD: Long = 0L,
    val areaM2: Double = 0.0,
    val bedrooms: Int = 0,
    val bathrooms: Int = 0,
    val floor: Int? = null,
    val totalFloors: Int? = null,
    val furnishing: FurnishingType = FurnishingType.UNFURNISHED,
    val images: List<String> = emptyList(),
    val sellerId: String = "",
    val sellerName: String = "",
    val isSellerVerified: Boolean = false,
    val location: String = "",
    val address: String = "",
    val description: String = "",
    val features: List<String> = emptyList(),
    val promotionLevel: PromotionLevel = PromotionLevel.NONE,
    val viewCount: Long = 0L,
    val createdAt: Long = System.currentTimeMillis()
)

enum class PropertyType(val nameAr: String) {
    APARTMENT("شقة"),
    HOUSE("بيت"),
    VILLA("فيلا"),
    COMMERCIAL("تجاري"),
    LAND("أرض"),
    OFFICE("مكتب"),
    WAREHOUSE("مخزن")
}

enum class PropertyPurpose(val nameAr: String) {
    SALE("بيع"),
    RENT("إيجار"),
    DAILY_RENT("إيجار يومي")
}

enum class FurnishingType(val nameAr: String) {
    FURNISHED("مفروش"),
    SEMI_FURNISHED("نصف مفروش"),
    UNFURNISHED("بدون أثاث")
}
