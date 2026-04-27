# Iraq Sovereign Platform - ProGuard Rules

# Kotlin
-dontwarn kotlin.**
-keep class kotlin.Metadata { *; }

# Compose
-keep class androidx.compose.** { *; }

# Room
-keep class * extends androidx.room.RoomDatabase
-keep @androidx.room.Entity class *
-keepclassmembers class * { @androidx.room.* <methods>; }

# Firebase
-keep class com.google.firebase.** { *; }

# Socket.IO
-keep class io.socket.** { *; }

# Retrofit
-keepattributes Signature
-keepattributes *Annotation*
-keep class retrofit2.** { *; }
-keepclasseswithmembers class * { @retrofit2.http.* <methods>; }

# Gson
-keep class com.google.gson.** { *; }
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer

# Data Models
-keep class com.iraqsovereign.app.data.model.** { *; }

# Hilt
-keep class dagger.hilt.** { *; }
-keep class javax.inject.** { *; }
-keep class * extends dagger.hilt.android.internal.managers.ViewComponentManager$FragmentContextWrapper { *; }
