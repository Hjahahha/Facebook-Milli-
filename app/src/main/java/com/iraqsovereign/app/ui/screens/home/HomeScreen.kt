package com.iraqsovereign.app.ui.screens.home

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.iraqsovereign.app.navigation.NavRoute
import com.iraqsovereign.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(navController: NavHostController) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SovereignBlack)
            .verticalScroll(scrollState)
    ) {
        // Top Bar with Glassmorphism
        SovereignTopBar()

        Spacer(modifier = Modifier.height(8.dp))

        // Search Bar
        SovereignSearchBar()

        Spacer(modifier = Modifier.height(16.dp))

        // Hero Banner
        HeroBanner()

        Spacer(modifier = Modifier.height(20.dp))

        // Module Quick Access
        ModuleQuickAccess(navController)

        Spacer(modifier = Modifier.height(20.dp))

        // Trending / Ghost-Promoted Products
        SectionHeader(title = "الأكثر رواجاً", subtitle = "Best Value")
        Spacer(modifier = Modifier.height(8.dp))
        TrendingProducts(navController)

        Spacer(modifier = Modifier.height(20.dp))

        // Flash Deals
        SectionHeader(title = "عروض حصرية", subtitle = "Flash Deals")
        Spacer(modifier = Modifier.height(8.dp))
        FlashDeals()

        Spacer(modifier = Modifier.height(20.dp))

        // Verified Professionals
        SectionHeader(title = "مهنيون موثقون", subtitle = "Verified Pros")
        Spacer(modifier = Modifier.height(8.dp))
        VerifiedProfessionals()

        Spacer(modifier = Modifier.height(100.dp))
    }
}

@Composable
private fun SovereignTopBar() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                Brush.verticalGradient(
                    colors = listOf(SovereignSurface, SovereignBlack)
                )
            )
            .padding(horizontal = 16.dp, vertical = 12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Logo
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(
                            Brush.linearGradient(
                                colors = listOf(NeonBlue, PureGold)
                            )
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        Icons.Filled.Store,
                        contentDescription = null,
                        tint = SovereignBlack,
                        modifier = Modifier.size(20.dp)
                    )
                }
                Spacer(modifier = Modifier.width(8.dp))
                Column {
                    Text(
                        text = "المنصة السيادية",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Black,
                        color = TextPrimary
                    )
                    Text(
                        text = "SOVEREIGN",
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Bold,
                        color = NeonBlue,
                        letterSpacing = 3.sp
                    )
                }
            }

            // Actions
            Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                IconButton(onClick = { }) {
                    Icon(
                        Icons.Outlined.Notifications,
                        contentDescription = "الإشعارات",
                        tint = TextSecondary
                    )
                }
                IconButton(onClick = { }) {
                    Box {
                        Icon(
                            Icons.Outlined.ShoppingCart,
                            contentDescription = "السلة",
                            tint = TextSecondary
                        )
                        Box(
                            modifier = Modifier
                                .size(16.dp)
                                .clip(CircleShape)
                                .background(NeonBlue)
                                .align(Alignment.TopEnd),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("3", fontSize = 9.sp, color = SovereignBlack, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun SovereignSearchBar() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
            .clip(RoundedCornerShape(16.dp))
            .background(SovereignCard)
            .border(1.dp, SovereignBorder, RoundedCornerShape(16.dp))
            .padding(horizontal = 16.dp, vertical = 14.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            Icon(
                Icons.Outlined.Search,
                contentDescription = null,
                tint = TextTertiary,
                modifier = Modifier.size(20.dp)
            )
            Spacer(modifier = Modifier.width(10.dp))
            Text(
                text = "ابحث عن منتجات، سيارات، عقارات، خدمات...",
                color = TextTertiary,
                fontSize = 13.sp
            )
        }
    }
}

@Composable
private fun HeroBanner() {
    val infiniteTransition = rememberInfiniteTransition(label = "banner")
    val glowAlpha by infiniteTransition.animateFloat(
        initialValue = 0.3f,
        targetValue = 0.7f,
        animationSpec = infiniteRepeatable(
            animation = tween(2000, easing = EaseInOut),
            repeatMode = RepeatMode.Reverse
        ),
        label = "glow"
    )

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
            .clip(RoundedCornerShape(20.dp))
            .height(160.dp)
            .background(
                Brush.linearGradient(
                    colors = listOf(
                        NeonBlue.copy(alpha = 0.2f),
                        PureGold.copy(alpha = 0.15f),
                        NeonBlue.copy(alpha = glowAlpha * 0.3f)
                    )
                )
            )
            .border(
                1.dp,
                Brush.linearGradient(
                    colors = listOf(NeonBlue.copy(alpha = 0.4f), PureGold.copy(alpha = 0.3f))
                ),
                RoundedCornerShape(20.dp)
            ),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "🏆 عروض اليوم الذهبية",
                fontSize = 22.sp,
                fontWeight = FontWeight.Black,
                color = PureGold
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "خصومات تصل إلى 70%",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = TextPrimary
            )
            Spacer(modifier = Modifier.height(12.dp))
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(12.dp))
                    .background(
                        Brush.linearGradient(
                            colors = listOf(NeonBlue, NeonBlueBright)
                        )
                    )
                    .padding(horizontal = 24.dp, vertical = 10.dp)
            ) {
                Text(
                    text = "تسوق الآن",
                    color = SovereignBlack,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp
                )
            }
        }
    }
}

@Composable
private fun ModuleQuickAccess(navController: NavHostController) {
    data class ModuleItem(
        val name: String,
        val icon: ImageVector,
        val accent: Color,
        val glow: Color,
        val route: String
    )

    val modules = listOf(
        ModuleItem("المتجر", Icons.Filled.ShoppingBag, NeonBlue, NeonBlueGlow, NavRoute.StoreHome.route),
        ModuleItem("السيارات", Icons.Filled.DirectionsCar, CarsAccent, CarsGlow, NavRoute.CarsHome.route),
        ModuleItem("العقارات", Icons.Filled.Home, RealEstateAccent, RealEstateGlow, NavRoute.RealEstateHome.route),
        ModuleItem("الخدمات", Icons.Filled.Build, ServicesAccent, ServicesGlow, NavRoute.ServicesHome.route)
    )

    LazyRow(
        contentPadding = PaddingValues(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(modules) { module ->
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                    .clip(RoundedCornerShape(16.dp))
                    .background(SovereignCard)
                    .border(1.dp, SovereignBorder, RoundedCornerShape(16.dp))
                    .clickable { navController.navigate(module.route) }
                    .padding(horizontal = 20.dp, vertical = 16.dp)
                    .width(72.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .clip(CircleShape)
                        .background(module.accent.copy(alpha = 0.15f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        module.icon,
                        contentDescription = module.name,
                        tint = module.accent,
                        modifier = Modifier.size(24.dp)
                    )
                }
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = module.name,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = TextPrimary,
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}

@Composable
private fun SectionHeader(title: String, subtitle: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column {
            Text(
                text = title,
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                color = TextPrimary
            )
            Text(
                text = subtitle,
                fontSize = 11.sp,
                fontWeight = FontWeight.Medium,
                color = NeonBlue,
                letterSpacing = 1.sp
            )
        }
        TextButton(onClick = { }) {
            Text("عرض الكل", color = NeonBlue, fontSize = 13.sp)
        }
    }
}

@Composable
private fun TrendingProducts(navController: NavHostController) {
    data class TrendingItem(
        val name: String,
        val price: String,
        val originalPrice: String?,
        val tag: String?,
        val tagColor: Color
    )

    val products = listOf(
        TrendingItem("آيفون 15 برو ماكس", "1,850,000 د.ع", "2,100,000 د.ع", "Best Value", NeonBlue),
        TrendingItem("سامسونج S24 الترا", "1,450,000 د.ع", null, null, Color.Transparent),
        TrendingItem("ماك بوك برو M3", "2,500,000 د.ع", "2,800,000 د.ع", "Top Pick", PureGold),
        TrendingItem("آيباد اير 2024", "750,000 د.ع", null, "Hot", ErrorRed),
        TrendingItem("سماعة ايربودز برو 2", "350,000 د.ع", "420,000 د.ع", null, Color.Transparent)
    )

    LazyRow(
        contentPadding = PaddingValues(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(products) { product ->
            Box(
                modifier = Modifier
                    .width(160.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(SovereignCard)
                    .border(1.dp, SovereignBorder, RoundedCornerShape(16.dp))
                    .clickable { }
            ) {
                Column {
                    // Image placeholder with glassmorphism
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(120.dp)
                            .background(SovereignElevated),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Outlined.Image,
                            contentDescription = null,
                            tint = TextTertiary,
                            modifier = Modifier.size(40.dp)
                        )

                        // Ghost promotion tag (appears organic, not as ads)
                        if (product.tag != null) {
                            Box(
                                modifier = Modifier
                                    .align(Alignment.TopStart)
                                    .padding(6.dp)
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(product.tagColor.copy(alpha = 0.2f))
                                    .border(0.5.dp, product.tagColor.copy(alpha = 0.5f), RoundedCornerShape(6.dp))
                                    .padding(horizontal = 6.dp, vertical = 2.dp)
                            ) {
                                Text(
                                    text = product.tag,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = product.tagColor
                                )
                            }
                        }

                        // Heart
                        IconButton(
                            onClick = { },
                            modifier = Modifier
                                .align(Alignment.TopEnd)
                                .size(32.dp)
                        ) {
                            Icon(
                                Icons.Outlined.FavoriteBorder,
                                contentDescription = null,
                                tint = TextTertiary,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }

                    Column(modifier = Modifier.padding(10.dp)) {
                        Text(
                            text = product.name,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = TextPrimary,
                            maxLines = 2,
                            overflow = TextOverflow.Ellipsis
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = product.price,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = NeonBlue
                        )
                        if (product.originalPrice != null) {
                            Text(
                                text = product.originalPrice,
                                fontSize = 11.sp,
                                color = TextTertiary,
                                style = LocalTextStyle.current.copy(
                                    textDecoration = androidx.compose.ui.text.style.TextDecoration.LineThrough
                                )
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun FlashDeals() {
    LazyRow(
        contentPadding = PaddingValues(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(4) { i ->
            Box(
                modifier = Modifier
                    .width(200.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(
                        Brush.linearGradient(
                            colors = listOf(
                                PureGold.copy(alpha = 0.1f),
                                SovereignCard
                            )
                        )
                    )
                    .border(
                        1.dp,
                        PureGold.copy(alpha = 0.3f),
                        RoundedCornerShape(16.dp)
                    )
                    .padding(12.dp)
            ) {
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("⚡ فلاش", fontSize = 12.sp, color = PureGold, fontWeight = FontWeight.Bold)
                        Text(
                            text = "-${(30 + i * 10)}%",
                            fontSize = 12.sp,
                            color = ErrorRed,
                            fontWeight = FontWeight.Black
                        )
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(80.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(SovereignElevated),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Outlined.LocalOffer, contentDescription = null, tint = PureGold)
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("عرض خاص #${i + 1}", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                    Text("ينتهي خلال 2 ساعة", fontSize = 11.sp, color = PureGoldDim)
                }
            }
        }
    }
}

@Composable
private fun VerifiedProfessionals() {
    val professionals = listOf(
        Triple("أحمد الكهربائي", "كهربائي موثق", ServicesAccent),
        Triple("مكتب الأمل العقاري", "مكتب رسمي", RealEstateAccent),
        Triple("ورشة النجم", "ميكانيكي معتمد", CarsAccent),
        Triple("سباكة الرافدين", "سباك محترف", NeonBlue)
    )

    LazyRow(
        contentPadding = PaddingValues(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(professionals) { (name, title, color) ->
            Box(
                modifier = Modifier
                    .width(150.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(SovereignCard)
                    .border(1.dp, color.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
                    .padding(12.dp)
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .clip(CircleShape)
                            .background(color.copy(alpha = 0.15f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Filled.Person,
                            contentDescription = null,
                            tint = color,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = name,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = TextPrimary,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis,
                            modifier = Modifier.weight(1f, fill = false)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Icon(
                            Icons.Filled.Verified,
                            contentDescription = "موثق",
                            tint = VerifiedBlue,
                            modifier = Modifier.size(14.dp)
                        )
                    }
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = title,
                        fontSize = 10.sp,
                        color = color,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }
    }
}
