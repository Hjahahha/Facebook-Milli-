package com.iraqsovereign.app.ui.screens.home

import androidx.compose.animation.core.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.iraqsovereign.app.navigation.NavRoute
import com.iraqsovereign.app.ui.theme.*

@Composable
fun ModuleSelectorScreen(navController: NavHostController) {
    data class ModuleCard(
        val nameAr: String,
        val nameEn: String,
        val description: String,
        val icon: ImageVector,
        val accent: Color,
        val accentDim: Color,
        val route: String,
        val itemCount: String
    )

    val modules = listOf(
        ModuleCard(
            "المتجر العام", "STORE", "إلكترونيات، ملابس، أجهزة",
            Icons.Filled.ShoppingBag, NeonBlue, NeonBlueDim,
            NavRoute.StoreHome.route, "12,500+ منتج"
        ),
        ModuleCard(
            "السيارات", "CARS", "بيع، شراء، استبدال المركبات",
            Icons.Filled.DirectionsCar, CarsAccent, CarsAccentDim,
            NavRoute.CarsHome.route, "3,200+ سيارة"
        ),
        ModuleCard(
            "العقارات", "REAL ESTATE", "شقق، بيوت، أراضي، مكاتب",
            Icons.Filled.Home, RealEstateAccent, RealEstateAccentDim,
            NavRoute.RealEstateHome.route, "8,700+ عقار"
        ),
        ModuleCard(
            "الخدمات", "SERVICES", "سباكين، كهربائيين، فنيين",
            Icons.Filled.Build, ServicesAccent, ServicesAccentDim,
            NavRoute.ServicesHome.route, "2,100+ مزود خدمة"
        )
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SovereignBlack)
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            text = "الأقسام",
            fontSize = 28.sp,
            fontWeight = FontWeight.Black,
            color = TextPrimary
        )
        Text(
            text = "MODULES",
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            color = NeonBlue,
            letterSpacing = 4.sp
        )
        Text(
            text = "كل قسم عالم مستقل بذاته",
            fontSize = 13.sp,
            color = TextTertiary,
            modifier = Modifier.padding(top = 4.dp)
        )

        Spacer(modifier = Modifier.height(24.dp))

        modules.forEach { module ->
            ModuleCardItem(module, navController)
            Spacer(modifier = Modifier.height(16.dp))
        }

        Spacer(modifier = Modifier.height(80.dp))
    }
}

@Composable
private fun ModuleCardItem(
    module: Any,
    navController: NavHostController
) {
    @Suppress("UNCHECKED_CAST")
    val m = module as? ModuleSelectorScreenData ?: return

    // Using reflection-free approach with explicit params
}

// Refactored to avoid complex data class in local scope
@Composable
fun ModuleSelectorScreen_ModuleCard(
    nameAr: String,
    nameEn: String,
    description: String,
    icon: ImageVector,
    accent: Color,
    accentDim: Color,
    route: String,
    itemCount: String,
    navController: NavHostController
) {
    val infiniteTransition = rememberInfiniteTransition(label = "module_$nameEn")
    val borderAlpha by infiniteTransition.animateFloat(
        initialValue = 0.2f,
        targetValue = 0.5f,
        animationSpec = infiniteRepeatable(
            animation = tween(3000, easing = EaseInOut),
            repeatMode = RepeatMode.Reverse
        ),
        label = "border"
    )

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(20.dp))
            .background(SovereignCard)
            .border(
                1.dp,
                accent.copy(alpha = borderAlpha),
                RoundedCornerShape(20.dp)
            )
            .clickable { navController.navigate(route) }
            .padding(20.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            Box(
                modifier = Modifier
                    .size(64.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(accent.copy(alpha = 0.12f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    icon,
                    contentDescription = nameAr,
                    tint = accent,
                    modifier = Modifier.size(32.dp)
                )
            }

            Spacer(modifier = Modifier.width(16.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = nameAr,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )
                Text(
                    text = nameEn,
                    fontSize = 9.sp,
                    fontWeight = FontWeight.Bold,
                    color = accent,
                    letterSpacing = 2.sp
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = description,
                    fontSize = 12.sp,
                    color = TextSecondary
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = itemCount,
                    fontSize = 11.sp,
                    color = accent.copy(alpha = 0.8f),
                    fontWeight = FontWeight.Medium
                )
            }

            Icon(
                Icons.Filled.ChevronRight,
                contentDescription = null,
                tint = accent,
                modifier = Modifier.size(24.dp)
            )
        }
    }
}

private data class ModuleSelectorScreenData(
    val nameAr: String = "",
    val nameEn: String = "",
    val description: String = "",
    val icon: ImageVector = Icons.Filled.Apps,
    val accent: Color = NeonBlue,
    val accentDim: Color = NeonBlueDim,
    val route: String = "",
    val itemCount: String = ""
)
