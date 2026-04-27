package com.iraqsovereign.app.ui.screens.admin

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
import com.iraqsovereign.app.ui.theme.*

@Composable
fun AdminDashboardScreen(navController: NavHostController) {
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf("نظرة عامة", "المستخدمين", "المنتجات", "التجار", "الترويج", "المعاملات", "التوثيق", "الإعلانات", "الإعدادات")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SovereignBlack)
    ) {
        // Admin Header
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(ErrorRed.copy(alpha = 0.08f), SovereignBlack)
                    )
                )
                .padding(16.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                IconButton(onClick = { navController.popBackStack() }) {
                    Icon(Icons.Filled.ArrowBack, contentDescription = "رجوع", tint = TextPrimary)
                }
                Spacer(modifier = Modifier.width(8.dp))
                Column {
                    Text("لوحة التحكم", fontSize = 22.sp, fontWeight = FontWeight.Black, color = TextPrimary)
                    Text("ADMIN COMMAND CENTER", fontSize = 9.sp, fontWeight = FontWeight.Bold, color = ErrorRed, letterSpacing = 2.sp)
                }
            }
        }

        // Scrollable Tabs
        ScrollableTabRow(
            selectedTabIndex = selectedTab,
            containerColor = SovereignSurface,
            contentColor = NeonBlue,
            edgePadding = 16.dp,
            indicator = { tabPositions ->
                TabRowDefaults.SecondaryIndicator(
                    modifier = Modifier.tabIndicatorOffset(tabPositions[selectedTab]),
                    color = NeonBlue
                )
            },
            divider = { Divider(color = SovereignDivider) }
        ) {
            tabs.forEachIndexed { index, title ->
                Tab(
                    selected = selectedTab == index,
                    onClick = { selectedTab = index },
                    text = {
                        Text(
                            title,
                            fontSize = 13.sp,
                            fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal,
                            color = if (selectedTab == index) NeonBlue else TextTertiary
                        )
                    }
                )
            }
        }

        // Tab Content
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(16.dp)
        ) {
            when (selectedTab) {
                0 -> AdminOverview()
                1 -> AdminUsersTab()
                2 -> AdminProductsTab()
                3 -> AdminMerchantsTab()
                4 -> AdminPromotionsTab()
                5 -> AdminTransactionsTab()
                6 -> AdminVerificationTab()
                7 -> AdminAdsTab()
                8 -> AdminSettingsTab()
            }
            Spacer(modifier = Modifier.height(100.dp))
        }
    }
}

@Composable
private fun AdminOverview() {
    // Stats Grid
    val stats = listOf(
        StatCard("المستخدمين", "24,580", Icons.Filled.People, NeonBlue, "+12%"),
        StatCard("التجار", "1,245", Icons.Filled.Storefront, PureGold, "+8%"),
        StatCard("المنتجات", "12,500", Icons.Filled.Inventory, SuccessGreen, "+15%"),
        StatCard("الإيرادات", "125M د.ع", Icons.Filled.TrendingUp, ErrorRed, "+23%"),
        StatCard("الطلبات", "8,340", Icons.Filled.ShoppingCart, ServicesAccent, "+18%"),
        StatCard("الترويج", "2.5M د.ع", Icons.Filled.Campaign, CarsAccent, "+31%")
    )

    stats.chunked(2).forEach { row ->
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            row.forEach { stat ->
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(14.dp))
                        .background(SovereignCard)
                        .border(1.dp, stat.color.copy(alpha = 0.15f), RoundedCornerShape(14.dp))
                        .padding(14.dp)
                ) {
                    Column {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Icon(stat.icon, contentDescription = null, tint = stat.color, modifier = Modifier.size(20.dp))
                            Text(stat.change, fontSize = 11.sp, color = SuccessGreen, fontWeight = FontWeight.Bold)
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(stat.value, fontSize = 20.sp, fontWeight = FontWeight.Black, color = TextPrimary)
                        Text(stat.label, fontSize = 11.sp, color = TextTertiary)
                    }
                }
            }
        }
        Spacer(modifier = Modifier.height(10.dp))
    }

    Spacer(modifier = Modifier.height(16.dp))

    // Recent Activity
    Text("النشاط الأخير", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
    Spacer(modifier = Modifier.height(10.dp))

    val activities = listOf(
        "طلب انضمام تاجر جديد - محمد علي" to "منذ 5 دقائق",
        "تقرير منتج مخالف - #4521" to "منذ 15 دقيقة",
        "إتمام 15 عملية بيع جديدة" to "منذ ساعة",
        "طلب توثيق من مكتب الأمل" to "منذ 2 ساعة",
        "حملة ترويج جديدة - 500,000 د.ع" to "منذ 3 ساعات"
    )

    activities.forEach { (activity, time) ->
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(10.dp))
                .background(SovereignCard)
                .padding(12.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(activity, fontSize = 13.sp, color = TextPrimary, modifier = Modifier.weight(1f))
                Spacer(modifier = Modifier.width(8.dp))
                Text(time, fontSize = 10.sp, color = TextTertiary)
            }
        }
        Spacer(modifier = Modifier.height(6.dp))
    }
}

private data class StatCard(
    val label: String,
    val value: String,
    val icon: ImageVector,
    val color: Color,
    val change: String
)

@Composable
private fun AdminUsersTab() {
    Text("إدارة المستخدمين", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
    Spacer(modifier = Modifier.height(12.dp))
    AdminPlaceholderContent("24,580 مستخدم مسجل", "بحث، تعليق، حذف، تعديل صلاحيات")
}

@Composable
private fun AdminProductsTab() {
    Text("إدارة المنتجات", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
    Spacer(modifier = Modifier.height(12.dp))
    AdminPlaceholderContent("12,500 منتج نشط", "مراجعة، موافقة، رفض، حذف")
}

@Composable
private fun AdminMerchantsTab() {
    Text("إدارة التجار", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
    Spacer(modifier = Modifier.height(12.dp))

    // Pending Approvals
    Text("طلبات بانتظار الموافقة", fontSize = 14.sp, fontWeight = FontWeight.SemiBold, color = PureGold)
    Spacer(modifier = Modifier.height(8.dp))

    val pendingMerchants = listOf(
        Triple("محمد علي", "باقة مميزة - 99,000 د.ع", PureGold),
        Triple("أحمد حسين", "باقة أساسية - 25,000 د.ع", NeonBlue),
        Triple("مكتب الفردوس", "باقة مميزة - 99,000 د.ع", PureGold)
    )

    pendingMerchants.forEach { (name, tier, color) ->
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(SovereignCard)
                .border(1.dp, color.copy(alpha = 0.2f), RoundedCornerShape(12.dp))
                .padding(14.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(name, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                    Text(tier, fontSize = 12.sp, color = color)
                }
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(SuccessGreen.copy(alpha = 0.15f))
                            .clickable { }
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                    ) {
                        Text("قبول", fontSize = 12.sp, color = SuccessGreen, fontWeight = FontWeight.Bold)
                    }
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(ErrorRed.copy(alpha = 0.15f))
                            .clickable { }
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                    ) {
                        Text("رفض", fontSize = 12.sp, color = ErrorRed, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
        Spacer(modifier = Modifier.height(8.dp))
    }
}

@Composable
private fun AdminPromotionsTab() {
    Text("إدارة الترويج", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
    Spacer(modifier = Modifier.height(12.dp))
    AdminPlaceholderContent("نظام الترويج الشبح", "مراقبة الحملات، ضبط الأسعار، تقارير الإيرادات")
}

@Composable
private fun AdminTransactionsTab() {
    Text("سجل المعاملات", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
    Text("TRANSACTION AUDIT LOG", fontSize = 9.sp, color = ErrorRed, letterSpacing = 2.sp, fontWeight = FontWeight.Bold)
    Spacer(modifier = Modifier.height(12.dp))

    val transactions = listOf(
        TransLogItem("TXN-2024-001", "شراء - آيفون 15", "1,850,000 د.ع", "مكتمل", SuccessGreen),
        TransLogItem("TXN-2024-002", "اشتراك تاجر مميز", "99,000 د.ع", "مكتمل", SuccessGreen),
        TransLogItem("TXN-2024-003", "خصم ترويج ذهبي", "3,000 د.ع", "مكتمل", PureGold),
        TransLogItem("TXN-2024-004", "استرداد - طلب #1245", "125,000 د.ع", "قيد المعالجة", WarningOrange),
        TransLogItem("TXN-2024-005", "عمولة مبيعات", "92,500 د.ع", "مكتمل", NeonBlue)
    )

    transactions.forEach { tx ->
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(10.dp))
                .background(SovereignCard)
                .padding(12.dp)
        ) {
            Column {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(tx.id, fontSize = 10.sp, color = TextTertiary, fontWeight = FontWeight.Medium)
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(4.dp))
                            .background(tx.statusColor.copy(alpha = 0.15f))
                            .padding(horizontal = 6.dp, vertical = 2.dp)
                    ) {
                        Text(tx.status, fontSize = 9.sp, color = tx.statusColor, fontWeight = FontWeight.Bold)
                    }
                }
                Spacer(modifier = Modifier.height(4.dp))
                Text(tx.description, fontSize = 13.sp, color = TextPrimary, fontWeight = FontWeight.Medium)
                Text(tx.amount, fontSize = 14.sp, color = NeonBlue, fontWeight = FontWeight.Bold)
            }
        }
        Spacer(modifier = Modifier.height(6.dp))
    }
}

private data class TransLogItem(
    val id: String,
    val description: String,
    val amount: String,
    val status: String,
    val statusColor: Color
)

@Composable
private fun AdminVerificationTab() {
    Text("نظام التوثيق", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
    Text("BLUE BADGE VERIFICATION", fontSize = 9.sp, color = VerifiedBlue, letterSpacing = 2.sp, fontWeight = FontWeight.Bold)
    Spacer(modifier = Modifier.height(12.dp))

    val requests = listOf(
        VerifyRequest("مكتب الأمل العقاري", "مكتب رسمي", "وثائق مرفقة: 3"),
        VerifyRequest("أحمد الكهربائي", "مهني موثق", "شهادة مهنية مرفقة"),
        VerifyRequest("ورشة النجم", "ميكانيكي معتمد", "رخصة عمل مرفقة")
    )

    requests.forEach { req ->
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(SovereignCard)
                .border(1.dp, VerifiedBlue.copy(alpha = 0.2f), RoundedCornerShape(12.dp))
                .padding(14.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .clip(CircleShape)
                        .background(VerifiedBlue.copy(alpha = 0.15f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Filled.Verified, contentDescription = null, tint = VerifiedBlue, modifier = Modifier.size(22.dp))
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(req.name, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                    Text(req.type, fontSize = 12.sp, color = VerifiedBlue)
                    Text(req.docs, fontSize = 11.sp, color = TextTertiary)
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(SuccessGreen.copy(alpha = 0.15f))
                            .clickable { }
                            .padding(horizontal = 10.dp, vertical = 5.dp)
                    ) {
                        Text("توثيق", fontSize = 11.sp, color = SuccessGreen, fontWeight = FontWeight.Bold)
                    }
                    Spacer(modifier = Modifier.height(4.dp))
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(ErrorRed.copy(alpha = 0.15f))
                            .clickable { }
                            .padding(horizontal = 10.dp, vertical = 5.dp)
                    ) {
                        Text("رفض", fontSize = 11.sp, color = ErrorRed, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
        Spacer(modifier = Modifier.height(8.dp))
    }
}

private data class VerifyRequest(val name: String, val type: String, val docs: String)

@Composable
private fun AdminAdsTab() {
    Text("إدارة الإعلانات", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
    Spacer(modifier = Modifier.height(12.dp))
    AdminPlaceholderContent("إعلانات بانر، إعلانات مبوبة", "إنشاء، تعديل، جدولة، تحليلات")
}

@Composable
private fun AdminSettingsTab() {
    Text("إعدادات النظام", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
    Spacer(modifier = Modifier.height(12.dp))

    val settings = listOf(
        "عمولة المبيعات" to "5%",
        "حد السحب اليومي" to "5,000,000 د.ع",
        "رسوم الاشتراك الأساسي" to "25,000 د.ع",
        "رسوم الاشتراك المميز" to "99,000 د.ع",
        "تكلفة الترويج البرونزي" to "500 د.ع/يوم",
        "تكلفة الترويج الذهبي" to "3,000 د.ع/يوم",
        "تكلفة الترويج البلاتيني" to "7,000 د.ع/يوم"
    )

    settings.forEach { (key, value) ->
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(10.dp))
                .background(SovereignCard)
                .clickable { }
                .padding(14.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(key, fontSize = 13.sp, color = TextPrimary)
                Text(value, fontSize = 13.sp, color = NeonBlue, fontWeight = FontWeight.Bold)
            }
        }
        Spacer(modifier = Modifier.height(6.dp))
    }
}

@Composable
private fun AdminPlaceholderContent(title: String, description: String) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(SovereignCard)
            .border(1.dp, SovereignBorder, RoundedCornerShape(14.dp))
            .padding(20.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Icon(Icons.Filled.Construction, contentDescription = null, tint = PureGold, modifier = Modifier.size(40.dp))
            Spacer(modifier = Modifier.height(12.dp))
            Text(title, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
            Spacer(modifier = Modifier.height(4.dp))
            Text(description, fontSize = 12.sp, color = TextSecondary)
        }
    }
}
