package com.iraqsovereign.app.ui.screens.promotion

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

/**
 * Ghost Promotion System Dashboard
 * Products appear as "Best Value" organically — never as visible ads.
 * Engagement-driven visibility boost with real metrics.
 */
@Composable
fun PromotionDashboardScreen(navController: NavHostController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SovereignBlack)
            .verticalScroll(rememberScrollState())
    ) {
        // Header
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(PureGold.copy(alpha = 0.08f), SovereignBlack)
                    )
                )
                .padding(16.dp)
        ) {
            Column {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = "رجوع", tint = TextPrimary)
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Column {
                        Text("نظام الترويج", fontSize = 22.sp, fontWeight = FontWeight.Black, color = TextPrimary)
                        Text("GHOST PROMOTION", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = PureGold, letterSpacing = 3.sp)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Balance Card
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp)
                .clip(RoundedCornerShape(20.dp))
                .background(
                    Brush.linearGradient(
                        colors = listOf(PureGold.copy(alpha = 0.15f), NeonBlue.copy(alpha = 0.1f))
                    )
                )
                .border(
                    1.dp,
                    Brush.linearGradient(listOf(PureGold.copy(alpha = 0.4f), NeonBlue.copy(alpha = 0.3f))),
                    RoundedCornerShape(20.dp)
                )
                .padding(20.dp)
        ) {
            Column {
                Text("رصيد الترويج", fontSize = 13.sp, color = TextSecondary)
                Spacer(modifier = Modifier.height(4.dp))
                Text("2,500,000 د.ع", fontSize = 28.sp, fontWeight = FontWeight.Black, color = PureGold)
                Spacer(modifier = Modifier.height(12.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                    StatItem("المصروف", "750,000 د.ع", ErrorRed)
                    StatItem("المشاهدات", "12,450", NeonBlue)
                    StatItem("التحويلات", "89", SuccessGreen)
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Active Campaigns
        Text(
            text = "الحملات النشطة",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(horizontal = 16.dp)
        )
        Spacer(modifier = Modifier.height(12.dp))

        val campaigns = listOf(
            CampaignItem("آيفون 15 برو ماكس", "ذهبي", PureGold, 4520L, 312L, 89L, 23L, "150,000 د.ع"),
            CampaignItem("سامسونج S24", "فضي", CarsChrome, 2100L, 156L, 45L, 12L, "85,000 د.ع"),
            CampaignItem("شقة في المنصور", "بلاتيني", NeonBlue, 8900L, 670L, 234L, 5L, "350,000 د.ع")
        )

        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            campaigns.forEach { campaign ->
                CampaignCard(campaign)
                Spacer(modifier = Modifier.height(12.dp))
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Promotion Tiers
        Text(
            text = "مستويات الترويج",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(horizontal = 16.dp)
        )
        Spacer(modifier = Modifier.height(12.dp))

        val tiers = listOf(
            TierInfo("برونزي", "1.5x", "500 د.ع/يوم", Color(0xFFCD7F32)),
            TierInfo("فضي", "2.5x", "1,500 د.ع/يوم", CarsChrome),
            TierInfo("ذهبي", "4x", "3,000 د.ع/يوم", PureGold),
            TierInfo("بلاتيني", "7x", "7,000 د.ع/يوم", NeonBlue)
        )

        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            tiers.forEach { tier ->
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(SovereignCard)
                        .border(1.dp, tier.color.copy(alpha = 0.3f), RoundedCornerShape(12.dp))
                        .padding(14.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(CircleShape)
                                    .background(tier.color.copy(alpha = 0.15f)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Filled.TrendingUp, contentDescription = null, tint = tier.color, modifier = Modifier.size(18.dp))
                            }
                            Spacer(modifier = Modifier.width(10.dp))
                            Column {
                                Text(tier.name, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = tier.color)
                                Text("مضاعف الظهور: ${tier.multiplier}", fontSize = 11.sp, color = TextTertiary)
                            }
                        }
                        Text(tier.price, fontSize = 13.sp, fontWeight = FontWeight.Bold, color = TextSecondary)
                    }
                }
                Spacer(modifier = Modifier.height(8.dp))
            }
        }

        // Transaction Log Preview
        Spacer(modifier = Modifier.height(20.dp))
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("سجل المعاملات", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
            TextButton(onClick = { }) {
                Text("عرض الكل", color = NeonBlue, fontSize = 13.sp)
            }
        }
        Spacer(modifier = Modifier.height(8.dp))

        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            TransactionLogItem("خصم ترويج - آيفون 15", "-10,000 د.ع", "منذ 2 ساعة", ErrorRed)
            TransactionLogItem("إيداع رصيد ترويج", "+500,000 د.ع", "منذ يوم", SuccessGreen)
            TransactionLogItem("خصم ترويج - شقة المنصور", "-25,000 د.ع", "منذ يومين", ErrorRed)
        }

        Spacer(modifier = Modifier.height(100.dp))
    }
}

@Composable
private fun StatItem(label: String, value: String, color: Color) {
    Column {
        Text(label, fontSize = 10.sp, color = TextTertiary)
        Text(value, fontSize = 13.sp, fontWeight = FontWeight.Bold, color = color)
    }
}

private data class CampaignItem(
    val product: String,
    val tier: String,
    val tierColor: Color,
    val impressions: Long,
    val clicks: Long,
    val engagements: Long,
    val conversions: Long,
    val spent: String
)

@Composable
private fun CampaignCard(campaign: CampaignItem) {
    val ctr = if (campaign.impressions > 0) "%.1f%%".format(campaign.clicks.toDouble() / campaign.impressions * 100) else "0%"

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(SovereignCard)
            .border(1.dp, campaign.tierColor.copy(alpha = 0.2f), RoundedCornerShape(16.dp))
            .padding(14.dp)
    ) {
        Column {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(campaign.product, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(campaign.tierColor.copy(alpha = 0.15f))
                        .padding(horizontal = 8.dp, vertical = 3.dp)
                ) {
                    Text(campaign.tier, fontSize = 10.sp, color = campaign.tierColor, fontWeight = FontWeight.Bold)
                }
            }
            Spacer(modifier = Modifier.height(10.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                MetricItem("مشاهدات", "${campaign.impressions}", NeonBlue)
                MetricItem("نقرات", "${campaign.clicks}", PureGold)
                MetricItem("تفاعل", "${campaign.engagements}", ServicesAccent)
                MetricItem("CTR", ctr, SuccessGreen)
            }
            Spacer(modifier = Modifier.height(8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("المصروف: ${campaign.spent}", fontSize = 11.sp, color = TextTertiary)
                Text("${campaign.conversions} تحويل", fontSize = 11.sp, color = SuccessGreen, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun MetricItem(label: String, value: String, color: Color) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(value, fontSize = 15.sp, fontWeight = FontWeight.Black, color = color)
        Text(label, fontSize = 9.sp, color = TextTertiary)
    }
}

private data class TierInfo(val name: String, val multiplier: String, val price: String, val color: Color)

@Composable
private fun TransactionLogItem(description: String, amount: String, time: String, color: Color) {
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
            Column {
                Text(description, fontSize = 13.sp, color = TextPrimary, fontWeight = FontWeight.Medium)
                Text(time, fontSize = 10.sp, color = TextTertiary)
            }
            Text(amount, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = color)
        }
    }
    Spacer(modifier = Modifier.height(6.dp))
}
