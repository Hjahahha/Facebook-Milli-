package com.iraqsovereign.app.data.model

import java.math.BigDecimal

/**
 * Ghost Promotion System — products appear as "Best Value" organically,
 * not as visible ads. Engagement-driven visibility boost.
 */
data class PromotionCampaign(
    val id: String = "",
    val productId: String = "",
    val sellerId: String = "",
    val level: PromotionLevel = PromotionLevel.BRONZE,
    val budgetIQD: BigDecimal = BigDecimal.ZERO,
    val spentIQD: BigDecimal = BigDecimal.ZERO,
    val remainingIQD: BigDecimal = BigDecimal.ZERO,
    val costPerView: BigDecimal = BigDecimal("10"),
    val costPerEngagement: BigDecimal = BigDecimal("50"),
    val impressions: Long = 0L,
    val clicks: Long = 0L,
    val engagements: Long = 0L,
    val conversions: Long = 0L,
    val startDate: Long = System.currentTimeMillis(),
    val endDate: Long? = null,
    val isActive: Boolean = true,
    val moduleType: ModuleType = ModuleType.STORE
) {
    val ctr: Double
        get() = if (impressions > 0) clicks.toDouble() / impressions else 0.0

    val engagementRate: Double
        get() = if (clicks > 0) engagements.toDouble() / clicks else 0.0

    val conversionRate: Double
        get() = if (clicks > 0) conversions.toDouble() / clicks else 0.0

    fun canAffordView(): Boolean = remainingIQD >= costPerView
    fun canAffordEngagement(): Boolean = remainingIQD >= costPerEngagement
}

data class EngagementEvent(
    val id: String = "",
    val productId: String = "",
    val userId: String = "",
    val type: EngagementType = EngagementType.VIEW,
    val timestamp: Long = System.currentTimeMillis(),
    val durationMs: Long = 0L,
    val source: String = ""
)

enum class EngagementType(val weight: Double) {
    VIEW(1.0),
    CLICK(2.0),
    FAVORITE(3.0),
    ADD_TO_CART(4.0),
    MESSAGE_SELLER(5.0),
    PURCHASE(10.0),
    SHARE(3.0),
    REVIEW(6.0)
}
