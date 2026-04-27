package com.iraqsovereign.app.data.model

data class Conversation(
    val id: String = "",
    val participantIds: List<String> = emptyList(),
    val participantNames: Map<String, String> = emptyMap(),
    val lastMessage: String = "",
    val lastMessageAt: Long = System.currentTimeMillis(),
    val unreadCount: Map<String, Int> = emptyMap(),
    val moduleType: ModuleType = ModuleType.STORE,
    val relatedProductId: String? = null,
    val isArchived: Boolean = false
)

data class ChatMessage(
    val id: String = "",
    val conversationId: String = "",
    val senderId: String = "",
    val senderName: String = "",
    val content: String = "",
    val type: MessageType = MessageType.TEXT,
    val isAutoReply: Boolean = false,
    val isRead: Boolean = false,
    val timestamp: Long = System.currentTimeMillis(),
    val attachmentUrl: String? = null
)

enum class MessageType(val nameAr: String) {
    TEXT("نص"),
    IMAGE("صورة"),
    LOCATION("موقع"),
    OFFER("عرض سعر"),
    AUTO_REPLY("رد آلي"),
    SYSTEM("نظام")
}

data class AutoReplyTemplate(
    val id: String = "",
    val userId: String = "",
    val trigger: String = "",
    val response: String = "",
    val responseAr: String = "",
    val moduleType: ModuleType = ModuleType.SERVICES,
    val isActive: Boolean = true
)
