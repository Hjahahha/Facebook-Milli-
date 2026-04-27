package com.iraqsovereign.app.data.model

data class User(
    val id: String = "",
    val name: String = "",
    val email: String = "",
    val phone: String = "",
    val avatarUrl: String = "",
    val isVerified: Boolean = false,
    val isMerchant: Boolean = false,
    val isAdmin: Boolean = false,
    val merchantTier: MerchantTier? = null,
    val walletBalanceIQD: Long = 0L,
    val walletBalanceUSD: Double = 0.0,
    val createdAt: Long = System.currentTimeMillis(),
    val lastLogin: Long = System.currentTimeMillis()
)

enum class MerchantTier(val priceIQD: Long, val nameAr: String) {
    STANDARD(25_000L, "الباقة الأساسية"),
    PREMIUM(99_000L, "الباقة المميزة")
}

data class VerificationBadge(
    val userId: String,
    val type: BadgeType,
    val verifiedAt: Long = System.currentTimeMillis(),
    val verifiedBy: String = ""
)

enum class BadgeType(val nameAr: String, val icon: String) {
    PROFESSIONAL("مهني موثق", "verified"),
    OFFICE("مكتب رسمي", "business"),
    PREMIUM_MERCHANT("تاجر مميز", "star"),
    GOVERNMENT("جهة حكومية", "shield")
}
