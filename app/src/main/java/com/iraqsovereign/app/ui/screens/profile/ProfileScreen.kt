package com.iraqsovereign.app.ui.screens.profile

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
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
import com.iraqsovereign.app.navigation.NavRoute
import com.iraqsovereign.app.ui.theme.*

@Composable
fun ProfileScreen(navController: NavHostController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SovereignBlack)
            .verticalScroll(rememberScrollState())
    ) {
        // Profile Header
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(NeonBlue.copy(alpha = 0.08f), SovereignBlack)
                    )
                )
                .padding(24.dp)
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
                Box(
                    modifier = Modifier
                        .size(80.dp)
                        .clip(CircleShape)
                        .background(
                            Brush.linearGradient(listOf(NeonBlue, PureGold))
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Filled.Person, contentDescription = null, tint = SovereignBlack, modifier = Modifier.size(40.dp))
                }
                Spacer(modifier = Modifier.height(12.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text("عازف", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                    Spacer(modifier = Modifier.width(6.dp))
                    Icon(Icons.Filled.Verified, contentDescription = null, tint = VerifiedBlue, modifier = Modifier.size(18.dp))
                }
                Text("+964 750 674 7685", fontSize = 13.sp, color = TextSecondary)
                Spacer(modifier = Modifier.height(12.dp))

                // Wallet Quick View
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(14.dp))
                        .background(SovereignCard)
                        .border(1.dp, PureGold.copy(alpha = 0.2f), RoundedCornerShape(14.dp))
                        .padding(horizontal = 20.dp, vertical = 10.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Filled.AccountBalanceWallet, contentDescription = null, tint = PureGold, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("500,000 د.ع", fontSize = 15.sp, fontWeight = FontWeight.Bold, color = PureGold)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Menu Sections
        ProfileSection(
            title = "حسابي",
            items = listOf(
                MenuItem("طلباتي", Icons.Outlined.ShoppingBag, NeonBlue) { navController.navigate(NavRoute.Orders.route) },
                MenuItem("المفضلة", Icons.Outlined.FavoriteBorder, ErrorRed) { navController.navigate(NavRoute.Favorites.route) },
                MenuItem("المحفظة", Icons.Outlined.AccountBalanceWallet, PureGold) { navController.navigate(NavRoute.Wallet.route) },
                MenuItem("العناوين", Icons.Outlined.LocationOn, SuccessGreen) { }
            )
        )

        Spacer(modifier = Modifier.height(12.dp))

        ProfileSection(
            title = "التاجر",
            items = listOf(
                MenuItem("متجري", Icons.Outlined.Storefront, NeonBlue) { },
                MenuItem("إعلاناتي", Icons.Outlined.Campaign, ServicesAccent) { },
                MenuItem("نظام الترويج", Icons.Outlined.TrendingUp, PureGold) { navController.navigate(NavRoute.PromotionDashboard.route) },
                MenuItem("انضم كتاجر", Icons.Outlined.AddBusiness, SuccessGreen) { navController.navigate(NavRoute.StoreMerchantJoin.route) }
            )
        )

        Spacer(modifier = Modifier.height(12.dp))

        ProfileSection(
            title = "الإدارة",
            items = listOf(
                MenuItem("لوحة التحكم", Icons.Outlined.AdminPanelSettings, ErrorRed) { navController.navigate(NavRoute.AdminDashboard.route) },
                MenuItem("التوثيق والتحقق", Icons.Outlined.VerifiedUser, VerifiedBlue) { navController.navigate(NavRoute.AdminVerification.route) }
            )
        )

        Spacer(modifier = Modifier.height(12.dp))

        ProfileSection(
            title = "الإعدادات",
            items = listOf(
                MenuItem("الملف الشخصي", Icons.Outlined.Person, TextSecondary) { },
                MenuItem("الإشعارات", Icons.Outlined.Notifications, NeonBlue) { },
                MenuItem("اللغة", Icons.Outlined.Language, PureGold) { },
                MenuItem("الدعم والمساعدة", Icons.Outlined.HelpOutline, ServicesAccent) { },
                MenuItem("تسجيل الخروج", Icons.Outlined.Logout, ErrorRed) { }
            )
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Version
        Text(
            text = "المنصة السيادية v1.0.0",
            fontSize = 11.sp,
            color = TextTertiary,
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 100.dp),
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )
    }
}

private data class MenuItem(
    val title: String,
    val icon: ImageVector,
    val tint: Color,
    val onClick: () -> Unit
)

@Composable
private fun ProfileSection(title: String, items: List<MenuItem>) {
    Column(modifier = Modifier.padding(horizontal = 16.dp)) {
        Text(
            text = title,
            fontSize = 13.sp,
            fontWeight = FontWeight.Bold,
            color = TextTertiary,
            modifier = Modifier.padding(bottom = 8.dp, start = 4.dp)
        )
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(SovereignCard)
        ) {
            Column {
                items.forEachIndexed { index, item ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { item.onClick() }
                            .padding(horizontal = 16.dp, vertical = 14.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(item.tint.copy(alpha = 0.12f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(item.icon, contentDescription = item.title, tint = item.tint, modifier = Modifier.size(18.dp))
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Text(
                            item.title,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Medium,
                            color = TextPrimary,
                            modifier = Modifier.weight(1f)
                        )
                        Icon(Icons.Filled.ChevronRight, contentDescription = null, tint = TextTertiary, modifier = Modifier.size(18.dp))
                    }
                    if (index < items.size - 1) {
                        Divider(
                            color = SovereignDivider,
                            modifier = Modifier.padding(horizontal = 64.dp)
                        )
                    }
                }
            }
        }
    }
}
