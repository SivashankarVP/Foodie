// CraveGo Chatbot Implementation (Enhanced Version)
document.addEventListener("DOMContentLoaded", () => {
    // 1. DYNAMICALLY CREATE CHATBOT HTML
    const launcher = document.createElement("div");
    launcher.className = "chatbot-launcher";
    launcher.id = "chatbot-launcher";
    launcher.innerHTML = '<i class="ri-chat-smile-3-line"></i>';
    document.body.appendChild(launcher);

    const windowDiv = document.createElement("div");
    windowDiv.className = "chatbot-window";
    windowDiv.id = "chatbot-window";
    windowDiv.innerHTML = `
        <div class="chatbot-header">
            <div class="chatbot-header-info">
                <div class="chatbot-avatar" style="color: #fff; font-size: 22px;"><i class="ri-robot-2-fill"></i></div>
                <div>
                    <h3 class="chatbot-title">CraveGo Assistant</h3>
                    <p class="chatbot-status">Online</p>
                </div>
            </div>
            <i class="ri-close-line chatbot-close" id="chatbot-close"></i>
        </div>
        <div class="chatbot-messages" id="chatbot-messages">
            <div class="message bot">
                Hello! 👋 I am the CraveGo Assistant. How can I help you today? Ask me about menus, orders, promo codes, or the developer!
            </div>
        </div>
        <div class="chatbot-quick-replies">
            <button class="quick-reply-btn" data-query="Food recommendations">🍔 Recommendations</button>
            <button class="quick-reply-btn" data-query="Active coupons">🏷️ Promo codes</button>
            <button class="quick-reply-btn" data-query="Order Status">📦 Track order</button>
            <button class="quick-reply-btn" data-query="Account">🔑 Account</button>
            <button class="quick-reply-btn" data-query="About Developer">👨‍💻 Developer</button>
        </div>
        <div class="chatbot-input-area">
            <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Type a message..." autocomplete="off">
            <button class="chatbot-send" id="chatbot-send"><i class="ri-send-plane-2-fill"></i></button>
        </div>
    `;
    document.body.appendChild(windowDiv);

    // 2. DOM ELEMENTS
    const chatBtn = document.getElementById("chatbot-launcher");
    const chatWin = document.getElementById("chatbot-window");
    const chatClose = document.getElementById("chatbot-close");
    const chatMessages = document.getElementById("chatbot-messages");
    const chatInput = document.getElementById("chatbot-input");
    const chatSend = document.getElementById("chatbot-send");
    const quickReplyContainer = document.querySelector(".chatbot-quick-replies");

    // 3. EVENT LISTENERS
    chatBtn.addEventListener("click", () => {
        chatWin.classList.toggle("active");
        if (chatWin.classList.contains("active")) {
            chatInput.focus();
        }
    });

    chatClose.addEventListener("click", () => {
        chatWin.classList.remove("active");
    });

    chatSend.addEventListener("click", handleUserMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleUserMessage();
        }
    });

    quickReplyContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("quick-reply-btn")) {
            const query = e.target.getAttribute("data-query");
            addUserMessage(query);
            respondToQuery(query);
        }
    });

    // 4. MESSAGE FUNCTIONS
    function handleUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        addUserMessage(text);
        chatInput.value = "";
        respondToQuery(text);
    }

    function addUserMessage(text) {
        const msg = document.createElement("div");
        msg.className = "message user";
        msg.textContent = text;
        chatMessages.appendChild(msg);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const msg = document.createElement("div");
        msg.className = "message bot";
        msg.innerHTML = text;
        chatMessages.appendChild(msg);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 5. ENHANCED INTENT-BASED RESPONSE LOGIC
    function respondToQuery(query) {
        const lower = query.toLowerCase().trim();
        const statusElement = document.querySelector(".chatbot-status");
        
        statusElement.textContent = "Typing...";
        
        const match = (keywords) => {
            return keywords.some(keyword => lower.includes(keyword.toLowerCase()));
        };

        setTimeout(() => {
            statusElement.textContent = "Online";
            
            // Developer Info
            if (match(["developer", "creator", "designed", "built", "author", "sivashankar", "about"])) {
                addBotMessage("This project was designed and developed by <strong>Sivashankar V P</strong>.<br><br><a href='https://www.instagram.com/sivashankar__007/' target='_blank' style='color:#ff9800; text-decoration:none; font-weight:bold; font-size:16px; margin-right:15px;'><i class='ri-instagram-line'></i> Instagram</a> <a href='https://www.linkedin.com/in/sivashankar-vp' target='_blank' style='color:#ff9800; text-decoration:none; font-weight:bold; font-size:16px;'><i class='ri-linkedin-box-fill'></i> LinkedIn</a>");
            }
            // Greetings
            else if (match(["hello", "hi", "hey", "welcome", "morning", "evening"])) {
                addBotMessage("Hello! I am the CraveGo Assistant. You can ask me about menus, orders, promo codes, or developer info.");
            }
            // Food recommendations
            else if (match(["recommend", "food", "eat", "burger", "pizza", "menu", "dishes"])) {
                addBotMessage("You can explore a variety of cuisines! Check out our Burgers, Pizzas, and Beverages by navigating to the <strong>Restaurants</strong> page.");
            }
            // Promo codes & Discounts
            else if (match(["coupon", "promo", "discount", "code", "offer"])) {
                addBotMessage("Active Promo Codes:<br>• <strong>SIVA95</strong>: 95% off your subtotal<br>• <strong>WELCOME50</strong>: Flat ₹100 off your first order");
            }
            // Order Tracking
            else if (match(["status", "track", "history", "order"])) {
                addBotMessage("You can track your orders and view past receipts by visiting the <strong>Order History</strong> section from the top navigation bar.");
            }
            // Login / Account
            else if (match(["login", "sign", "register", "account", "profile"])) {
                addBotMessage("To manage your account, click the <strong>Sign In</strong> button or your user icon in the top right corner of the page.");
            }
            // Support
            else if (match(["support", "help", "contact", "issue"])) {
                addBotMessage("Need help? Please email us at <strong>sivashankar@gmail.com</strong> for support regarding your orders.");
            }
            // Default response (Project related constraint)
            else {
                addBotMessage("I am a specialized assistant for the CraveGo project. I can only answer queries related to this application (menus, orders, coupons, developer info). Please ask a relevant question.");
            }
        }, 800);
    }
});
