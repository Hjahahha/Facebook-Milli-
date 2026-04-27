package com.iraqsovereign.app.utils

import com.iraqsovereign.app.data.model.EngagementType
import com.iraqsovereign.app.data.model.PromotionLevel
import java.math.BigDecimal

/**
 * Ghost Promotion Engine
 *
 * Products are ranked based on a composite score that blends
 * organic engagement with promotion boost. Promoted products
 * appear as "Best Value" — never as visible advertisements.
 *
 * Score = (organicEngagement * engagementWeight) + (promotionMultiplier * promotionBoost)
 *
 * The algorithm ensures promoted products only rise when they have
 * real engagement — preventing fake counter inflation.
 */
object PromotionEngine {

    fun calculateVisibilityScore(
        viewCount: Long,
        clickCount: Long,
        favoriteCount: Long,
        messageCount: Long,
        purchaseCount: Long,
        promotionLevel: PromotionLevel,
        ageHours: Long
    ): Double {
        val engagementScore = (
            viewCount * EngagementType.VIEW.weight +
            clickCount * EngagementType.CLICK.weight +
            favoriteCount * EngagementType.FAVORITE.weight +
            messageCount * EngagementType.MESSAGE_SELLER.weight +
            purchaseCount * EngagementType.PURCHASE.weight
        )

        // Time decay: newer listings get a boost
        val recencyBoost = when {
            ageHours < 24 -> 2.0
            ageHours < 72 -> 1.5
            ageHours < 168 -> 1.2
            else -> 1.0
        }

        // Promotion multiplier only works if there's real engagement
        val promotionMultiplier = if (engagementScore > 0) {
            promotionLevel.multiplier
        } else {
            1.0 // No boost for zero-engagement products
        }

        return engagementScore * recencyBoost * promotionMultiplier
    }

    fun calculatePromotionCost(
        level: PromotionLevel,
        durationDays: Int
    ): BigDecimal {
        val dailyCost = when (level) {
            PromotionLevel.NONE -> BigDecimal.ZERO
            PromotionLevel.BRONZE -> BigDecimal("500")
            PromotionLevel.SILVER -> BigDecimal("1500")
            PromotionLevel.GOLD -> BigDecimal("3000")
            PromotionLevel.PLATINUM -> BigDecimal("7000")
        }
        return dailyCost.multiply(BigDecimal(durationDays))
    }

    fun shouldShowAsPromoted(score: Double, threshold: Double = 50.0): Boolean {
        return score >= threshold
    }

    fun getPromotionTag(score: Double): String? {
        return when {
            score >= 500 -> "Top Pick"
            score >= 200 -> "Best Value"
            score >= 100 -> "Popular"
            score >= 50 -> "Rising"
            else -> null
        }
    }
}
