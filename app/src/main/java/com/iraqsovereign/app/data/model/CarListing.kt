package com.iraqsovereign.app.data.model

data class CarListing(
    val id: String = "",
    val title: String = "",
    val make: String = "",
    val model: String = "",
    val year: Int = 0,
    val mileageKm: Int = 0,
    val fuelType: FuelType = FuelType.GASOLINE,
    val transmission: TransmissionType = TransmissionType.AUTOMATIC,
    val color: String = "",
    val priceIQD: Long = 0L,
    val isNegotiable: Boolean = false,
    val images: List<String> = emptyList(),
    val sellerId: String = "",
    val sellerName: String = "",
    val isSellerVerified: Boolean = false,
    val location: String = "",
    val description: String = "",
    val condition: CarCondition = CarCondition.USED,
    val engineSizeCC: Int = 0,
    val features: List<String> = emptyList(),
    val promotionLevel: PromotionLevel = PromotionLevel.NONE,
    val viewCount: Long = 0L,
    val createdAt: Long = System.currentTimeMillis()
)

enum class FuelType(val nameAr: String) {
    GASOLINE("بنزين"),
    DIESEL("ديزل"),
    HYBRID("هايبرد"),
    ELECTRIC("كهربائي"),
    LPG("غاز")
}

enum class TransmissionType(val nameAr: String) {
    AUTOMATIC("أوتوماتيك"),
    MANUAL("عادي"),
    CVT("CVT")
}

enum class CarCondition(val nameAr: String) {
    NEW("جديد"),
    USED("مستعمل"),
    SALVAGE("حوادث")
}
