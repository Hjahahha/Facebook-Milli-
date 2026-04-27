package com.iraqsovereign.app.ui.screens.auth

import androidx.compose.animation.core.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
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
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.iraqsovereign.app.navigation.NavRoute
import com.iraqsovereign.app.ui.theme.*

@Composable
fun LoginScreen(navController: NavHostController) {
    var phone by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }

    val infiniteTransition = rememberInfiniteTransition(label = "login_glow")
    val glowAlpha by infiniteTransition.animateFloat(
        initialValue = 0.1f,
        targetValue = 0.3f,
        animationSpec = infiniteRepeatable(
            animation = tween(3000, easing = EaseInOut),
            repeatMode = RepeatMode.Reverse
        ),
        label = "glow"
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(SovereignBlack)
    ) {
        // Background glow effects
        Box(
            modifier = Modifier
                .size(300.dp)
                .offset(x = (-80).dp, y = (-50).dp)
                .background(
                    Brush.radialGradient(
                        colors = listOf(
                            NeonBlue.copy(alpha = glowAlpha),
                            SovereignBlack.copy(alpha = 0f)
                        )
                    )
                )
        )
        Box(
            modifier = Modifier
                .size(250.dp)
                .align(Alignment.BottomEnd)
                .offset(x = 60.dp, y = 80.dp)
                .background(
                    Brush.radialGradient(
                        colors = listOf(
                            PureGold.copy(alpha = glowAlpha * 0.5f),
                            SovereignBlack.copy(alpha = 0f)
                        )
                    )
                )
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Spacer(modifier = Modifier.height(60.dp))

            // Logo
            Box(
                modifier = Modifier
                    .size(80.dp)
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
                    modifier = Modifier.size(40.dp)
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "المنصة السيادية",
                fontSize = 26.sp,
                fontWeight = FontWeight.Black,
                color = TextPrimary
            )
            Text(
                text = "SOVEREIGN PLATFORM",
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                color = NeonBlue,
                letterSpacing = 4.sp
            )

            Spacer(modifier = Modifier.height(40.dp))

            // Phone Input
            OutlinedTextField(
                value = phone,
                onValueChange = { phone = it },
                label = { Text("رقم الهاتف") },
                placeholder = { Text("07XXXXXXXXX") },
                leadingIcon = {
                    Icon(Icons.Outlined.Phone, contentDescription = null, tint = NeonBlue)
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = NeonBlue,
                    unfocusedBorderColor = SovereignBorder,
                    focusedLabelColor = NeonBlue,
                    unfocusedLabelColor = TextTertiary,
                    cursorColor = NeonBlue,
                    focusedTextColor = TextPrimary,
                    unfocusedTextColor = TextPrimary
                ),
                shape = RoundedCornerShape(14.dp),
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(14.dp))

            // Password Input
            OutlinedTextField(
                value = password,
                onValueChange = { password = it },
                label = { Text("كلمة المرور") },
                leadingIcon = {
                    Icon(Icons.Outlined.Lock, contentDescription = null, tint = NeonBlue)
                },
                trailingIcon = {
                    IconButton(onClick = { passwordVisible = !passwordVisible }) {
                        Icon(
                            if (passwordVisible) Icons.Filled.Visibility else Icons.Filled.VisibilityOff,
                            contentDescription = null,
                            tint = TextTertiary
                        )
                    }
                },
                visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = NeonBlue,
                    unfocusedBorderColor = SovereignBorder,
                    focusedLabelColor = NeonBlue,
                    unfocusedLabelColor = TextTertiary,
                    cursorColor = NeonBlue,
                    focusedTextColor = TextPrimary,
                    unfocusedTextColor = TextPrimary
                ),
                shape = RoundedCornerShape(14.dp),
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(8.dp))

            TextButton(
                onClick = { },
                modifier = Modifier.align(Alignment.End)
            ) {
                Text("نسيت كلمة المرور؟", color = NeonBlue, fontSize = 13.sp)
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Login Button
            Button(
                onClick = { navController.navigate(NavRoute.Home.route) { popUpTo(NavRoute.Login.route) { inclusive = true } } },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = NeonBlue,
                    contentColor = SovereignBlack
                )
            ) {
                Text("تسجيل الدخول", fontSize = 16.sp, fontWeight = FontWeight.Bold)
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Register
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("ليس لديك حساب؟", color = TextTertiary, fontSize = 13.sp)
                TextButton(onClick = { }) {
                    Text("إنشاء حساب", color = PureGold, fontSize = 13.sp, fontWeight = FontWeight.Bold)
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Social Login
            Text("أو تسجيل الدخول بـ", color = TextTertiary, fontSize = 12.sp)
            Spacer(modifier = Modifier.height(12.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                SocialButton(Icons.Filled.Email, "Google")
                SocialButton(Icons.Filled.Facebook, "Facebook")
                SocialButton(Icons.Filled.Apple, "Apple")
            }
        }
    }
}

@Composable
private fun SocialButton(icon: ImageVector, label: String) {
    Box(
        modifier = Modifier
            .size(52.dp)
            .clip(CircleShape)
            .background(SovereignCard)
            .border(1.dp, SovereignBorder, CircleShape)
            .clickable { },
        contentAlignment = Alignment.Center
    ) {
        Icon(icon, contentDescription = label, tint = TextSecondary, modifier = Modifier.size(24.dp))
    }
}
