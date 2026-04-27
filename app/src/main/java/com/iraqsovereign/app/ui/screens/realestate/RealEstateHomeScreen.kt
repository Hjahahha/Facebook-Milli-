package com.iraqsovereign.app.ui.screens.realestate

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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.iraqsovereign.app.ui.theme.*

@Composable
fun RealEstateHomeScreen(navController: NavHostController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SovereignBlack)
            .verticalScroll(rememberScrollState())
    ) {
        // Header with emerald accent
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(RealEstateAccent.copy(alpha = 0.08f), SovereignBlack)
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
                            .background(RealEstateAccent.copy(alpha = 0.2f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Filled.Home, contentDescription = null, tint = RealEstateAccent, modifier = Modifier.size(22.dp))
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text("العقارات", fontSize = 24.sp, fontWeight = FontWeight.Black, color = TextPrimary)
                        Text("SOVEREIGN REALTY", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = RealEstateAccent, letterSpacing = 3.sp)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Property Type Filters
        LazyRow(
            contentPadding = PaddingValues(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            val types = listOf(
                "الكل" to Icons.Filled.GridView,
                "شقق" to Icons.Filled.Apartment,
                "بيوت" to Icons.Filled.Home,
                "فلل" to Icons.Filled.Villa,
                "أراضي" to Icons.Filled.Landscape,
                "تجاري" to Icons.Filled.Business,
                "مكاتب" to Icons.Filled.MeetingRoom
            )
            items(types) { (name, icon) ->
                val isSelected = name == "الكل"
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier
                        .clip(RoundedCornerShape(12.dp))
                        .background(if (isSelected) RealEstateAccent.copy(alpha = 0.15f) else SovereignCard)
                        .border(1.dp, if (isSelected) RealEstateAccent.copy(alpha = 0.5f) else SovereignBorder, RoundedCornerShape(12.dp))
                        .clickable { }
                        .padding(horizontal = 16.dp, vertical = 10.dp)
                ) {
                    Icon(
                        icon,
                        contentDescription = name,
                        tint = if (isSelected) RealEstateAccent else TextTertiary,
                        modifier = Modifier.size(22.dp)
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        name,
                        fontSize = 11.sp,
                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                        color = if (isSelected) RealEstateAccent else TextSecondary
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Purpose Toggle
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(SovereignCard)
                .padding(4.dp),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            listOf("بيع" to true, "إيجار" to false, "يومي" to false).forEach { (label, selected) ->
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(10.dp))
                        .background(if (selected) RealEstateAccent else SovereignCard)
                        .clickable { }
                        .padding(vertical = 10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        label,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (selected) SovereignBlack else TextSecondary
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Properties
        Text(
            text = "عقارات متاحة",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(horizontal = 16.dp)
        )
        Spacer(modifier = Modifier.height(12.dp))

        val properties = listOf(
            PropertyItem("شقة فاخرة في المنصور", "250,000,000 د.ع", "بيع", "180 م²", "3 غرف", "2 حمام", true),
            PropertyItem("بيت مستقل في الكرادة", "450,000,000 د.ع", "بيع", "320 م²", "5 غرف", "3 حمام", false),
            PropertyItem("شقة مفروشة للإيجار", "1,200,000 د.ع/شهر", "إيجار", "120 م²", "2 غرف", "1 حمام", true),
            PropertyItem("أرض تجارية في أربيل", "800,000,000 د.ع", "بيع", "500 م²", "-", "-", false),
            PropertyItem("فيلا فاخرة مع مسبح", "1,200,000,000 د.ع", "بيع", "600 م²", "7 غرف", "5 حمام", true)
        )

        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            properties.forEach { property ->
                PropertyCard(property)
                Spacer(modifier = Modifier.height(12.dp))
            }
        }

        // Post Property CTA
        Spacer(modifier = Modifier.height(16.dp))
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(
                    Brush.linearGradient(
                        colors = listOf(RealEstateAccent.copy(alpha = 0.15f), SovereignCard)
                    )
                )
                .border(1.dp, RealEstateAccent.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
                .clickable { }
                .padding(16.dp),
            contentAlignment = Alignment.Center
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.AddHome, contentDescription = null, tint = RealEstateAccent, modifier = Modifier.size(24.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("أضف عقارك", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = RealEstateAccent)
            }
        }

        Spacer(modifier = Modifier.height(100.dp))
    }
}

private data class PropertyItem(
    val name: String,
    val price: String,
    val purpose: String,
    val area: String,
    val rooms: String,
    val baths: String,
    val promoted: Boolean
)

@Composable
private fun PropertyCard(property: PropertyItem) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(SovereignCard)
            .border(
                1.dp,
                if (property.promoted) RealEstateAccent.copy(alpha = 0.2f) else SovereignBorder,
                RoundedCornerShape(16.dp)
            )
            .clickable { }
    ) {
        Column {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(130.dp)
                    .background(SovereignElevated),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    Icons.Filled.Home,
                    contentDescription = null,
                    tint = RealEstateAccent.copy(alpha = 0.3f),
                    modifier = Modifier.size(48.dp)
                )
                Row(
                    modifier = Modifier
                        .align(Alignment.TopStart)
                        .padding(8.dp),
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(RealEstateAccent.copy(alpha = 0.2f))
                            .padding(horizontal = 8.dp, vertical = 3.dp)
                    ) {
                        Text(property.purpose, fontSize = 10.sp, color = RealEstateAccent, fontWeight = FontWeight.Bold)
                    }
                    if (property.promoted) {
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .background(PureGold.copy(alpha = 0.2f))
                                .padding(horizontal = 8.dp, vertical = 3.dp)
                        ) {
                            Text("Best Value", fontSize = 10.sp, color = PureGold, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }

            Column(modifier = Modifier.padding(12.dp)) {
                Text(property.name, fontSize = 15.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                Spacer(modifier = Modifier.height(4.dp))
                Text(property.price, fontSize = 16.sp, fontWeight = FontWeight.Black, color = RealEstateAccent)
                Spacer(modifier = Modifier.height(8.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    PropertyChip(Icons.Outlined.SquareFoot, property.area)
                    if (property.rooms != "-") PropertyChip(Icons.Outlined.Bed, property.rooms)
                    if (property.baths != "-") PropertyChip(Icons.Outlined.Bathroom, property.baths)
                }
            }
        }
    }
}

@Composable
private fun PropertyChip(icon: ImageVector, text: String) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .clip(RoundedCornerShape(6.dp))
            .background(SovereignElevated)
            .padding(horizontal = 8.dp, vertical = 4.dp)
    ) {
        Icon(icon, contentDescription = null, tint = RealEstateAccent.copy(alpha = 0.7f), modifier = Modifier.size(14.dp))
        Spacer(modifier = Modifier.width(4.dp))
        Text(text, fontSize = 11.sp, color = TextSecondary)
    }
}
