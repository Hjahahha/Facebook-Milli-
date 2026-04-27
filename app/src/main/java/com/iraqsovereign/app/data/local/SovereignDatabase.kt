package com.iraqsovereign.app.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.TypeConverters

/**
 * Master-Slave Architecture Ready
 *
 * Local Room database serves as the offline-first cache layer.
 * In production, this syncs with a cloud Firestore/PostgreSQL backend
 * using a Master-Slave replication strategy:
 *
 * MASTER: Cloud Firestore (writes)
 * SLAVE: Local Room DB (reads, offline cache)
 *
 * Each module (Store, Cars, RealEstate, Services) has isolated tables
 * to prevent cross-contamination and enable independent scaling.
 */
@Database(
    entities = [
        CachedProduct::class,
        CachedTransaction::class,
        FavoriteItem::class,
        CartItem::class
    ],
    version = 1,
    exportSchema = true
)
@TypeConverters(Converters::class)
abstract class SovereignDatabase : RoomDatabase() {
    abstract fun productDao(): ProductDao
    abstract fun transactionDao(): TransactionDao
    abstract fun favoriteDao(): FavoriteDao
    abstract fun cartDao(): CartDao
}
