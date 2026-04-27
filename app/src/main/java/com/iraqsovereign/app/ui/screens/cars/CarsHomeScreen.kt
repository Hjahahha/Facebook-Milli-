package com.iraqsovereign.app.ui.screens.cars

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.iraqsovereign.app.ui.theme.*

@Composable
fun CarsHomeScreen(navController: NavHostController) {
    val moduleColors = LocalModuleColors.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SovereignBlack)
            .verticalScroll(rememberScrollState())
    ) {
        // Cars Module Header with crimson accent
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            CarsAccent.copy(alpha = 0.1f),
                            SovereignBlack
                        )
                    )
                )
                .padding(horizontal = 16.dp, vertical = 16.dp)
        ) {
            Column {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(40.dp)
                            .clip(CircleShape)
                            .background(CarsAccent.copy(alpha = 0.2f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Filled.DirectionsCar, contentDescription = null, tint = CarsAccent, modifier = Modifier.size(22.dp))
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text("السيارات", fontSize = 24.sp, fontWeight = FontWeight.Black, color = TextPrimary)
                        Text("SOVEREIGN MOTORS", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = CarsAccent, letterSpacing = 3.sp)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Quick Filters
        LazyRow(
            contentPadding = PaddingValues(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            val filters = listOf("الكل", "جديد", "مستعمل", "حوادث", "تويوتا", "هيونداي", "كيا", "BMW", "مرسيدس")
            items(filters) { filter ->
                val isFirst = filter == "الكل"
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(10.dp))
                        .background(if (isFirst) CarsAccent else SovereignCard)
                        .border(1.dp, if (isFirst) CarsAccent else SovereignBorder, RoundedCornerShape(10.dp))
                        .clickable { }
                        .padding(horizontal = 14.dp, vertical = 8.dp)
                ) {
                    Text(
                        filter,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = if (isFirst) SovereignBlack else TextSecondary
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Featured Cars
        Text(
            text = "سيارات مميزة",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(horizontal = 16.dp)
        )
        Spacer(modifier = Modifier.height(12.dp))

        val cars = listOf(
            CarItem("تويوتا لاندكروزر 2024", "105,000,000 د.ع", "جديد", "0 كم", "أوتوماتيك", true),
            CarItem("هيونداي سوناتا 2023", "48,000,000 د.ع", "مستعمل", "15,000 كم", "أوتوماتيك", false),
            CarItem("كيا سبورتاج 2024", "62,000,000 د.ع", "جديد", "0 كم", "أوتوماتيك", true),
            CarItem("BMW X5 2022", "95,000,000 د.ع", "مستعمل", "22,000 كم", "أوتوماتيك", false),
            CarItem("تويوتا كامري 2023", "55,000,000 د.ع", "مستعمل", "8,000 كم", "أوتوماتيك", true),
            CarItem("مرسيدس C300 2023", "85,000,000 د.ع", "مستعمل", "12,000 كم", "أوتوماتيك", false)
        )

        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            cars.forEach { car ->
                CarListingCard(car)
                Spacer(modifier = Modifier.height(12.dp))
            }
        }

        // Post a Car CTA
        Spacer(modifier = Modifier.height(16.dp))
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(
                    Brush.linearGradient(
                        colors = listOf(CarsAccent.copy(alpha = 0.15f), SovereignCard)
                    )
                )
                .border(1.dp, CarsAccent.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
                .clickable { }
                .padding(16.dp),
            contentAlignment = Alignment.Center
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.AddCircle, contentDescription = null, tint = CarsAccent, modifier = Modifier.size(24.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("أضف سيارتك للبيع", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = CarsAccent)
            }
        }

        Spacer(modifier = Modifier.height(100.dp))
    }
}

private data class CarItem(
    val name: String,
    val price: String,
    val condition: String,
    val mileage: String,
    val transmission: String,
    val promoted: Boolean
)

@Composable
private fun CarListingCard(car: CarItem) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(SovereignCard)
            .border(
                1.dp,
                if (car.promoted) CarsAccent.copy(alpha = 0.2f) else SovereignBorder,
                RoundedCornerShape(16.dp)
            )
            .clickable { }
    ) {
        Column {
            // Image area
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(140.dp)
                    .background(SovereignElevated),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    Icons.Filled.DirectionsCar,
                    contentDescription = null,
                    tint = CarsAccent.copy(alpha = 0.3f),
                    modifier = Modifier.size(56.dp)
                )
                if (car.promoted) {
                    Box(
                        modifier = Modifier
                            .align(Alignment.TopStart)
                            .padding(8.dp)
                            .clip(RoundedCornerShape(6.dp))
                            .background(CarsAccent.copy(alpha = 0.2f))
                            .padding(horizontal = 8.dp, vertical = 3.dp)
                    ) {
                        Text("مميز", fontSize = 10.sp, color = CarsAccent, fontWeight = FontWeight.Bold)
                    }
                }
                Box(
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                        .padding(8.dp)
                        .clip(RoundedCornerShape(6.dp))
                        .background(
                            if (car.condition == "جديد") SuccessGreen.copy(alpha = 0.2f)
                            else SovereignElevated.copy(alpha = 0.8f)
                        )
                        .padding(horizontal = 8.dp, vertical = 3.dp)
                ) {
                    Text(
                        car.condition,
                        fontSize = 10.sp,
                        color = if (car.condition == "جديد") SuccessGreen else TextSecondary,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            // Details
            Column(modifier = Modifier.padding(12.dp)) {
                Text(
                    car.name,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    car.price,
                    fontSize = 17.sp,
                    fontWeight = FontWeight.Black,
                    color = CarsAccent
                )
                Spacer(modifier = Modifier.height(8.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    DetailChip(Icons.Outlined.Speed, car.mileage)
                    DetailChip(Icons.Outlined.Settings, car.transmission)
                }
            }
        }
    }
}

@Composable
private fun DetailChip(icon: ImageVector, text: String) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .clip(RoundedCornerShape(6.dp))
            .background(SovereignElevated)
            .padding(horizontal = 8.dp, vertical = 4.dp)
    ) {
        Icon(icon, contentDescription = null, tint = TextTertiary, modifier = Modifier.size(14.dp))
        Spacer(modifier = Modifier.width(4.dp))
        Text(text, fontSize = 11.sp, color = TextSecondary)
    }
}
