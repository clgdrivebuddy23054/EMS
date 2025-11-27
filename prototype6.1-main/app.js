// Enhanced Kirana Store Management System with AI Chat functionality
class KiranaStore {
    constructor() {
        this.db = null;
        this.currentTab = 'dashboard';
        this.recognition = null;
        this.isListening = false;
        this.chart = null;
        this.theme = localStorage.getItem('theme') || 'system';
        this.isInitialized = false;
        this.currentBill = null;
        this.cart = [];
        this.quickAccessOpen = false;

        // AI Chat Configuration
        this.geminiApiKey = 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key
        this.geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

        // Enhanced voice recognition settings
        this.voiceSettings = {
            language: 'en-US',
            continuous: true,
            interimResults: true,
            maxAlternatives: 3,
            confidence: 0.7,
            noiseReduction: true
        };

        // Sample data with the exact structure from user requirements
        this.sampleData = {
            products: [
                {
                    id: "prod_001",
                    name: "Basmati Rice",
                    category: "Grains",
                    currentStock: 50,
                    minStock: 10,
                    unit: "kg",
                    costPrice: 80,
                    sellingPrice: 100,
                    lastUpdated: "2024-01-15T10:00:00Z"
                },
                {
                    id: "prod_002",
                    name: "Moong Dal",
                    category: "Pulses",
                    currentStock: 25,
                    minStock: 5,
                    unit: "kg",
                    costPrice: 120,
                    sellingPrice: 150,
                    lastUpdated: "2024-01-14T10:00:00Z"
                },
                {
                    id: "prod_003",
                    name: "Sunflower Oil",
                    category: "Oils",
                    currentStock: 30,
                    minStock: 8,
                    unit: "L",
                    costPrice: 140,
                    sellingPrice: 170,
                    lastUpdated: "2024-01-13T10:00:00Z"
                },
                {
                    id: "prod_004",
                    name: "Turmeric Powder",
                    category: "Spices",
                    currentStock: 15,
                    minStock: 3,
                    unit: "kg",
                    costPrice: 200,
                    sellingPrice: 250,
                    lastUpdated: "2024-01-12T10:00:00Z"
                },
                {
                    id: "prod_005",
                    name: "Wheat Flour",
                    category: "Grains",
                    currentStock: 40,
                    minStock: 10,
                    unit: "kg",
                    costPrice: 35,
                    sellingPrice: 45,
                    lastUpdated: "2024-01-11T10:00:00Z"
                },
                {
                    id: "prod_006",
                    name: "Red Onions",
                    category: "Vegetables",
                    currentStock: 3,
                    minStock: 5,
                    unit: "kg",
                    costPrice: 25,
                    sellingPrice: 35,
                    lastUpdated: "2024-01-10T10:00:00Z"
                }
            ],
            customers: [
                {
                    id: "cust_001",
                    name: "Rajesh Kumar",
                    phone: "+91 9876543210",
                    address: "123 Main Street, Delhi",
                    totalPurchases: 2500,
                    loyaltyPoints: 125,
                    lastVisit: "2024-01-15",
                    joinDate: "2023-06-15"
                },
                {
                    id: "cust_002",
                    name: "Priya Sharma",
                    phone: "+91 9876543211",
                    address: "456 Park Avenue, Mumbai",
                    totalPurchases: 1800,
                    loyaltyPoints: 90,
                    lastVisit: "2024-01-14",
                    joinDate: "2023-08-20"
                },
                {
                    id: "cust_003",
                    name: "Amit Patel",
                    phone: "+91 9876543212",
                    address: "789 Garden Road, Pune",
                    totalPurchases: 3200,
                    loyaltyPoints: 160,
                    lastVisit: "2024-01-13",
                    joinDate: "2023-04-10"
                },
                {
                    id: "cust_004",
                    name: "Sita Devi",
                    phone: "+91 9876543213",
                    address: "321 Temple Street, Varanasi",
                    totalPurchases: 1500,
                    loyaltyPoints: 75,
                    lastVisit: "2024-01-12",
                    joinDate: "2023-09-05"
                }
            ],
            sales: [
                {
                    id: "sale_001",
                    productId: "prod_001",
                    productName: "Basmati Rice",
                    customerId: "cust_001",
                    customerName: "Rajesh Kumar",
                    quantity: 2,
                    unitPrice: 100,
                    totalAmount: 200,
                    date: "2024-01-15",
                    time: "10:30 AM"
                },
                {
                    id: "sale_002",
                    productId: "prod_002",
                    productName: "Moong Dal",
                    customerId: "cust_002",
                    customerName: "Priya Sharma",
                    quantity: 1,
                    unitPrice: 150,
                    totalAmount: 150,
                    date: "2024-01-14",
                    time: "2:15 PM"
                },
                {
                    id: "sale_003",
                    productId: "prod_003",
                    productName: "Sunflower Oil",
                    customerId: "cust_003",
                    customerName: "Amit Patel",
                    quantity: 3,
                    unitPrice: 170,
                    totalAmount: 510,
                    date: "2024-01-13",
                    time: "4:45 PM"
                },
                {
                    id: "sale_004",
                    productId: "prod_004",
                    productName: "Turmeric Powder",
                    customerId: "cust_001",
                    customerName: "Rajesh Kumar",
                    quantity: 1,
                    unitPrice: 250,
                    totalAmount: 250,
                    date: "2024-01-12",
                    time: "11:20 AM"
                },
                {
                    id: "sale_005",
                    productId: "prod_005",
                    productName: "Wheat Flour",
                    customerId: "cust_004",
                    customerName: "Sita Devi",
                    quantity: 5,
                    unitPrice: 45,
                    totalAmount: 225,
                    date: "2024-01-11",
                    time: "3:30 PM"
                },
                {
                    id: "sale_006",
                    productId: "prod_001",
                    productName: "Basmati Rice",
                    customerId: "cust_003",
                    customerName: "Amit Patel",
                    quantity: 3,
                    unitPrice: 100,
                    totalAmount: 300,
                    date: "2024-01-10",
                    time: "9:15 AM"
                }
            ],
            categories: ["Grains", "Pulses", "Oils", "Spices", "Dairy", "Beverages", "Snacks", "Household", "Vegetables", "Fruits"],
            storeInfo: {
                name: "Kirana Store",
                address: "123 Main Street, City, State 12345",
                phone: "+91 1234567890",
                email: "info@kiranastore.com",
                gstin: "22XXXXX0000XXX",
                owner: "Store Owner"
            }
        };
    }

    async init() {
        try {
            console.log('Initializing Enhanced Kirana Store Management System...');

            // Initialize database first
            await this.initDB();
            console.log('Database initialized successfully');

            // Load initial sample data
            await this.loadInitialData();
            console.log('Initial data loaded successfully');

            // Initialize UI components
            this.initEventListeners();
            this.initTheme();
            this.initEnhancedVoiceRecognition();

            // Set initial tab and load dashboard
            this.switchTab('dashboard');

            // Initialize Feather icons
            if (typeof feather !== 'undefined') {
                feather.replace();
            }

            // Mark as initialized
            this.isInitialized = true;
            console.log('Enhanced Kirana Store Management System initialized successfully');
            this.showToast('Application loaded successfully!', 'success');

        } catch (error) {
            console.error('Critical error during initialization:', error);
            this.showToast('Failed to initialize application', 'error');
        }
    }

    // ======================================== 
    // DATABASE MANAGEMENT
    // ========================================
    async initDB() {
        return new Promise((resolve, reject) => {
            console.log('Opening IndexedDB...');
            const request = indexedDB.open('KiranaStoreDB', 3);

            request.onerror = (event) => {
                console.error('Database error:', event.target.error);
                reject(new Error('Failed to open database'));
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('Database opened successfully');
                resolve();
            };

            request.onupgradeneeded = (event) => {
                console.log('Database upgrade needed, creating object stores...');
                const db = event.target.result;

                try {
                    // Create object stores with proper structure
                    if (!db.objectStoreNames.contains('products')) {
                        const productStore = db.createObjectStore('products', { keyPath: 'id' });
                        productStore.createIndex('name', 'name', { unique: false });
                        productStore.createIndex('category', 'category', { unique: false });
                        console.log('Products store created');
                    }

                    if (!db.objectStoreNames.contains('customers')) {
                        const customerStore = db.createObjectStore('customers', { keyPath: 'id' });
                        customerStore.createIndex('name', 'name', { unique: false });
                        customerStore.createIndex('phone', 'phone', { unique: false });
                        console.log('Customers store created');
                    }

                    if (!db.objectStoreNames.contains('sales')) {
                        const salesStore = db.createObjectStore('sales', { keyPath: 'id' });
                        salesStore.createIndex('date', 'date', { unique: false });
                        salesStore.createIndex('productId', 'productId', { unique: false });
                        salesStore.createIndex('customerId', 'customerId', { unique: false });
                        console.log('Sales store created');
                    }

                    if (!db.objectStoreNames.contains('settings')) {
                        db.createObjectStore('settings', { keyPath: 'key' });
                        console.log('Settings store created');
                    }

                    // New store for bills
                    if (!db.objectStoreNames.contains('bills')) {
                        const billStore = db.createObjectStore('bills', { keyPath: 'id' });
                        billStore.createIndex('date', 'date', { unique: false });
                        billStore.createIndex('customerId', 'customerId', { unique: false });
                        console.log('Bills store created');
                    }

                } catch (error) {
                    console.error('Error creating object stores:', error);
                }
            };
        });
    }

    async getData(storeName) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction([storeName], 'readonly');
                const store = transaction.objectStore(storeName);
                const request = store.getAll();

                request.onsuccess = () => {
                    resolve(request.result || []);
                };

                request.onerror = () => {
                    console.error(`Error getting data from ${storeName}:`, request.error);
                    reject(new Error(`Failed to get data from ${storeName}`));
                };

                transaction.onerror = () => {
                    console.error(`Transaction error for ${storeName}:`, transaction.error);
                    reject(new Error(`Transaction failed for ${storeName}`));
                };

            } catch (error) {
                console.error(`Critical error getting data from ${storeName}:`, error);
                reject(error);
            }
        });
    }

    async saveData(storeName, data) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.put(data);

                request.onsuccess = () => {
                    resolve();
                };

                request.onerror = () => {
                    console.error(`Error saving data to ${storeName}:`, request.error);
                    reject(new Error(`Failed to save data to ${storeName}`));
                };

                transaction.onerror = () => {
                    console.error(`Transaction error for ${storeName}:`, transaction.error);
                    reject(new Error(`Transaction failed for ${storeName}`));
                };

            } catch (error) {
                console.error(`Critical error saving data to ${storeName}:`, error);
                reject(error);
            }
        });
    }

    async deleteData(storeName, id) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.delete(id);

                request.onsuccess = () => {
                    resolve();
                };

                request.onerror = () => {
                    console.error(`Error deleting data from ${storeName}:`, request.error);
                    reject(new Error(`Failed to delete data from ${storeName}`));
                };

            } catch (error) {
                console.error(`Critical error deleting data from ${storeName}:`, error);
                reject(error);
            }
        });
    }

    async loadInitialData() {
        try {
            // Check if data already exists
            const existingProducts = await this.getData('products');
            const existingCustomers = await this.getData('customers');
            const existingSales = await this.getData('sales');

            console.log('Existing data:', {
                products: existingProducts.length,
                customers: existingCustomers.length,
                sales: existingSales.length
            });

            // Load sample data if database is empty
            if (existingProducts.length === 0) {
                console.log('Loading sample products...');
                for (const product of this.sampleData.products) {
                    await this.saveData('products', product);
                }
                console.log('Sample products loaded');
            }

            if (existingCustomers.length === 0) {
                console.log('Loading sample customers...');
                for (const customer of this.sampleData.customers) {
                    await this.saveData('customers', customer);
                }
                console.log('Sample customers loaded');
            }

            if (existingSales.length === 0) {
                console.log('Loading sample sales...');
                for (const sale of this.sampleData.sales) {
                    await this.saveData('sales', sale);
                }
                console.log('Sample sales loaded');
            }

            // Load store info
            const storeInfo = await this.getData('settings');
            if (storeInfo.length === 0) {
                await this.saveData('settings', { key: 'storeInfo', value: this.sampleData.storeInfo });
            }

        } catch (error) {
            console.error('Error loading initial data:', error);
            throw new Error('Failed to load initial data');
        }
    }

    // ========================================
    // EVENT LISTENERS AND INITIALIZATION
    // ========================================
    initEventListeners() {
        // Fixed tab switching with proper event handling
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const tab = item.dataset.tab;
                if (tab && this.currentTab !== tab) {
                    this.switchTab(tab);
                }
            });
        });

        // Modal overlay click handling
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.hideAllModals();
            }
        });
    }

    // ========================================
    // AI CHAT FUNCTIONALITY
    // ========================================
    showAIChatModal() {
        this.showModal('aiChatModal');
        // Reinitialize Feather icons for new modal content
        setTimeout(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 100);
    }

    async sendAIMessage() {
        const inputField = document.getElementById('aiChatInputField');
        const messagesContainer = document.getElementById('aiChatMessages');

        if (!inputField || !messagesContainer) return;

        const userMessage = inputField.value.trim();
        if (!userMessage) return;

        // Add user message to chat
        this.addChatMessage('user', userMessage);
        inputField.value = '';

        // Show typing indicator
        const typingIndicator = this.addChatMessage('ai', '', true);

        try {
            // Get business context
            const businessContext = await this.getBusinessContext();

            // Create AI response
            const aiResponse = await this.generateAIResponse(userMessage, businessContext);

            // Remove typing indicator and add AI response
            if (typingIndicator) {
                typingIndicator.remove();
            }
            this.addChatMessage('ai', aiResponse);

        } catch (error) {
            console.error('Error sending AI message:', error);
            if (typingIndicator) {
                typingIndicator.remove();
            }
            this.addChatMessage('ai', 'I apologize, but I encountered an error processing your request. Please try again or check your internet connection.');
        }

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addChatMessage(sender, message, isTyping = false) {
        const messagesContainer = document.getElementById('aiChatMessages');
        if (!messagesContainer) return null;

        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'user-message' : 'ai-message';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';

        if (sender === 'user') {
            avatarDiv.innerHTML = '<i data-feather="user"></i>';
        } else {
            avatarDiv.innerHTML = '<i data-feather="cpu"></i>';
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        if (isTyping) {
            contentDiv.innerHTML = `
                <div class="ai-loading">
                    AI is thinking
                    <div class="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
        } else {
            // Format message with proper HTML
            const formattedMessage = this.formatAIMessage(message);
            contentDiv.innerHTML = formattedMessage;
        }

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);

        // Replace Feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        return messageDiv;
    }

    formatAIMessage(message) {
        // Convert markdown-like formatting to HTML
        let formatted = message
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')  // Bold
            .replace(/\*(.+?)\*/g, '<em>$1</em>')  // Italic
            .replace(/```(.+?)```/gs, '<code>$1</code>')  // Code blocks
            .replace(/`(.+?)`/g, '<code>$1</code>')  // Inline code
            .replace(/\n/g, '<br>');  // Line breaks

        // Convert bullet points
        if (formatted.includes('•') || formatted.includes('-')) {
            const lines = formatted.split('<br>');
            let inList = false;
            let result = [];

            for (let line of lines) {
                line = line.trim();
                if (line.startsWith('•') || line.startsWith('-')) {
                    if (!inList) {
                        result.push('<ul>');
                        inList = true;
                    }
                    result.push(`<li>${line.substring(1).trim()}</li>`);
                } else {
                    if (inList) {
                        result.push('</ul>');
                        inList = false;
                    }
                    if (line) {
                        result.push(`<p>${line}</p>`);
                    }
                }
            }

            if (inList) {
                result.push('</ul>');
            }

            formatted = result.join('');
        } else {
            // Convert line breaks to paragraphs
            const paragraphs = formatted.split('<br><br>');
            formatted = paragraphs.map(p => p.trim() ? `<p>${p.replace(/<br>/g, ' ')}</p>` : '').join('');
        }

        return formatted || `<p>${message}</p>`;
    }

    async getBusinessContext() {
        try {
            const [products, customers, sales] = await Promise.all([
                this.getData('products'),
                this.getData('customers'),
                this.getData('sales')
            ]);

            // Create business summary
            const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
            const lowStockItems = products.filter(p => p.currentStock <= p.minStock);
            const topProducts = this.getTopProducts(sales, products);
            const topCustomers = customers.sort((a, b) => b.totalPurchases - a.totalPurchases).slice(0, 3);

            return {
                summary: {
                    totalProducts: products.length,
                    totalCustomers: customers.length,
                    totalSales: sales.length,
                    totalRevenue: totalRevenue,
                    lowStockItems: lowStockItems.length
                },
                products: products,
                customers: customers,
                sales: sales,
                lowStockItems: lowStockItems,
                topProducts: topProducts,
                topCustomers: topCustomers
            };
        } catch (error) {
            console.error('Error getting business context:', error);
            return {
                summary: { error: 'Unable to load business data' },
                products: [],
                customers: [],
                sales: []
            };
        }
    }

    getTopProducts(sales, products) {
        const productSales = {};
        sales.forEach(sale => {
            productSales[sale.productId] = (productSales[sale.productId] || 0) + sale.totalAmount;
        });

        return Object.entries(productSales)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([productId, revenue]) => {
                const product = products.find(p => p.id === productId);
                return {
                    name: product?.name || 'Unknown',
                    revenue: revenue
                };
            });
    }

    async generateAIResponse(userMessage, businessContext) {
        // If no API key is set, use fallback responses
        if (!this.geminiApiKey || this.geminiApiKey === 'YOUR_GEMINI_API_KEY') {
            return this.getFallbackAIResponse(userMessage, businessContext);
        }

        try {
            const prompt = this.createAIPrompt(userMessage, businessContext);

            const response = await fetch(`${this.geminiApiUrl}?key=${this.geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid response format from Gemini API');
            }

        } catch (error) {
            console.error('Error calling Gemini API:', error);
            return this.getFallbackAIResponse(userMessage, businessContext);
        }
    }

    createAIPrompt(userMessage, businessContext) {
        return `You are an AI assistant for a Kirana (grocery) store management system. 

STORE CONTEXT:
- Total Products: ${businessContext.summary.totalProducts}
- Total Customers: ${businessContext.summary.totalCustomers}
- Total Sales: ${businessContext.summary.totalSales}
- Total Revenue: ₹${businessContext.summary.totalRevenue?.toLocaleString() || 0}
- Low Stock Items: ${businessContext.summary.lowStockItems}

TOP PRODUCTS BY REVENUE:
${businessContext.topProducts?.map(p => `- ${p.name}: ₹${p.revenue}`).join('\n') || 'No data available'}

TOP CUSTOMERS:
${businessContext.topCustomers?.map(c => `- ${c.name}: ₹${c.totalPurchases} total purchases`).join('\n') || 'No data available'}

LOW STOCK ITEMS NEEDING ATTENTION:
${businessContext.lowStockItems?.map(item => `- ${item.name}: ${item.currentStock} remaining (min: ${item.minStock})`).join('\n') || 'All items are adequately stocked'}

USER QUESTION: ${userMessage}

Please provide helpful, specific advice based on this store's actual data. Be conversational but informative. Include actionable recommendations when appropriate. Keep responses concise but comprehensive.`;
    }

    getFallbackAIResponse(userMessage, businessContext) {
        const lowerMessage = userMessage.toLowerCase();

        // Stock-related queries
        if (lowerMessage.includes('stock') || lowerMessage.includes('inventory')) {
            if (businessContext.lowStockItems && businessContext.lowStockItems.length > 0) {
                return `**Stock Analysis:**

You have ${businessContext.lowStockItems.length} items running low on stock:

${businessContext.lowStockItems.map(item => 
    `• **${item.name}**: Only ${item.currentStock} ${item.unit} left (minimum: ${item.minStock})`
).join('\n')}

**Recommendations:**
- Reorder these items immediately to avoid stockouts
- Consider increasing minimum stock levels for high-demand items
- Set up automatic reorder alerts for better inventory management`;
            } else {
                return `**Stock Status:** ✅ All ${businessContext.summary.totalProducts} products are adequately stocked! Your inventory management is on track.`;
            }
        }

        // Sales-related queries
        if (lowerMessage.includes('sales') || lowerMessage.includes('revenue') || lowerMessage.includes('performance')) {
            return `**Sales Performance Overview:**

📊 **Current Stats:**
• Total Revenue: ₹${businessContext.summary.totalRevenue?.toLocaleString() || 0}
• Total Transactions: ${businessContext.summary.totalSales}
• Active Customers: ${businessContext.summary.totalCustomers}

🏆 **Top Performing Products:**
${businessContext.topProducts?.map((p, i) => `${i + 1}. ${p.name} - ₹${p.revenue.toLocaleString()}`).join('\n') || 'No sales data available'}

**Growth Tips:**
- Focus marketing on your top-performing products
- Offer loyalty rewards to encourage repeat purchases
- Analyze slow-moving inventory for potential promotions`;
        }

        // Customer-related queries
        if (lowerMessage.includes('customer') || lowerMessage.includes('client')) {
            return `**Customer Insights:**

👥 **Customer Base:** ${businessContext.summary.totalCustomers} registered customers

🌟 **Top Customers:**
${businessContext.topCustomers?.map((c, i) => 
    `${i + 1}. ${c.name} - ₹${c.totalPurchases.toLocaleString()} total purchases`
).join('\n') || 'No customer data available'}

**Customer Engagement Tips:**
- Reward loyal customers with exclusive discounts
- Send personalized offers based on purchase history
- Implement a points-based loyalty program
- Follow up with customers who haven't visited recently`;
        }

        // Product-related queries
        if (lowerMessage.includes('product') || lowerMessage.includes('item')) {
            return `**Product Catalog Overview:**

📦 **Inventory:** ${businessContext.summary.totalProducts} products across multiple categories

**Product Management Tips:**
- Regularly review slow-moving items
- Ensure competitive pricing on popular products
- Maintain optimal stock levels to avoid both overstock and stockouts
- Consider seasonal demand patterns when ordering

Need specific product information? Ask me about stock levels, sales performance, or pricing strategies for any item.`;
        }

        // Profit and pricing queries
        if (lowerMessage.includes('profit') || lowerMessage.includes('pricing') || lowerMessage.includes('margin')) {
            return `**Profitability Insights:**

💰 **Revenue Overview:** ₹${businessContext.summary.totalRevenue?.toLocaleString() || 0} from ${businessContext.summary.totalSales} transactions

**Profit Optimization Tips:**
- Review profit margins on all products
- Focus on high-margin items in your marketing
- Negotiate better wholesale prices for bulk purchases
- Implement dynamic pricing for seasonal items
- Reduce waste through better inventory rotation

Would you like me to analyze specific products or categories for profitability?`;
        }

        // Business advice queries
        if (lowerMessage.includes('advice') || lowerMessage.includes('recommend') || lowerMessage.includes('improve') || lowerMessage.includes('grow')) {
            return `**Business Growth Recommendations:**

🚀 **Based on your current performance:**

**Immediate Actions:**
${businessContext.lowStockItems?.length > 0 ? 
    `• Restock ${businessContext.lowStockItems.length} low-inventory items` : 
    '• Inventory levels look good!'
}
• Focus on your top ${businessContext.topProducts?.length || 3} performing products

**Growth Strategies:**
• **Customer Retention:** Implement loyalty programs for your ${businessContext.summary.totalCustomers} customers
• **Inventory Optimization:** Use sales data to predict demand patterns
• **Digital Presence:** Consider online ordering for regular customers
• **Seasonal Planning:** Prepare inventory for upcoming seasons/festivals

**Metrics to Track:**
• Monthly revenue growth
• Customer acquisition rate
• Inventory turnover ratio
• Average transaction value

What specific area would you like to focus on improving?`;
        }

        // General greeting or unclear query
        return `**Hello! I'm your store's AI assistant.** 📊

I can help you with:
• **Inventory Management** - Stock levels, reorder recommendations
• **Sales Analysis** - Performance insights, trends
• **Customer Insights** - Loyalty patterns, top customers  
• **Business Advice** - Growth strategies, optimization tips

**Quick Stats:**
• Products: ${businessContext.summary.totalProducts}
• Customers: ${businessContext.summary.totalCustomers}
• Total Revenue: ₹${businessContext.summary.totalRevenue?.toLocaleString() || 0}
• Low Stock Alerts: ${businessContext.summary.lowStockItems}

What would you like to know about your store?`;
    }

    // ========================================
    // QUICK ACCESS MENU
    // ========================================
    toggleQuickAccess() {
        const menu = document.getElementById('quickAccessMenu');
        if (menu) {
            this.quickAccessOpen = !this.quickAccessOpen;
            if (this.quickAccessOpen) {
                menu.classList.add('active');
            } else {
                menu.classList.remove('active');
            }
        }
    }

    // ========================================
    // ENHANCED VOICE RECOGNITION
    // ========================================
    initEnhancedVoiceRecognition() {
        try {
            // Check for speech recognition support
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                console.warn('Speech recognition not supported in this browser');
                this.showToast('Voice recognition not supported', 'warning');
                return;
            }

            this.recognition = new SpeechRecognition();

            // Enhanced configuration for better accuracy
            this.recognition.continuous = this.voiceSettings.continuous;
            this.recognition.interimResults = this.voiceSettings.interimResults;
            this.recognition.lang = this.voiceSettings.language;
            this.recognition.maxAlternatives = this.voiceSettings.maxAlternatives;

            // Event handlers for enhanced voice recognition
            this.recognition.onstart = () => {
                console.log('Voice recognition started');
                this.isListening = true;
                this.updateVoiceUI();
                this.showToast('Voice recognition started - speak now!', 'info');
            };

            this.recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const result = event.results[i];
                    const transcript = result[0].transcript;

                    // Only process high-confidence results
                    if (result[0].confidence >= this.voiceSettings.confidence) {
                        if (result.isFinal) {
                            finalTranscript += transcript;
                        } else {
                            interimTranscript += transcript;
                        }
                    }
                }

                if (finalTranscript) {
                    console.log('Voice command received:', finalTranscript);
                    this.processVoiceCommand(finalTranscript.trim().toLowerCase());
                }
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isListening = false;
                this.updateVoiceUI();

                let errorMessage = 'Voice recognition error';
                switch (event.error) {
                    case 'network':
                        errorMessage = 'Network error in voice recognition';
                        break;
                    case 'not-allowed':
                        errorMessage = 'Microphone access denied';
                        break;
                    case 'no-speech':
                        errorMessage = 'No speech detected';
                        break;
                    default:
                        errorMessage = `Voice recognition error: ${event.error}`;
                }
                this.showToast(errorMessage, 'error');
            };

            this.recognition.onend = () => {
                console.log('Voice recognition ended');
                this.isListening = false;
                this.updateVoiceUI();

                // Auto-restart if it was manually started
                if (this.shouldRestartVoice) {
                    setTimeout(() => {
                        if (this.shouldRestartVoice) {
                            this.startVoiceRecognition();
                        }
                    }, 500);
                }
            };

            console.log('Enhanced voice recognition initialized');

        } catch (error) {
            console.error('Error initializing voice recognition:', error);
            this.showToast('Failed to initialize voice recognition', 'error');
        }
    }

    processVoiceCommand(command) {
        console.log('Processing voice command:', command);

        // Enhanced command processing with multiple variations
        const commands = {
            navigation: [
                { patterns: ['dashboard', 'home', 'main'], action: () => this.switchTab('dashboard') },
                { patterns: ['products', 'product', 'items', 'inventory'], action: () => this.switchTab('products') },
                { patterns: ['sales', 'sale', 'transactions'], action: () => this.switchTab('sales') },
                { patterns: ['customers', 'customer', 'clients'], action: () => this.switchTab('customers') },
                { patterns: ['analytics', 'analysis', 'charts', 'reports'], action: () => this.switchTab('analytics') },
                { patterns: ['settings', 'setting', 'configuration'], action: () => this.switchTab('settings') }
            ],
            actions: [
                { patterns: ['add product', 'new product', 'create product'], action: () => this.showAddProductModal() },
                { patterns: ['add sale', 'new sale', 'create sale', 'cart', 'shopping cart'], action: () => this.showCartModal() },
                { patterns: ['add customer', 'new customer', 'create customer'], action: () => this.showAddCustomerModal() },
                { patterns: ['generate bill', 'create bill', 'make bill', 'bill'], action: () => this.generateBill() },
                { patterns: ['print bill', 'print receipt'], action: () => this.printBill() },
                { patterns: ['export data', 'download data'], action: () => this.exportData() },
                { patterns: ['ai chat', 'open ai', 'ai assistant', 'chat'], action: () => this.showAIChatModal() }
            ],
            controls: [
                { patterns: ['stop voice', 'stop listening', 'voice off'], action: () => this.stopVoiceRecognition() },
                { patterns: ['start voice', 'start listening', 'voice on'], action: () => this.startVoiceRecognition() }
            ]
        };

        let commandExecuted = false;

        // Check all command categories
        Object.values(commands).forEach(category => {
            category.forEach(cmd => {
                if (!commandExecuted && cmd.patterns.some(pattern => command.includes(pattern))) {
                    try {
                        cmd.action();
                        this.showToast(`✅ Executed: ${command}`, 'success');
                        commandExecuted = true;
                    } catch (error) {
                        console.error('Error executing voice command:', error);
                        this.showToast(`❌ Failed to execute: ${command}`, 'error');
                        commandExecuted = true;
                    }
                }
            });
        });

        if (!commandExecuted) {
            this.showToast(`❓ Command not recognized: ${command}`, 'warning');
            // Try to provide helpful suggestions
            const suggestions = [
                'Try "go to dashboard"',
                'Say "add product"',
                'Try "generate bill"',
                'Say "show customers"',
                'Try "open cart"',
                'Say "ai chat"'
            ];
            setTimeout(() => {
                const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
                this.showToast(`💡 Suggestion: ${randomSuggestion}`, 'info');
            }, 2000);
        }
    }

    toggleVoiceRecognition() {
        if (this.isListening) {
            this.stopVoiceRecognition();
        } else {
            this.startVoiceRecognition();
        }
    }

    startVoiceRecognition() {
        if (!this.recognition) {
            this.showToast('Voice recognition not available', 'error');
            return;
        }

        try {
            this.shouldRestartVoice = true;
            this.recognition.start();
        } catch (error) {
            console.error('Error starting voice recognition:', error);
            this.showToast('Failed to start voice recognition', 'error');
        }
    }

    stopVoiceRecognition() {
        this.shouldRestartVoice = false;
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    updateVoiceUI() {
        const voiceBtn = document.getElementById('voiceBtn');
        const voiceStatus = document.getElementById('voiceStatus');

        if (voiceBtn && voiceStatus) {
            if (this.isListening) {
                voiceBtn.classList.add('voice-recording');
                voiceStatus.textContent = 'Listening...';
            } else {
                voiceBtn.classList.remove('voice-recording');
                voiceStatus.textContent = 'Voice';
            }
        }
    }

    // ========================================
    // CART FUNCTIONALITY
    // ========================================
    showCartModal() {
        this.loadCartData();
        this.showModal('cartModal');
    }

    async loadCartData() {
        try {
            // Load customers for selection
            const customers = await this.getData('customers');
            const customerSelect = document.getElementById('cartCustomer');

            if (customerSelect) {
                customerSelect.innerHTML = '<option value="">Walk-in Customer</option>';
                customers.forEach(customer => {
                    customerSelect.innerHTML += `<option value="${customer.id}">${customer.name} - ${customer.phone}</option>`;
                });
            }

            // Load products for selection
            const products = await this.getData('products');
            const productSelect = document.getElementById('cartProduct');

            if (productSelect) {
                productSelect.innerHTML = '<option value="">Select Product</option>';
                products.forEach(product => {
                    if (product.currentStock > 0) {
                        productSelect.innerHTML += `<option value="${product.id}">${product.name} - ₹${product.sellingPrice} (Stock: ${product.currentStock})</option>`;
                    }
                });
            }

            // Update cart display
            this.updateCartDisplay();

        } catch (error) {
            console.error('Error loading cart data:', error);
            this.showToast('Failed to load cart data', 'error');
        }
    }

    async addToCart() {
        const productSelect = document.getElementById('cartProduct');
        const quantityInput = document.getElementById('cartQuantity');

        if (!productSelect.value) {
            this.showToast('Please select a product', 'warning');
            return;
        }

        const quantity = parseInt(quantityInput.value) || 1;
        if (quantity <= 0) {
            this.showToast('Please enter a valid quantity', 'warning');
            return;
        }

        try {
            const products = await this.getData('products');
            const product = products.find(p => p.id === productSelect.value);

            if (!product) {
                this.showToast('Product not found', 'error');
                return;
            }

            if (product.currentStock < quantity) {
                this.showToast(`Insufficient stock. Available: ${product.currentStock}`, 'warning');
                return;
            }

            // Check if product already in cart
            const existingItem = this.cart.find(item => item.productId === product.id);

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                if (product.currentStock < newQuantity) {
                    this.showToast(`Cannot add more. Total would exceed stock (${product.currentStock})`, 'warning');
                    return;
                }
                existingItem.quantity = newQuantity;
                existingItem.totalAmount = newQuantity * product.sellingPrice;
            } else {
                this.cart.push({
                    productId: product.id,
                    productName: product.name,
                    unitPrice: product.sellingPrice,
                    quantity: quantity,
                    totalAmount: quantity * product.sellingPrice,
                    unit: product.unit
                });
            }

            // Reset form
            productSelect.value = '';
            quantityInput.value = '1';

            // Update display
            this.updateCartDisplay();
            this.showToast(`Added ${product.name} to cart`, 'success');

        } catch (error) {
            console.error('Error adding to cart:', error);
            this.showToast('Failed to add item to cart', 'error');
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.productId !== productId);
        this.updateCartDisplay();
        this.showToast('Item removed from cart', 'info');
    }

    updateCartQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.productId === productId);
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
            item.totalAmount = newQuantity * item.unitPrice;
            this.updateCartDisplay();
        }
    }

    updateCartDisplay() {
        const cartItemsBody = document.getElementById('cartItemsBody');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTax = document.getElementById('cartTax');
        const cartTotal = document.getElementById('cartTotal');

        if (!cartItemsBody) return;

        if (this.cart.length === 0) {
            cartItemsBody.innerHTML = '<tr><td colspan="5">Cart is empty</td></tr>';
            if (cartSubtotal) cartSubtotal.textContent = '0';
            if (cartTax) cartTax.textContent = '0';
            if (cartTotal) cartTotal.textContent = '0';
            return;
        }

        // Generate cart items HTML
        cartItemsBody.innerHTML = this.cart.map(item => `
            <tr>
                <td>${item.productName}</td>
                <td>₹${item.unitPrice.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" 
                           onchange="window.kiranaMgmt?.updateCartQuantity('${item.productId}', this.value)"
                           style="width: 60px; padding: 4px;">
                </td>
                <td>₹${item.totalAmount.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" 
                            onclick="window.kiranaMgmt?.removeFromCart('${item.productId}')">
                        Remove
                    </button>
                </td>
            </tr>
        `).join('');

        // Calculate totals
        const subtotal = this.cart.reduce((sum, item) => sum + item.totalAmount, 0);
        const tax = Math.round(subtotal * 0.18 * 100) / 100; // 18% GST
        const total = subtotal + tax;

        if (cartSubtotal) cartSubtotal.textContent = subtotal.toFixed(2);
        if (cartTax) cartTax.textContent = tax.toFixed(2);
        if (cartTotal) cartTotal.textContent = total.toFixed(2);
    }

    clearCart() {
        this.cart = [];
        this.updateCartDisplay();
        this.showToast('Cart cleared', 'info');
    }

    async processSaleFromCart() {
        if (this.cart.length === 0) {
            this.showToast('Cart is empty', 'warning');
            return;
        }

        try {
            const customerSelect = document.getElementById('cartCustomer');
            const customerId = customerSelect?.value || '';

            let customer = null;
            if (customerId) {
                const customers = await this.getData('customers');
                customer = customers.find(c => c.id === customerId);
            }

            // Process each cart item as a separate sale
            const currentDate = new Date().toISOString().split('T')[0];
            const currentTime = new Date().toLocaleTimeString();

            for (const item of this.cart) {
                const saleId = `sale_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

                const sale = {
                    id: saleId,
                    productId: item.productId,
                    productName: item.productName,
                    customerId: customerId || 'walk_in',
                    customerName: customer?.name || 'Walk-in Customer',
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    totalAmount: item.totalAmount,
                    date: currentDate,
                    time: currentTime
                };

                await this.saveData('sales', sale);

                // Update product stock
                const products = await this.getData('products');
                const product = products.find(p => p.id === item.productId);
                if (product) {
                    product.currentStock -= item.quantity;
                    product.lastUpdated = new Date().toISOString();
                    await this.saveData('products', product);
                }
            }

            // Update customer data if selected
            if (customer) {
                const cartTotal = this.cart.reduce((sum, item) => sum + item.totalAmount, 0);
                customer.totalPurchases += cartTotal;
                customer.loyaltyPoints += Math.floor(cartTotal / 100); // 1 point per 100 rupees
                customer.lastVisit = currentDate;
                await this.saveData('customers', customer);
            }

            // Generate bill
            await this.generateBillFromCart();

            // Clear cart and hide modal
            this.clearCart();
            this.hideModal('cartModal');

            // Refresh displays
            if (this.currentTab === 'dashboard') await this.updateDashboard();
            if (this.currentTab === 'sales') await this.loadSales();
            if (this.currentTab === 'products') await this.loadProducts();

            this.showToast('Sale completed successfully!', 'success');

        } catch (error) {
            console.error('Error processing sale from cart:', error);
            this.showToast('Failed to process sale', 'error');
        }
    }

    async generateBillFromCart() {
        try {
            const customerSelect = document.getElementById('cartCustomer');
            const customerId = customerSelect?.value || '';

            let customer = { name: 'Walk-in Customer', phone: '', address: '' };
            if (customerId) {
                const customers = await this.getData('customers');
                const foundCustomer = customers.find(c => c.id === customerId);
                if (foundCustomer) customer = foundCustomer;
            }

            // Get store info
            const settings = await this.getData('settings');
            const storeInfo = settings.find(s => s.key === 'storeInfo')?.value || this.sampleData.storeInfo;

            // Create bill
            const bill = {
                id: `bill_${Date.now()}`,
                billNumber: `B${Date.now().toString().slice(-6)}`,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString(),
                customer: customer,
                items: this.cart,
                subtotal: this.cart.reduce((sum, item) => sum + item.totalAmount, 0),
                tax: 0,
                discount: 0,
                total: 0,
                storeInfo: storeInfo
            };

            // Calculate tax and total
            bill.tax = Math.round(bill.subtotal * 0.18 * 100) / 100; // 18% GST
            bill.total = bill.subtotal + bill.tax - bill.discount;

            // Save bill to database
            await this.saveData('bills', bill);

            // Store current bill for printing/downloading
            this.currentBill = bill;

            // Show bill preview
            this.showBillPreview(bill);

        } catch (error) {
            console.error('Error generating bill from cart:', error);
            this.showToast('Failed to generate bill', 'error');
        }
    }

    // ========================================
    // BILLING SYSTEM
    // ========================================
    async generateBill(saleData = null) {
        try {
            let billItems = [];

            if (saleData) {
                // Generate bill from specific sale
                billItems = [saleData];
            } else {
                // Generate bill from recent sales
                const recentSales = await this.getData('sales');
                const today = new Date().toISOString().split('T')[0];
                billItems = recentSales.filter(sale => sale.date === today).slice(-5);
            }

            if (billItems.length === 0) {
                this.showToast('No items found for billing', 'warning');
                return;
            }

            // Get store info
            const settings = await this.getData('settings');
            const storeInfo = settings.find(s => s.key === 'storeInfo')?.value || this.sampleData.storeInfo;

            // Get customer info
            const customerId = billItems[0].customerId;
            const customers = await this.getData('customers');
            const customer = customers.find(c => c.id === customerId) || {
                name: 'Walk-in Customer',
                phone: '',
                address: ''
            };

            // Create bill
            const bill = {
                id: `bill_${Date.now()}`,
                billNumber: `B${Date.now().toString().slice(-6)}`,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString(),
                customer: customer,
                items: billItems,
                subtotal: billItems.reduce((sum, item) => sum + item.totalAmount, 0),
                tax: 0,
                discount: 0,
                total: billItems.reduce((sum, item) => sum + item.totalAmount, 0),
                storeInfo: storeInfo
            };

            // Calculate tax (GST)
            bill.tax = Math.round(bill.subtotal * 0.18 * 100) / 100; // 18% GST
            bill.total = bill.subtotal + bill.tax - bill.discount;

            // Save bill to database
            await this.saveData('bills', bill);

            // Store current bill for printing/downloading
            this.currentBill = bill;

            // Show bill preview
            this.showBillPreview(bill);

        } catch (error) {
            console.error('Error generating bill:', error);
            this.showToast('Failed to generate bill', 'error');
        }
    }

    showBillPreview(bill) {
        const billContent = document.getElementById('billContent');
        if (!billContent) {
            console.error('Bill content element not found');
            return;
        }

        const billHTML = `
            <div class="bill-header">
                <h2 class="bill-title">${bill.storeInfo.name}</h2>
                <div class="bill-store-info">
                    <p>${bill.storeInfo.address}</p>
                    <p>Phone: ${bill.storeInfo.phone} | Email: ${bill.storeInfo.email}</p>
                    <p>GSTIN: ${bill.storeInfo.gstin}</p>
                </div>
            </div>

            <div class="bill-meta">
                <div class="bill-meta-section">
                    <h4>Bill Details</h4>
                    <p>Bill No: ${bill.billNumber}</p>
                    <p>Date: ${bill.date}</p>
                    <p>Time: ${bill.time}</p>
                </div>
                <div class="bill-meta-section">
                    <h4>Customer Details</h4>
                    <p>Name: ${bill.customer.name}</p>
                    <p>Phone: ${bill.customer.phone || 'N/A'}</p>
                    <p>Address: ${bill.customer.address || 'N/A'}</p>
                </div>
            </div>

            <div class="bill-items">
                <table class="bill-items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bill.items.map(item => `
                            <tr>
                                <td>${item.productName}</td>
                                <td>${item.quantity}</td>
                                <td>₹${item.unitPrice.toFixed(2)}</td>
                                <td>₹${item.totalAmount.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="bill-total">
                <div class="bill-total-line">
                    <span>Subtotal:</span>
                    <span>₹${bill.subtotal.toFixed(2)}</span>
                </div>
                <div class="bill-total-line">
                    <span>Tax (GST 18%):</span>
                    <span>₹${bill.tax.toFixed(2)}</span>
                </div>
                <div class="bill-total-line">
                    <span>Discount:</span>
                    <span>₹${bill.discount.toFixed(2)}</span>
                </div>
                <div class="bill-total-line total">
                    <span>Total Amount:</span>
                    <span>₹${bill.total.toFixed(2)}</span>
                </div>
            </div>

            <div class="bill-footer">
                <p>Thank you for your business!</p>
                <p>Visit again soon</p>
            </div>
        `;

        billContent.innerHTML = billHTML;
        this.showModal('billModal');
    }

    printBill() {
        if (this.currentBill) {
            window.print();
        } else {
            this.showToast('No bill to print', 'warning');
        }
    }

    downloadBill() {
        if (!this.currentBill) {
            this.showToast('No bill to download', 'warning');
            return;
        }

        const billContent = document.getElementById('billContent');
        if (!billContent) return;

        const billText = `
${this.currentBill.storeInfo.name}
${this.currentBill.storeInfo.address}
Phone: ${this.currentBill.storeInfo.phone}
GSTIN: ${this.currentBill.storeInfo.gstin}

==========================================
Bill No: ${this.currentBill.billNumber}
Date: ${this.currentBill.date}
Time: ${this.currentBill.time}
==========================================

Customer: ${this.currentBill.customer.name}
Phone: ${this.currentBill.customer.phone || 'N/A'}

==========================================
ITEMS:
==========================================
${this.currentBill.items.map(item => 
    `${item.productName}
  Qty: ${item.quantity} x ₹${item.unitPrice.toFixed(2)} = ₹${item.totalAmount.toFixed(2)}
`
).join('')}
==========================================
Subtotal: ₹${this.currentBill.subtotal.toFixed(2)}
Tax (GST 18%): ₹${this.currentBill.tax.toFixed(2)}
Discount: ₹${this.currentBill.discount.toFixed(2)}
TOTAL: ₹${this.currentBill.total.toFixed(2)}
==========================================

Thank you for your business!
Visit again soon
        `;

        const blob = new Blob([billText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bill_${this.currentBill.billNumber}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showToast('Bill downloaded successfully', 'success');
    }

    // ========================================
    // TAB SWITCHING AND MODAL MANAGEMENT
    // ========================================
    switchTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab
        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeNavItem = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Load tab-specific data
        this.currentTab = tabName;
        this.loadTabData(tabName);
    }

    async loadTabData(tabName) {
        try {
            switch (tabName) {
                case 'dashboard':
                    await this.updateDashboard();
                    break;
                case 'products':
                    await this.loadProducts();
                    break;
                case 'sales':
                    await this.loadSales();
                    break;
                case 'inventory':
                    await this.loadInventory();
                    break;
                case 'customers':
                    await this.loadCustomers();
                    break;
                case 'analytics':
                    await this.loadAnalytics();
                    break;
                case 'settings':
                    this.loadSettings();
                    break;
            }
        } catch (error) {
            console.error(`Error loading ${tabName} data:`, error);
            this.showToast(`Failed to load ${tabName} data`, 'error');
        }
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modalOverlay');

        if (modal && overlay) {
            // Hide all other modals first
            this.hideAllModals();

            // Show the requested modal
            modal.style.display = 'block';
            overlay.classList.remove('hidden');

            // Replace Feather icons in the modal
            setTimeout(() => {
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            }, 100);

            // Focus on the modal
            setTimeout(() => {
                const firstInput = modal.querySelector('input, select, textarea, button');
                if (firstInput) firstInput.focus();
            }, 200);
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modalOverlay');

        if (modal) {
            modal.style.display = 'none';
        }

        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    hideAllModals() {
        const modals = document.querySelectorAll('.modal');
        const overlay = document.getElementById('modalOverlay');

        modals.forEach(modal => {
            modal.style.display = 'none';
        });

        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    // Continue with remaining methods from the original code...
    // [Include all the remaining methods from the previous implementation]

    // ========================================
    // DATA LOADING METHODS
    // ========================================
    async updateDashboard() {
        try {
            const [products, customers, sales] = await Promise.all([
                this.getData('products'),
                this.getData('customers'), 
                this.getData('sales')
            ]);

            // Update stats
            const totalSales = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
            const lowStockItems = products.filter(p => p.currentStock <= p.minStock).length;

            document.getElementById('totalSales').textContent = `₹${totalSales.toLocaleString()}`;
            document.getElementById('totalProducts').textContent = products.length;
            document.getElementById('totalCustomers').textContent = customers.length;
            document.getElementById('lowStock').textContent = lowStockItems;

            // Update recent activities
            const recentSales = sales.slice(-5).reverse();
            const recentActivities = document.getElementById('recentActivities');

            if (recentActivities) {
                if (recentSales.length === 0) {
                    recentActivities.innerHTML = 'No recent activities';
                    return;
                }

                const activitiesHTML = recentSales.map(sale => `
                    <div style="padding: 8px 0; border-bottom: 1px solid var(--color-card-border);">
                        <strong>${sale.customerName}</strong> bought ${sale.quantity} ${sale.productName} 
                        for ₹${sale.totalAmount} on ${sale.date}
                    </div>
                `).join('');

                recentActivities.innerHTML = activitiesHTML;
            }

        } catch (error) {
            console.error('Error updating dashboard:', error);
        }
    }

    async loadProducts() {
        try {
            const products = await this.getData('products');
            this.populateProductsTable(products);
            await this.populateProductCategories();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    populateProductsTable(products) {
        const tbody = document.getElementById('productsTableBody');
        if (!tbody) return;

        if (products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">No products found</td></tr>';
            return;
        }

        tbody.innerHTML = products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.currentStock}</td>
                <td>${product.unit}</td>
                <td>₹${product.costPrice.toFixed(2)}</td>
                <td>₹${product.sellingPrice.toFixed(2)}</td>
                <td class="actions">
                    <button class="btn btn-primary" onclick="window.kiranaMgmt?.editProduct('${product.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="window.kiranaMgmt?.deleteProduct('${product.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    async populateProductCategories() {
        const categoryFilter = document.getElementById('categoryFilter');
        const productCategory = document.getElementById('productCategory');

        if (categoryFilter) {
            categoryFilter.innerHTML = '<option value="">All Categories</option>';
            this.sampleData.categories.forEach(category => {
                categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
            });
        }

        if (productCategory) {
            productCategory.innerHTML = '<option value="">Select Category</option>';
            this.sampleData.categories.forEach(category => {
                productCategory.innerHTML += `<option value="${category}">${category}</option>`;
            });
        }
    }

    async loadSales() {
        try {
            const sales = await this.getData('sales');
            this.populateSalesTable(sales);
        } catch (error) {
            console.error('Error loading sales:', error);
        }
    }

    populateSalesTable(sales) {
        const tbody = document.getElementById('salesTableBody');
        if (!tbody) return;

        if (sales.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">No sales found</td></tr>';
            return;
        }

        tbody.innerHTML = sales.map(sale => `
            <tr>
                <td>${sale.date}</td>
                <td>${sale.productName}</td>
                <td>${sale.customerName}</td>
                <td>${sale.quantity}</td>
                <td>₹${sale.unitPrice.toFixed(2)}</td>
                <td>₹${sale.totalAmount.toFixed(2)}</td>
                <td class="actions">
                    <button class="btn btn-primary" onclick="window.kiranaMgmt?.generateBill(${JSON.stringify(sale).replace(/"/g, '&quot;')})">Bill</button>
                    <button class="btn btn-danger" onclick="window.kiranaMgmt?.deleteSale('${sale.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    async loadInventory() {
        try {
            const products = await this.getData('products');

            // Update inventory stats
            const totalItems = products.reduce((sum, product) => sum + product.currentStock, 0);
            const lowStockItems = products.filter(p => p.currentStock <= p.minStock).length;
            const totalValue = products.reduce((sum, product) => sum + (product.currentStock * product.costPrice), 0);

            document.getElementById('inventoryTotalItems').textContent = totalItems;
            document.getElementById('inventoryLowStock').textContent = lowStockItems;
            document.getElementById('inventoryTotalValue').textContent = `₹${totalValue.toLocaleString()}`;

            this.populateInventoryTable(products);
        } catch (error) {
            console.error('Error loading inventory:', error);
        }
    }

    populateInventoryTable(products) {
        const tbody = document.getElementById('inventoryTableBody');
        if (!tbody) return;

        if (products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6">No inventory found</td></tr>';
            return;
        }

        tbody.innerHTML = products.map(product => {
            const status = product.currentStock <= product.minStock ? 'Low Stock' : 'In Stock';
            const statusClass = product.currentStock <= product.minStock ? 'warning' : 'success';
            const value = product.currentStock * product.costPrice;

            return `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.currentStock}</td>
                    <td>${product.minStock}</td>
                    <td><span class="stat-change ${statusClass}">${status}</span></td>
                    <td>₹${value.toFixed(2)}</td>
                    <td class="actions">
                        <button class="btn btn-primary" onclick="window.kiranaMgmt?.updateStock('${product.id}')">Update</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    async loadCustomers() {
        try {
            const customers = await this.getData('customers');
            this.populateCustomersTable(customers);
        } catch (error) {
            console.error('Error loading customers:', error);
        }
    }

    populateCustomersTable(customers) {
        const tbody = document.getElementById('customersTableBody');
        if (!tbody) return;

        if (customers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6">No customers found</td></tr>';
            return;
        }

        tbody.innerHTML = customers.map(customer => `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>₹${customer.totalPurchases.toLocaleString()}</td>
                <td>${customer.loyaltyPoints}</td>
                <td>${customer.lastVisit}</td>
                <td class="actions">
                    <button class="btn btn-primary" onclick="window.kiranaMgmt?.editCustomer('${customer.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="window.kiranaMgmt?.deleteCustomer('${customer.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    async loadAnalytics() {
        await this.updateChart();
        await this.updateChartInsights();
    }

    async updateChart() {
        const chartType = document.getElementById('chartType')?.value || 'product-sales';
        const canvas = document.getElementById('analyticsChart');

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
        }

        try {
            const [products, sales, customers] = await Promise.all([
                this.getData('products'),
                this.getData('sales'),
                this.getData('customers')
            ]);

            let chartData = {};

            switch (chartType) {
                case 'product-sales':
                    const productSales = {};
                    sales.forEach(sale => {
                        productSales[sale.productName] = (productSales[sale.productName] || 0) + sale.totalAmount;
                    });

                    chartData = {
                        labels: Object.keys(productSales),
                        datasets: [{
                            label: 'Sales Amount',
                            data: Object.values(productSales),
                            backgroundColor: [
                                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                            ]
                        }]
                    };

                    this.chart = new Chart(ctx, {
                        type: 'doughnut',
                        data: chartData,
                        options: { 
                            responsive: true, 
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                    position: 'bottom'
                                }
                            }
                        }
                    });
                    break;

                case 'sales-trends':
                    const dailySales = {};
                    sales.forEach(sale => {
                        dailySales[sale.date] = (dailySales[sale.date] || 0) + sale.totalAmount;
                    });

                    const sortedDates = Object.keys(dailySales).sort();

                    chartData = {
                        labels: sortedDates,
                        datasets: [{
                            label: 'Daily Sales',
                            data: sortedDates.map(date => dailySales[date]),
                            borderColor: '#36A2EB',
                            backgroundColor: 'rgba(54, 162, 235, 0.1)',
                            fill: true
                        }]
                    };

                    this.chart = new Chart(ctx, {
                        type: 'line',
                        data: chartData,
                        options: { 
                            responsive: true, 
                            maintainAspectRatio: true,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                    break;

                case 'inventory-levels':
                    chartData = {
                        labels: products.map(p => p.name),
                        datasets: [{
                            label: 'Current Stock',
                            data: products.map(p => p.currentStock),
                            backgroundColor: products.map(p => 
                                p.currentStock <= p.minStock ? '#FF6384' : '#4BC0C0'
                            )
                        }]
                    };

                    this.chart = new Chart(ctx, {
                        type: 'bar',
                        data: chartData,
                        options: { 
                            responsive: true, 
                            maintainAspectRatio: true,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                    break;

                case 'customer-purchases':
                    const topCustomers = customers.sort((a, b) => b.totalPurchases - a.totalPurchases).slice(0, 10);

                    chartData = {
                        labels: topCustomers.map(c => c.name),
                        datasets: [{
                            label: 'Total Purchases',
                            data: topCustomers.map(c => c.totalPurchases),
                            backgroundColor: '#9966FF'
                        }]
                    };

                    this.chart = new Chart(ctx, {
                        type: 'bar',
                        data: chartData,
                        options: { 
                            responsive: true, 
                            maintainAspectRatio: true,
                            indexAxis: 'y',
                            scales: {
                                x: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                    break;
            }

        } catch (error) {
            console.error('Error updating chart:', error);
        }
    }

    async updateChartInsights() {
        const container = document.getElementById('chartInsights');
        if (!container) return;

        const chartType = document.getElementById('chartType')?.value || 'product-sales';

        try {
            const [products, sales, customers] = await Promise.all([
                this.getData('products'),
                this.getData('sales'),
                this.getData('customers')
            ]);

            let insights = '';

            switch (chartType) {
                case 'product-sales':
                    const productSales = {};
                    sales.forEach(sale => {
                        productSales[sale.productName] = (productSales[sale.productName] || 0) + sale.totalAmount;
                    });

                    const bestSelling = Object.keys(productSales).reduce((a, b) => 
                        productSales[a] > productSales[b] ? a : b, Object.keys(productSales)[0] || 'None'
                    );

                    insights = `
                        <div>📈 <strong>Best Selling Product:</strong> ${bestSelling}</div>
                        <div>📊 <strong>Total Products Sold:</strong> ${sales.length}</div>
                        <div>💰 <strong>Revenue Distribution:</strong> Top product generates ${productSales[bestSelling] ? Math.round((productSales[bestSelling] / Object.values(productSales).reduce((a,b) => a+b, 0)) * 100) : 0}% of total sales</div>
                    `;
                    break;

                case 'sales-trends':
                    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
                    const avgSale = totalRevenue / sales.length;

                    insights = `
                        <div>💰 <strong>Total Revenue:</strong> ₹${totalRevenue.toLocaleString()}</div>
                        <div>📊 <strong>Average Sale Value:</strong> ₹${avgSale.toFixed(2)}</div>
                        <div>📈 <strong>Total Transactions:</strong> ${sales.length}</div>
                    `;
                    break;

                case 'inventory-levels':
                    const lowStock = products.filter(p => p.currentStock <= p.minStock).length;
                    const totalValue = products.reduce((sum, p) => sum + (p.currentStock * p.costPrice), 0);

                    insights = `
                        <div>⚠️ <strong>Products in Low Stock:</strong> ${lowStock}</div>
                        <div>📦 <strong>Total Products:</strong> ${products.length}</div>
                        <div>💰 <strong>Inventory Value:</strong> ₹${totalValue.toLocaleString()}</div>
                    `;
                    break;

                case 'customer-purchases':
                    const topCustomer = customers.reduce((prev, current) => 
                        (prev.totalPurchases > current.totalPurchases) ? prev : current, customers[0] || {}
                    );

                    insights = `
                        <div>👑 <strong>Top Customer:</strong> ${topCustomer.name || 'None'}</div>
                        <div>👥 <strong>Total Customers:</strong> ${customers.length}</div>
                        <div>💰 <strong>Avg. Customer Value:</strong> ₹${customers.length > 0 ? (customers.reduce((sum, c) => sum + c.totalPurchases, 0) / customers.length).toFixed(2) : 0}</div>
                    `;
                    break;

                default:
                    insights = '<div>Select a chart type to view insights</div>';
            }

            container.innerHTML = insights;

        } catch (error) {
            console.error('Error updating insights:', error);
            container.innerHTML = '<div>Unable to load chart insights</div>';
        }
    }

    loadSettings() {
        // Load store information
        this.getData('settings').then(settings => {
            const storeInfo = settings.find(s => s.key === 'storeInfo')?.value || this.sampleData.storeInfo;

            const storeNameInput = document.getElementById('storeName');
            const storeAddressInput = document.getElementById('storeAddress'); 
            const storePhoneInput = document.getElementById('storePhone');
            const storeEmailInput = document.getElementById('storeEmail');

            if (storeNameInput) storeNameInput.value = storeInfo.name || '';
            if (storeAddressInput) storeAddressInput.value = storeInfo.address || '';
            if (storePhoneInput) storePhoneInput.value = storeInfo.phone || '';
            if (storeEmailInput) storeEmailInput.value = storeInfo.email || '';
        }).catch(error => {
            console.error('Error loading settings:', error);
        });
    }

    // ========================================
    // FORM HANDLING METHODS
    // ========================================
    showAddProductModal() {
        this.populateProductCategories();
        this.showModal('addProductModal');
    }

    showAddCustomerModal() {
        this.showModal('addCustomerModal');
    }

    async addProduct(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const product = {
            id: `prod_${Date.now()}`,
            name: formData.get('name'),
            category: formData.get('category'),
            currentStock: parseInt(formData.get('currentStock')),
            minStock: parseInt(formData.get('minStock')),
            unit: formData.get('unit'),
            costPrice: parseFloat(formData.get('costPrice')),
            sellingPrice: parseFloat(formData.get('sellingPrice')),
            lastUpdated: new Date().toISOString()
        };

        try {
            await this.saveData('products', product);
            this.showToast('Product added successfully', 'success');
            this.hideModal('addProductModal');
            event.target.reset();

            if (this.currentTab === 'products') {
                await this.loadProducts();
            }

            if (this.currentTab === 'dashboard') {
                await this.updateDashboard();
            }
        } catch (error) {
            console.error('Error adding product:', error);
            this.showToast('Failed to add product', 'error');
        }
    }

    async addCustomer(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const customer = {
            id: `cust_${Date.now()}`,
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address') || '',
            totalPurchases: 0,
            loyaltyPoints: 0,
            lastVisit: new Date().toISOString().split('T')[0],
            joinDate: new Date().toISOString().split('T')[0]
        };

        try {
            await this.saveData('customers', customer);
            this.showToast('Customer added successfully', 'success');
            this.hideModal('addCustomerModal');
            event.target.reset();

            if (this.currentTab === 'customers') {
                await this.loadCustomers();
            }

            if (this.currentTab === 'dashboard') {
                await this.updateDashboard();
            }
        } catch (error) {
            console.error('Error adding customer:', error);
            this.showToast('Failed to add customer', 'error');
        }
    }

    async saveStoreInfo() {
        try {
            const form = document.getElementById('storeInfoForm');
            const formData = new FormData(form);

            const storeInfo = {
                name: formData.get('storeName'),
                address: formData.get('storeAddress'),
                phone: formData.get('storePhone'),
                email: formData.get('storeEmail')
            };

            await this.saveData('settings', { key: 'storeInfo', value: storeInfo });
            this.showToast('Store information saved successfully', 'success');
        } catch (error) {
            console.error('Error saving store info:', error);
            this.showToast('Failed to save store information', 'error');
        }
    }

    // ========================================
    // THEME MANAGEMENT
    // ========================================
    initTheme() {
        // Set initial theme
        this.applyTheme(this.theme);

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (this.theme === 'system') {
                    this.applyTheme('system');
                }
            });
        }
    }

    toggleTheme() {
        const themes = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(this.theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.theme = themes[nextIndex];

        localStorage.setItem('theme', this.theme);
        this.applyTheme(this.theme);
        this.showToast(`Theme switched to ${this.theme}`, 'info');
    }

    applyTheme(theme) {
        const root = document.documentElement;
        if (theme === 'system') {
            root.removeAttribute('data-color-scheme');
        } else {
            root.setAttribute('data-color-scheme', theme);
        }
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const messageElement = document.createElement('p');
        messageElement.className = 'toast-message';
        messageElement.textContent = message;

        toast.appendChild(messageElement);
        toastContainer.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }

    async filterTable(tableType, searchTerm, filterValue = '') {
        try {
            let data = [];
            switch (tableType) {
                case 'products':
                    data = await this.getData('products');
                    break;
                case 'customers':
                    data = await this.getData('customers');
                    break;
                case 'sales':
                    data = await this.getData('sales');
                    break;
            }

            // Apply filters
            const filteredData = data.filter(item => {
                const matchesSearch = searchTerm === '' || Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                );

                let matchesFilter = true;
                if (filterValue && tableType === 'products') {
                    matchesFilter = item.category === filterValue;
                }

                return matchesSearch && matchesFilter;
            });

            // Update table
            switch (tableType) {
                case 'products':
                    this.populateProductsTable(filteredData);
                    break;
                case 'customers':
                    this.populateCustomersTable(filteredData);
                    break;
                case 'sales':
                    this.populateSalesTable(filteredData);
                    break;
            }

        } catch (error) {
            console.error('Error filtering table:', error);
        }
    }

    async filterSalesTable(searchTerm, dateFilter) {
        try {
            const sales = await this.getData('sales');

            const filteredSales = sales.filter(sale => {
                const matchesSearch = searchTerm === '' || Object.values(sale).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                );
                const matchesDate = dateFilter === '' || sale.date === dateFilter;

                return matchesSearch && matchesDate;
            });

            this.populateSalesTable(filteredSales);
        } catch (error) {
            console.error('Error filtering sales table:', error);
        }
    }

    async filterCustomersTable(searchTerm) {
        await this.filterTable('customers', searchTerm);
    }

    async exportData() {
        try {
            const [products, customers, sales] = await Promise.all([
                this.getData('products'),
                this.getData('customers'),
                this.getData('sales')
            ]);

            const data = { products, customers, sales };
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `kirana_store_data_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            this.showToast('Data exported successfully', 'success');
        } catch (error) {
            console.error('Error exporting data:', error);
            this.showToast('Failed to export data', 'error');
        }
    }

    // Delete functions
    async deleteProduct(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await this.deleteData('products', id);
                this.showToast('Product deleted successfully', 'success');
                await this.loadProducts();
                await this.updateDashboard();
            } catch (error) {
                console.error('Error deleting product:', error);
                this.showToast('Failed to delete product', 'error');
            }
        }
    }

    async deleteSale(id) {
        if (confirm('Are you sure you want to delete this sale?')) {
            try {
                await this.deleteData('sales', id);
                this.showToast('Sale deleted successfully', 'success');
                await this.loadSales();
                await this.updateDashboard();
            } catch (error) {
                console.error('Error deleting sale:', error);
                this.showToast('Failed to delete sale', 'error');
            }
        }
    }

    async deleteCustomer(id) {
        if (confirm('Are you sure you want to delete this customer?')) {
            try {
                await this.deleteData('customers', id);
                this.showToast('Customer deleted successfully', 'success');
                await this.loadCustomers();
                await this.updateDashboard();
            } catch (error) {
                console.error('Error deleting customer:', error);
                this.showToast('Failed to delete customer', 'error');
            }
        }
    }
}

// Initialize the application
const kiranaStore = new KiranaStore();
window.kiranaMgmt = kiranaStore; // Make it globally accessible

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    kiranaStore.init();
});

// Handle modal overlay clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        e.target.classList.add('hidden');
    }
});