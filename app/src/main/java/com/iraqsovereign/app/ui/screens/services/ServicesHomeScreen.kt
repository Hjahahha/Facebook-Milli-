package com.iraqsovereign.app.ui.screens.services

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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.iraqsovereign.app.ui.theme.*

@Composable
fun ServicesHomeScreen(navController: NavHostController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SovereignBlack)
            .verticalScroll(rememberScrollState())
    ) {
        // Header with orange accent
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(ServicesAccent.copy(alpha = 0.08f), SovereignBlack)
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
                            .background(ServicesAccent.copy(alpha = 0.2f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Filled.Build, contentDescription = null, tint = ServicesAccent, modifier = Modifier.size(22.dp))
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text("الخدمات", fontSize = 24.sp, fontWeight = FontWeight.Black, color = TextPrimary)
                        Text("SOVEREIGN SERVICES", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = ServicesAccent, letterSpacing = 3.sp)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Service Categories Grid
        Text(
            text = "أنواع الخدمات",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(horizontal = 16.dp)
        )
        Spacer(modifier = Modifier.height(12.dp))

        ServiceCategoriesGrid()

        Spacer(modifier = Modifier.height(20.dp))

        // Verified Professionals
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text("مهنيون موثقون", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                Text("VERIFIED PROFESSIONALS", fontSize = 9.sp, color = ServicesAccent, letterSpacing = 2.sp, fontWeight = FontWeight.Bold)
            }
            TextButton(onClick = { }) {
                Text("عرض الكل", color = ServicesAccent, fontSize = 13.sp)
            }
        }
        Spacer(modifier = Modifier.height(12.dp))

        val professionals = listOf(
            ServicePro("أحمد الحسيني", "كهربائي", Icons.Filled.ElectricalServices, 4.9f, 156, true, "يرد خلال 5 دقائق"),
            ServicePro("مكتب الرافدين", "سباكة عامة", Icons.Filled.Plumbing, 4.8f, 243, true, "رد آلي فعال"),
            ServicePro("ورشة التميز", "نجارة وأثاث", Icons.Filled.Carpenter, 4.7f, 89, true, "يرد خلال 15 دقيقة"),
            ServicePro("علي التقني", "تكييف وتبريد", Icons.Filled.AcUnit, 4.6f, 112, false, "متاح الآن"),
            ServicePro("خالد المحترف", "دهان وديكور", Icons.Filled.FormatPaint, 4.8f, 67, true, "يرد خلال 10 دقائق")
        )

        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            professionals.forEach { pro ->
                ServiceProfessionalCard(pro)
                Spacer(modifier = Modifier.height(12.dp))
            }
        }

        // Register as Professional CTA
        Spacer(modifier = Modifier.height(16.dp))
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(
                    Brush.linearGradient(
                        colors = listOf(ServicesAccent.copy(alpha = 0.15f), SovereignCard)
                    )
                )
                .border(1.dp, ServicesAccent.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
                .clickable { }
                .padding(16.dp),
            contentAlignment = Alignment.Center
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.PersonAdd, contentDescription = null, tint = ServicesAccent, modifier = Modifier.size(24.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Column {
                    Text("سجّل كمزود خدمة", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = ServicesAccent)
                    Text("احصل على العلامة الزرقاء وزبائن أكثر", fontSize = 11.sp, color = TextSecondary)
                }
            }
        }

        Spacer(modifier = Modifier.height(100.dp))
    }
}

@Composable
private fun ServiceCategoriesGrid() {
    data class ServiceCat(val name: String, val icon: ImageVector, val color: Color)

    val categories = listOf(
        ServiceCat("سباكة", Icons.Filled.Plumbing, Color(0xFF2196F3)),
        ServiceCat("كهرباء", Icons.Filled.ElectricalServices, Color(0xFFFFEB3B)),
        ServiceCat("نجارة", Icons.Filled.Carpenter, Color(0xFF8D6E63)),
        ServiceCat("دهان", Icons.Filled.FormatPaint, Color(0xFFE91E63)),
        ServiceCat("تكييف", Icons.Filled.AcUnit, Color(0xFF00BCD4)),
        ServiceCat("ميكانيك", Icons.Filled.Build, Color(0xFF607D8B)),
        ServiceCat("تنظيف", Icons.Filled.CleaningServices, Color(0xFF4CAF50)),
        ServiceCat("نقل أثاث", Icons.Filled.LocalShipping, Color(0xFFFF9800)),
        ServiceCat("لحام", Icons.Filled.Hardware, Color(0xFFFF5722)),
        ServiceCat("تبليط", Icons.Filled.GridOn, Color(0xFF795548)),
        ServiceCat("دعم تقني", Icons.Filled.Computer, Color(0xFF3F51B5)),
        ServiceCat("توصيل", Icons.Filled.DeliveryDining, Color(0xFF009688))
    )

    Column(modifier = Modifier.padding(horizontal = 16.dp)) {
        categories.chunked(4).forEach { row ->
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                row.forEach { cat ->
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier
                            .clip(RoundedCornerShape(12.dp))
                            .clickable { }
                            .padding(8.dp)
                            .width(68.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(44.dp)
                                .clip(CircleShape)
                                .background(cat.color.copy(alpha = 0.15f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(cat.icon, contentDescription = cat.name, tint = cat.color, modifier = Modifier.size(22.dp))
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            cat.name,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Medium,
                            color = TextSecondary,
                            maxLines = 1
                        )
                    }
                }
                repeat(4 - row.size) {
                    Spacer(modifier = Modifier.width(68.dp))
                }
            }
            Spacer(modifier = Modifier.height(4.dp))
        }
    }
}

private data class ServicePro(
    val name: String,
    val specialty: String,
    val icon: ImageVector,
    val rating: Float,
    val jobs: Int,
    val verified: Boolean,
    val responseInfo: String
)

@Composable
private fun ServiceProfessionalCard(pro: ServicePro) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(SovereignCard)
            .border(
                1.dp,
                if (pro.verified) ServicesAccent.copy(alpha = 0.2f) else SovereignBorder,
                RoundedCornerShape(16.dp)
            )
            .clickable { }
            .padding(14.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            // Avatar
            Box(
                modifier = Modifier
                    .size(52.dp)
                    .clip(CircleShape)
                    .background(ServicesAccent.copy(alpha = 0.15f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(pro.icon, contentDescription = null, tint = ServicesAccent, modifier = Modifier.size(26.dp))
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(pro.name, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                    if (pro.verified) {
                        Spacer(modifier = Modifier.width(4.dp))
                        Icon(
                            Icons.Filled.Verified,
                            contentDescription = "موثق",
                            tint = VerifiedBlue,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                }
                Text(pro.specialty, fontSize = 12.sp, color = ServicesAccent, fontWeight = FontWeight.Medium)
                Spacer(modifier = Modifier.height(4.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Filled.Star, contentDescription = null, tint = PureGold, modifier = Modifier.size(14.dp))
                    Spacer(modifier = Modifier.width(2.dp))
                    Text("${pro.rating}", fontSize = 12.sp, color = PureGold, fontWeight = FontWeight.Bold)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("${pro.jobs} عمل مكتمل", fontSize = 11.sp, color = TextTertiary)
                }
                Spacer(modifier = Modifier.height(2.dp))
                Text(pro.responseInfo, fontSize = 10.sp, color = SuccessGreen)
            }

            // Quick Contact
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(CircleShape)
                    .background(ServicesAccent.copy(alpha = 0.15f))
                    .clickable { },
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Filled.Chat, contentDescription = null, tint = ServicesAccent, modifier = Modifier.size(20.dp))
            }
        }
    }
}
