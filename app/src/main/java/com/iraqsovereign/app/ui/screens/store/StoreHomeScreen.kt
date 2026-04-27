package com.iraqsovereign.app.ui.screens.store

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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.iraqsovereign.app.ui.theme.*

@Composable
fun StoreHomeScreen(navController: NavHostController) {
    val moduleColors = LocalModuleColors.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SovereignBlack)
            .verticalScroll(rememberScrollState())
    ) {
        // Module Header
        ModuleHeader(
            title = "المتجر العام",
            subtitle = "SOVEREIGN STORE",
            accent = moduleColors.accent
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Categories
        StoreCategories()

        Spacer(modifier = Modifier.height(20.dp))

        // Merchant Registration CTA
        MerchantRegistrationBanner(navController)

        Spacer(modifier = Modifier.height(20.dp))

        // Products Grid
        Text(
            text = "جميع المنتجات",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(horizontal = 16.dp)
        )
        Spacer(modifier = Modifier.height(12.dp))
        ProductsGrid()

        Spacer(modifier = Modifier.height(100.dp))
    }
}

@Composable
private fun ModuleHeader(title: String, subtitle: String, accent: Color) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                Brush.verticalGradient(
                    colors = listOf(
                        accent.copy(alpha = 0.08f),
                        SovereignBlack
                    )
                )
            )
            .padding(horizontal = 16.dp, vertical = 16.dp)
    ) {
        Column {
            Text(
                text = title,
                fontSize = 24.sp,
                fontWeight = FontWeight.Black,
                color = TextPrimary
            )
            Text(
                text = subtitle,
                fontSize = 10.sp,
                fontWeight = FontWeight.Bold,
                color = accent,
                letterSpacing = 3.sp
            )
        }
    }
}

@Composable
private fun StoreCategories() {
    data class StoreCat(val name: String, val icon: ImageVector, val count: Int)

    val categories = listOf(
        StoreCat("إلكترونيات", Icons.Filled.PhoneAndroid, 3200),
        StoreCat("ملابس", Icons.Filled.Checkroom, 5100),
        StoreCat("أجهزة منزلية", Icons.Filled.Kitchen, 1800),
        StoreCat("ساعات", Icons.Filled.Watch, 900),
        StoreCat("إكسسوارات", Icons.Filled.Diamond, 2400),
        StoreCat("رياضة", Icons.Filled.SportsSoccer, 1100),
        StoreCat("أطفال", Icons.Filled.ChildCare, 1600),
        StoreCat("كتب", Icons.Filled.Book, 700)
    )

    LazyRow(
        contentPadding = PaddingValues(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        items(categories) { cat ->
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                    .clip(RoundedCornerShape(12.dp))
                    .background(SovereignCard)
                    .clickable { }
                    .padding(horizontal = 14.dp, vertical = 10.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .background(NeonBlueSurface),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(cat.icon, contentDescription = cat.name, tint = NeonBlue, modifier = Modifier.size(20.dp))
                }
                Spacer(modifier = Modifier.height(6.dp))
                Text(cat.name, fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
                Text("${cat.count}", fontSize = 9.sp, color = TextTertiary)
            }
        }
    }
}

@Composable
private fun MerchantRegistrationBanner(navController: NavHostController) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
            .clip(RoundedCornerShape(16.dp))
            .background(
                Brush.linearGradient(
                    colors = listOf(PureGold.copy(alpha = 0.12f), NeonBlue.copy(alpha = 0.08f))
                )
            )
            .border(
                1.dp,
                Brush.linearGradient(listOf(PureGold.copy(alpha = 0.4f), NeonBlue.copy(alpha = 0.3f))),
                RoundedCornerShape(16.dp)
            )
            .clickable { }
            .padding(16.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape)
                    .background(PureGold.copy(alpha = 0.2f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Filled.Storefront, contentDescription = null, tint = PureGold, modifier = Modifier.size(24.dp))
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text("انضم كتاجر", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = PureGold)
                Text("باقة أساسية 25,000 د.ع | مميزة 99,000 د.ع", fontSize = 11.sp, color = TextSecondary)
            }
            Icon(Icons.Filled.ArrowForward, contentDescription = null, tint = PureGold, modifier = Modifier.size(20.dp))
        }
    }
}

@Composable
private fun ProductsGrid() {
    data class GridProduct(
        val name: String,
        val price: String,
        val oldPrice: String?,
        val promoted: Boolean
    )

    val products = listOf(
        GridProduct("سماعة بلوتوث سوني", "125,000 د.ع", "165,000 د.ع", true),
        GridProduct("شاحن سريع 65W", "35,000 د.ع", null, false),
        GridProduct("كيبورد ميكانيكي RGB", "95,000 د.ع", "120,000 د.ع", true),
        GridProduct("ماوس لاسلكي", "28,000 د.ع", null, false),
        GridProduct("باور بانك 20000mAh", "45,000 د.ع", "55,000 د.ع", false),
        GridProduct("كاميرا ويب 4K", "185,000 د.ع", null, true),
        GridProduct("سلك USB-C مغناطيسي", "15,000 د.ع", "22,000 د.ع", false),
        GridProduct("حامل لابتوب ألمنيوم", "75,000 د.ع", null, false)
    )

    Column(modifier = Modifier.padding(horizontal = 16.dp)) {
        products.chunked(2).forEach { row ->
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                row.forEach { product ->
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(14.dp))
                            .background(SovereignCard)
                            .border(
                                1.dp,
                                if (product.promoted) NeonBlue.copy(alpha = 0.15f) else SovereignBorder,
                                RoundedCornerShape(14.dp)
                            )
                            .clickable { }
                    ) {
                        Column {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(100.dp)
                                    .background(SovereignElevated),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    Icons.Outlined.Image,
                                    contentDescription = null,
                                    tint = TextTertiary.copy(alpha = 0.5f),
                                    modifier = Modifier.size(32.dp)
                                )
                                if (product.promoted) {
                                    Box(
                                        modifier = Modifier
                                            .align(Alignment.TopStart)
                                            .padding(4.dp)
                                            .clip(RoundedCornerShape(4.dp))
                                            .background(NeonBlue.copy(alpha = 0.15f))
                                            .padding(horizontal = 4.dp, vertical = 1.dp)
                                    ) {
                                        Text("Best", fontSize = 8.sp, color = NeonBlue, fontWeight = FontWeight.Bold)
                                    }
                                }
                                IconButton(
                                    onClick = { },
                                    modifier = Modifier
                                        .align(Alignment.TopEnd)
                                        .size(28.dp)
                                ) {
                                    Icon(
                                        Icons.Outlined.FavoriteBorder,
                                        contentDescription = null,
                                        tint = TextTertiary,
                                        modifier = Modifier.size(16.dp)
                                    )
                                }
                            }
                            Column(modifier = Modifier.padding(8.dp)) {
                                Text(
                                    product.name,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    color = TextPrimary,
                                    maxLines = 2,
                                    overflow = TextOverflow.Ellipsis
                                )
                                Spacer(modifier = Modifier.height(4.dp))
                                Text(
                                    product.price,
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = NeonBlue
                                )
                                if (product.oldPrice != null) {
                                    Text(
                                        product.oldPrice,
                                        fontSize = 10.sp,
                                        color = TextTertiary,
                                        textDecoration = TextDecoration.LineThrough
                                    )
                                }
                            }
                        }
                    }
                }
                if (row.size == 1) {
                    Spacer(modifier = Modifier.weight(1f))
                }
            }
            Spacer(modifier = Modifier.height(10.dp))
        }
    }
}
