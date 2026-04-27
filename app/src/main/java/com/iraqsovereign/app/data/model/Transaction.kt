package com.iraqsovereign.app.data.model

import java.math.BigDecimal
import java.math.RoundingMode

/**
 * Transaction logging with "military precision" — uses BigDecimal
 * to eliminate floating-point errors. No 1-cent mistakes.
 */
data class Transaction(
    val id: String = "",
    val userId: String = "",
    val type: TransactionType = TransactionType.PURCHASE,
    val amountIQD: BigDecimal = BigDecimal.ZERO,
    val balanceBefore: BigDecimal = BigDecimal.ZERO,
    val balanceAfter: BigDecimal = BigDecimal.ZERO,
    val description: String = "",
    val descriptionAr: String = "",
    val referenceId: String = "",
    val moduleType: ModuleType = ModuleType.STORE,
    val status: TransactionStatus = TransactionStatus.PENDING,
    val createdAt: Long = System.currentTimeMillis(),
    val completedAt: Long? = null,
    val metadata: Map<String, String> = emptyMap()
) {
    fun verify(): Boolean {
        val expected = balanceBefore.subtract(amountIQD).setScale(0, RoundingMode.UNNECESSARY)
        return balanceAfter.compareTo(expected) == 0
    }
}

enum class TransactionType(val nameAr: String) {
    PURCHASE("شراء"),
    SALE("بيع"),
    PROMOTION_DEBIT("خصم ترويج"),
    SUBSCRIPTION("اشتراك"),
    DEPOSIT("إيداع"),
    WITHDRAWAL("سحب"),
    REFUND("استرداد"),
    COMMISSION("عمولة"),
    REWARD("مكافأة")
}

enum class TransactionStatus(val nameAr: String) {
    PENDING("قيد الانتظار"),
    COMPLETED("مكتمل"),
    FAILED("فشل"),
    REVERSED("مسترد"),
    FROZEN("مجمد")
}

data class TransactionLog(
    val transactionId: String,
    val action: String,
    val details: String,
    val timestamp: Long = System.currentTimeMillis(),
    val ipAddress: String = "",
    val deviceInfo: String = ""
)
