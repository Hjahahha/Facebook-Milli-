package com.iraqsovereign.app.utils

import java.math.BigDecimal
import java.math.RoundingMode
import java.text.NumberFormat
import java.util.Locale

/**
 * Currency utilities with military-precision arithmetic.
 * All monetary calculations use BigDecimal to prevent floating-point errors.
 */
object CurrencyUtils {
    private val arabicFormat = NumberFormat.getNumberInstance(Locale("ar", "IQ"))

    fun formatIQD(amount: Long): String {
        return "${arabicFormat.format(amount)} د.ع"
    }

    fun formatIQD(amount: BigDecimal): String {
        return "${arabicFormat.format(amount.toLong())} د.ع"
    }

    fun formatUSD(amount: Double): String {
        return "$${String.format("%.2f", amount)}"
    }

    fun deductBalance(currentBalance: BigDecimal, amount: BigDecimal): BigDecimal {
        require(amount >= BigDecimal.ZERO) { "Deduction amount must be non-negative" }
        require(currentBalance >= amount) { "Insufficient balance: $currentBalance < $amount" }
        return currentBalance.subtract(amount).setScale(0, RoundingMode.UNNECESSARY)
    }

    fun addBalance(currentBalance: BigDecimal, amount: BigDecimal): BigDecimal {
        require(amount >= BigDecimal.ZERO) { "Addition amount must be non-negative" }
        return currentBalance.add(amount).setScale(0, RoundingMode.UNNECESSARY)
    }

    fun calculateCommission(amount: BigDecimal, ratePercent: BigDecimal): BigDecimal {
        return amount.multiply(ratePercent).divide(BigDecimal("100"), 0, RoundingMode.HALF_UP)
    }

    fun verifyTransaction(balanceBefore: BigDecimal, amount: BigDecimal, balanceAfter: BigDecimal): Boolean {
        val expected = balanceBefore.subtract(amount)
        return expected.compareTo(balanceAfter) == 0
    }
}
