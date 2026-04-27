package com.iraqsovereign.app.di

import android.content.Context
import androidx.room.Room
import com.iraqsovereign.app.data.local.*
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideSovereignDatabase(@ApplicationContext context: Context): SovereignDatabase {
        return Room.databaseBuilder(
            context,
            SovereignDatabase::class.java,
            "sovereign_db"
        )
            .fallbackToDestructiveMigration()
            .build()
    }

    @Provides
    fun provideProductDao(db: SovereignDatabase): ProductDao = db.productDao()

    @Provides
    fun provideTransactionDao(db: SovereignDatabase): TransactionDao = db.transactionDao()

    @Provides
    fun provideFavoriteDao(db: SovereignDatabase): FavoriteDao = db.favoriteDao()

    @Provides
    fun provideCartDao(db: SovereignDatabase): CartDao = db.cartDao()
}
