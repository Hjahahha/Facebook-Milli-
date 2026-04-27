package com.iraqsovereign.app.ui.screens.chat

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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.iraqsovereign.app.ui.theme.*

/**
 * Iron-Clad Messaging Protocol
 * Socket.io powered chat with auto-replies for professionals.
 */
@Composable
fun ChatListScreen(navController: NavHostController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SovereignBlack)
    ) {
        // Header
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(SovereignSurface, SovereignBlack)
                    )
                )
                .padding(horizontal = 16.dp, vertical = 14.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text("المحادثات", fontSize = 22.sp, fontWeight = FontWeight.Black, color = TextPrimary)
                    Text("IRON-CLAD MESSAGING", fontSize = 9.sp, fontWeight = FontWeight.Bold, color = NeonBlue, letterSpacing = 2.sp)
                }
                Row {
                    IconButton(onClick = { }) {
                        Icon(Icons.Outlined.Search, contentDescription = "بحث", tint = TextSecondary)
                    }
                    IconButton(onClick = { }) {
                        Icon(Icons.Outlined.FilterList, contentDescription = "فلتر", tint = TextSecondary)
                    }
                }
            }
        }

        // Connection Status
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(SuccessGreen.copy(alpha = 0.08f))
                .padding(horizontal = 16.dp, vertical = 6.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(8.dp)
                        .clip(CircleShape)
                        .background(SuccessGreen)
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text("متصل • Socket.io", fontSize = 11.sp, color = SuccessGreen, fontWeight = FontWeight.Medium)
            }
        }

        // Chat List
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
        ) {
            val conversations = listOf(
                ChatConv("أحمد الكهربائي", "سأكون عندك الساعة 4 مساءً إن شاء الله", "منذ 5 د", 2, true, true, NeonBlue),
                ChatConv("مكتب الأمل العقاري", "الشقة متاحة للمعاينة غداً", "منذ 15 د", 0, true, false, RealEstateAccent),
                ChatConv("متجر التقنية", "تم شحن طلبك #1234", "منذ ساعة", 1, false, false, NeonBlue),
                ChatConv("ورشة النجم", "[رد آلي] شكراً لتواصلك! سأرد خلال 30 دقيقة", "منذ 2 ساعة", 0, true, true, CarsAccent),
                ChatConv("سباكة الرافدين", "تم إصلاح المشكلة بنجاح", "أمس", 0, true, false, ServicesAccent),
                ChatConv("معرض الفردوس للسيارات", "السعر النهائي 48,000,000 د.ع", "أمس", 3, false, false, CarsAccent),
                ChatConv("خالد المحترف", "[رد آلي] أهلاً! أنا متاح يومي السبت والأحد", "منذ يومين", 0, false, true, ServicesAccent)
            )

            conversations.forEach { conv ->
                ChatConversationItem(conv)
                Divider(
                    color = SovereignDivider,
                    modifier = Modifier.padding(horizontal = 16.dp)
                )
            }

            // Auto-Reply Settings
            Spacer(modifier = Modifier.height(20.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(SovereignCard)
                    .border(1.dp, NeonBlue.copy(alpha = 0.2f), RoundedCornerShape(16.dp))
                    .clickable { }
                    .padding(14.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(40.dp)
                            .clip(CircleShape)
                            .background(NeonBlue.copy(alpha = 0.15f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Filled.SmartToy, contentDescription = null, tint = NeonBlue, modifier = Modifier.size(22.dp))
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text("إعدادات الرد الآلي", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                        Text("فعّل ردود تلقائية لزبائنك", fontSize = 11.sp, color = TextSecondary)
                    }
                    Icon(Icons.Filled.ChevronRight, contentDescription = null, tint = NeonBlue, modifier = Modifier.size(20.dp))
                }
            }

            Spacer(modifier = Modifier.height(100.dp))
        }
    }
}

private data class ChatConv(
    val name: String,
    val lastMessage: String,
    val time: String,
    val unread: Int,
    val verified: Boolean,
    val hasAutoReply: Boolean,
    val moduleColor: Color
)

@Composable
private fun ChatConversationItem(conv: ChatConv) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { }
            .padding(horizontal = 16.dp, vertical = 12.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            // Avatar
            Box(
                modifier = Modifier
                    .size(50.dp)
                    .clip(CircleShape)
                    .background(conv.moduleColor.copy(alpha = 0.15f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    Icons.Filled.Person,
                    contentDescription = null,
                    tint = conv.moduleColor,
                    modifier = Modifier.size(26.dp)
                )
                if (conv.verified) {
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomEnd)
                            .size(18.dp)
                            .clip(CircleShape)
                            .background(SovereignBlack)
                            .padding(2.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Filled.Verified,
                            contentDescription = null,
                            tint = VerifiedBlue,
                            modifier = Modifier.size(14.dp)
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            conv.name,
                            fontSize = 14.sp,
                            fontWeight = if (conv.unread > 0) FontWeight.Bold else FontWeight.Medium,
                            color = TextPrimary,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis,
                            modifier = Modifier.widthIn(max = 180.dp)
                        )
                        if (conv.hasAutoReply) {
                            Spacer(modifier = Modifier.width(4.dp))
                            Icon(
                                Icons.Filled.SmartToy,
                                contentDescription = "رد آلي",
                                tint = NeonBlue,
                                modifier = Modifier.size(14.dp)
                            )
                        }
                    }
                    Text(conv.time, fontSize = 11.sp, color = if (conv.unread > 0) NeonBlue else TextTertiary)
                }
                Spacer(modifier = Modifier.height(4.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        conv.lastMessage,
                        fontSize = 12.sp,
                        color = if (conv.unread > 0) TextSecondary else TextTertiary,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                        modifier = Modifier.weight(1f)
                    )
                    if (conv.unread > 0) {
                        Spacer(modifier = Modifier.width(8.dp))
                        Box(
                            modifier = Modifier
                                .size(22.dp)
                                .clip(CircleShape)
                                .background(NeonBlue),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("${conv.unread}", fontSize = 10.sp, color = SovereignBlack, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}
