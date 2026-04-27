package com.iraqsovereign.app.data.local

import androidx.room.*
import java.math.BigDecimal

@Entity(tableName = "products")
data class CachedProduct(
    @PrimaryKey val id: String,
    val title: String,
    val titleAr: String,
    val priceIQD: Long,
    val originalPriceIQD: Long?,
    val categoryId: String,
    val moduleType: String,
    val sellerId: String,
    val sellerName: String,
    val isSellerVerified: Boolean,
    val rating: Float,
    val viewCount: Long,
    val engagementScore: Double,
    val promotionLevel: String,
    val imageUrl: String?,
    val location: String,
    val isInStock: Boolean,
    val createdAt: Long,
    val lastSynced: Long = System.currentTimeMillis()
)

@Entity(tableName = "transactions")
data class CachedTransaction(
    @PrimaryKey val id: String,
    val userId: String,
    val type: String,
    val amountIQD: String, // BigDecimal as String for Room
    val balanceBefore: String,
    val balanceAfter: String,
    val description: String,
    val referenceId: String,
    val moduleType: String,
    val status: String,
    val createdAt: Long,
    val completedAt: Long?
)

@Entity(tableName = "favorites")
data class FavoriteItem(
    @PrimaryKey val productId: String,
    val moduleType: String,
    val addedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "cart")
data class CartItem(
    @PrimaryKey val productId: String,
    val quantity: Int = 1,
    val priceIQD: Long,
    val title: String,
    val imageUrl: String?,
    val addedAt: Long = System.currentTimeMillis()
)
