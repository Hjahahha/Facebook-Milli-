package com.iraqsovereign.app.data.local

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface ProductDao {
    @Query("SELECT * FROM products WHERE moduleType = :moduleType ORDER BY engagementScore DESC")
    fun getProductsByModule(moduleType: String): Flow<List<CachedProduct>>

    @Query("SELECT * FROM products WHERE promotionLevel != 'NONE' ORDER BY engagementScore DESC LIMIT :limit")
    fun getPromotedProducts(limit: Int = 20): Flow<List<CachedProduct>>

    @Query("SELECT * FROM products WHERE id = :id")
    suspend fun getProductById(id: String): CachedProduct?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertProducts(products: List<CachedProduct>)

    @Query("DELETE FROM products WHERE moduleType = :moduleType")
    suspend fun clearModuleProducts(moduleType: String)

    @Query("UPDATE products SET viewCount = viewCount + 1, engagementScore = engagementScore + :weight WHERE id = :productId")
    suspend fun recordEngagement(productId: String, weight: Double)
}

@Dao
interface TransactionDao {
    @Query("SELECT * FROM transactions WHERE userId = :userId ORDER BY createdAt DESC")
    fun getTransactionsByUser(userId: String): Flow<List<CachedTransaction>>

    @Query("SELECT * FROM transactions WHERE userId = :userId AND moduleType = :moduleType ORDER BY createdAt DESC")
    fun getTransactionsByModule(userId: String, moduleType: String): Flow<List<CachedTransaction>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTransaction(transaction: CachedTransaction)

    @Query("SELECT * FROM transactions WHERE id = :id")
    suspend fun getTransactionById(id: String): CachedTransaction?
}

@Dao
interface FavoriteDao {
    @Query("SELECT * FROM favorites ORDER BY addedAt DESC")
    fun getAllFavorites(): Flow<List<FavoriteItem>>

    @Query("SELECT * FROM favorites WHERE moduleType = :moduleType ORDER BY addedAt DESC")
    fun getFavoritesByModule(moduleType: String): Flow<List<FavoriteItem>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun addFavorite(item: FavoriteItem)

    @Query("DELETE FROM favorites WHERE productId = :productId")
    suspend fun removeFavorite(productId: String)

    @Query("SELECT EXISTS(SELECT 1 FROM favorites WHERE productId = :productId)")
    fun isFavorite(productId: String): Flow<Boolean>
}

@Dao
interface CartDao {
    @Query("SELECT * FROM cart ORDER BY addedAt DESC")
    fun getCartItems(): Flow<List<CartItem>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun addToCart(item: CartItem)

    @Query("UPDATE cart SET quantity = :quantity WHERE productId = :productId")
    suspend fun updateQuantity(productId: String, quantity: Int)

    @Query("DELETE FROM cart WHERE productId = :productId")
    suspend fun removeFromCart(productId: String)

    @Query("DELETE FROM cart")
    suspend fun clearCart()

    @Query("SELECT SUM(priceIQD * quantity) FROM cart")
    fun getCartTotal(): Flow<Long?>
}
