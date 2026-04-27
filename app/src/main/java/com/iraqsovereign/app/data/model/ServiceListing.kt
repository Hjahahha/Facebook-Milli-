package com.iraqsovereign.app.data.model

data class ServiceListing(
    val id: String = "",
    val title: String = "",
    val category: ServiceCategory = ServiceCategory.PLUMBER,
    val priceIQD: Long = 0L,
    val priceType: PriceType = PriceType.FIXED,
    val providerId: String = "",
    val providerName: String = "",
    val isProviderVerified: Boolean = false,
    val rating: Float = 0f,
    val reviewCount: Int = 0,
    val completedJobs: Int = 0,
    val location: String = "",
    val serviceArea: List<String> = emptyList(),
    val description: String = "",
    val images: List<String> = emptyList(),
    val availability: List<String> = emptyList(),
    val autoReplyEnabled: Boolean = false,
    val autoReplyTemplates: List<String> = emptyList(),
    val responseTimeMinutes: Int = 0,
    val promotionLevel: PromotionLevel = PromotionLevel.NONE,
    val viewCount: Long = 0L,
    val createdAt: Long = System.currentTimeMillis()
)

enum class ServiceCategory(val nameAr: String, val icon: String) {
    PLUMBER("سباك", "plumbing"),
    ELECTRICIAN("كهربائي", "electrical_services"),
    CARPENTER("نجار", "carpenter"),
    PAINTER("دهان", "format_paint"),
    AC_TECHNICIAN("فني تكييف", "ac_unit"),
    MECHANIC("ميكانيكي", "build"),
    CLEANER("تنظيف", "cleaning_services"),
    MOVER("نقل أثاث", "local_shipping"),
    LOCKSMITH("فتح أقفال", "lock"),
    GARDENER("بستاني", "yard"),
    WELDER("لحام", "hardware"),
    TILER("مبلط", "grid_on"),
    IT_SUPPORT("دعم تقني", "computer"),
    DELIVERY("توصيل", "delivery_dining"),
    OTHER("أخرى", "miscellaneous_services")
}

enum class PriceType(val nameAr: String) {
    FIXED("سعر ثابت"),
    HOURLY("بالساعة"),
    NEGOTIABLE("قابل للتفاوض"),
    FREE_ESTIMATE("تقدير مجاني")
}
