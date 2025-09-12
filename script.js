// Family Finance Monitor JavaScript

class FamilyFinanceMonitor {
    constructor() {
        this.transactions = this.loadFromStorage('transactions') || [];
        this.children = this.loadFromStorage('children') || [];
        this.financialGoals = this.loadFromStorage('financialGoals') || [];
        this.userProfile = this.loadFromStorage('userProfile') || null;
        this.financialInsights = this.loadFromStorage('financialInsights') || [];
        this.alerts = this.loadFromStorage('alerts') || [];
        this.chatHistory = this.loadFromStorage('chatHistory') || [];
        this.spendingData = this.loadFromStorage('spendingData') || {};
        this.plaidData = this.loadFromStorage('plaidData') || {};
        this.settings = this.loadFromStorage('settings') || {
            userName: 'Sarah',
            userEmail: 'sarah@universityfinance.com',
            subscriptionPlan: 'University Plan',
            maxStudents: 4
        };
        this.currentTab = 'dashboard';
        this.isLoggedIn = this.loadFromStorage('isLoggedIn') || false;
        this.geminiApiKey = 'AIzaSyAwbRCVz2xuBJ4lu5wATsaaqMzF9EJfNmo';
        this.aiInsights = [];
        this.chatHistory = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCurrentDate();
        
        if (this.isLoggedIn && this.userProfile) {
            this.renderDashboard();
            this.renderChildren();
            this.renderTransactions();
            this.renderFinancialGoals();
            this.renderSubscriptionPlans();
            this.generateRealAlerts();
            this.generateDynamicInsights();
            this.generatePlaidData();
            this.generateAIInsights();
            this.setupAIChat();
            this.updateSummaryCards();
            this.updateWelcomeMessage();
        } else {
            this.showLoginScreen();
        }
    }

    generateParentProfile() {
        return {
            name: "Sarah",
            email: "sarah@universityfinance.com",
            phone: "+1-555-SARAH",
            address: "123 University Avenue, Campus City, CA",
            subscriptionPlan: "University Plan",
            maxStudents: 4,
            currentStudents: 3,
            totalCampusSpending: 1247.50,
            monthlyBudget: 3000,
            savingsGoal: 5000,
            currentSavings: 2847.50
        };
    }

    generateChildrenData() {
        return [
            {
                id: 1,
                name: "Alex",
                age: 20,
                year: "Junior",
                major: "Computer Science",
                bankAccount: "Chase Student Account",
                currentBalance: 847.50,
                monthlyAllowance: 800,
                spendingThisMonth: 456.75,
                lastTransaction: "2 hours ago",
                goals: [
                    { name: "Study abroad fund", target: 5000, current: 2847.50, deadline: "2024-06-15" },
                    { name: "Gaming setup", target: 1200, current: 450, deadline: "2024-03-30" }
                ],
                recentTransactions: [
                    { description: "Campus Dining Hall", amount: -12.50, date: "2024-01-15", category: "Food & Dining" },
                    { description: "Textbook purchase", amount: -89.99, date: "2024-01-14", category: "Education" },
                    { description: "Student loan disbursement", amount: 800.00, date: "2024-01-01", category: "Income" }
                ]
            },
            {
                id: 2,
                name: "Emma",
                age: 19,
                year: "Sophomore",
                major: "Art History",
                bankAccount: "Wells Fargo Student Account",
                currentBalance: 623.25,
                monthlyAllowance: 600,
                spendingThisMonth: 289.50,
                lastTransaction: "1 day ago",
                goals: [
                    { name: "Art supplies", target: 800, current: 320, deadline: "2024-05-20" },
                    { name: "Museum trip", target: 200, current: 80, deadline: "2024-02-28" }
                ],
                recentTransactions: [
                    { description: "Campus Bookstore", amount: -45.75, date: "2024-01-14", category: "Education" },
                    { description: "Spotify Student", amount: -4.99, date: "2024-01-10", category: "Entertainment" },
                    { description: "Student loan disbursement", amount: 600.00, date: "2024-01-01", category: "Income" }
                ]
            },
            {
                id: 3,
                name: "Jake",
                age: 18,
                year: "Freshman",
                major: "Engineering",
                bankAccount: "Bank of America Student Account",
                currentBalance: 445.80,
                monthlyAllowance: 500,
                spendingThisMonth: 245.25,
                lastTransaction: "3 days ago",
                goals: [
                    { name: "Engineering calculator", target: 400, current: 180, deadline: "2024-04-10" },
                    { name: "Lab equipment", target: 300, current: 80, deadline: "2024-04-15" }
                ],
                recentTransactions: [
                    { description: "Campus Recreation Center", amount: -15.00, date: "2024-01-12", category: "Health & Wellness" },
                    { description: "Campus Dining", amount: -8.50, date: "2024-01-11", category: "Food & Dining" },
                    { description: "Student loan disbursement", amount: 500.00, date: "2024-01-01", category: "Income" }
                ]
            }
        ];
    }

    generatePlaidData() {
        const plaidTransactions = [];
        const children = this.children;
        const merchants = [
            "Campus Dining Hall", "University Bookstore", "Campus Recreation Center", "Student Union", "Campus Coffee Shop", "Textbook Store", "Campus Parking", "Student Health Center", "Campus Laundry", "Campus Vending", "Spotify Student", "Netflix Student", "Campus Library", "Campus Print Shop", "Student Activities", "Campus Transportation", "Campus Housing", "Student ID Office", "Campus ATM", "Campus Post Office"
        ];
        
        const categories = {
            "Campus Dining Hall": "Food & Dining",
            "University Bookstore": "Education",
            "Campus Recreation Center": "Health & Wellness",
            "Student Union": "Entertainment",
            "Campus Coffee Shop": "Food & Dining",
            "Textbook Store": "Education",
            "Campus Parking": "Transportation",
            "Student Health Center": "Health & Wellness",
            "Campus Laundry": "Personal Care",
            "Campus Vending": "Food & Dining",
            "Spotify Student": "Entertainment",
            "Netflix Student": "Entertainment",
            "Campus Library": "Education",
            "Campus Print Shop": "Education",
            "Student Activities": "Entertainment",
            "Campus Transportation": "Transportation",
            "Campus Housing": "Housing",
            "Student ID Office": "Administrative",
            "Campus ATM": "Banking",
            "Campus Post Office": "Administrative"
        };

        // Generate transactions for the last 30 days
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            children.forEach(child => {
                // Generate 0-3 transactions per day per child
                const numTransactions = Math.floor(Math.random() * 4);
                
                for (let j = 0; j < numTransactions; j++) {
                    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
                    const amount = -(Math.random() * 50 + 5).toFixed(2);
                    const category = categories[merchant] || "Other";
                    
                    plaidTransactions.push({
                        id: `plaid_${Date.now()}_${Math.random()}`,
                        childId: child.id,
                        childName: child.name,
                        accountId: child.bankAccount,
                        merchant: merchant,
                        amount: parseFloat(amount),
                        category: category,
                        date: date.toISOString().split('T')[0],
                        timestamp: date.toISOString(),
                        accountType: "checking",
                        transactionType: "debit",
                        pending: Math.random() > 0.9
                    });
                }
            });
        }

        this.plaidData = {
            transactions: plaidTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
            lastSync: new Date().toISOString(),
            connectedAccounts: children.map(child => ({
                id: child.id,
                name: child.name,
                accountId: child.bankAccount,
                balance: child.currentBalance,
                accountType: "checking"
            }))
        };

        this.saveToStorage('plaidData', this.plaidData);
        this.saveToStorage('children', this.children);
    }

    calculateFinancialHealthScore(budgetData) {
        const income = budgetData.monthlyIncome;
        const expenses = budgetData.totalMonthlyExpenses;
        const balance = income - expenses;
        
        let score = 50;
        
        // Balance ratio (40% of score)
        if (balance > 0) {
            const balanceRatio = Math.min(balance / income, 0.3);
            score += balanceRatio * 40;
        } else {
            const deficitRatio = Math.abs(balance) / income;
            score -= Math.min(deficitRatio * 40, 40);
        }
        
        // Emergency fund (20% of score)
        if (balance > 500) {
            score += 20;
        } else if (balance > 200) {
            score += 10;
        }
        
        // Spending efficiency (20% of score)
        const essentialSpending = budgetData.rent + budgetData.food + budgetData.monthlyTuition;
        if (essentialSpending / income < 0.7) {
            score += 20;
        } else if (essentialSpending / income < 0.8) {
            score += 10;
        }
        
        return Math.max(0, Math.min(100, Math.round(score)));
    }

    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.switchTab(e.currentTarget.dataset.tab);
            });
        });

        // Transaction form
        document.getElementById('transactionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });

        // Budget form
        document.getElementById('budgetForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBudget();
        });

        // Budget modal
        document.getElementById('addBudgetBtn').addEventListener('click', () => {
            this.openBudgetModal();
        });

        document.getElementById('closeBudgetModal').addEventListener('click', () => {
            this.closeBudgetModal();
        });

        // Filter transactions
        document.getElementById('transactionFilter').addEventListener('change', (e) => {
            this.filterTransactions(e.target.value);
        });

        // Close modal when clicking outside
        document.getElementById('budgetModal').addEventListener('click', (e) => {
            if (e.target.id === 'budgetModal') {
                this.closeBudgetModal();
            }
        });

        // Login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                this.loginAsParent();
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }

        // AI Chat functionality
        const sendMessageBtn = document.getElementById('sendMessage');
        const chatInput = document.getElementById('chatInput');
        
        if (sendMessageBtn && chatInput) {
            sendMessageBtn.addEventListener('click', () => {
                this.sendAIMessage();
            });
            
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendAIMessage();
                }
            });
        }
        
        // Add event listener for time filter
        const timeFilter = document.querySelector('.time-filter');
        if (timeFilter) {
            timeFilter.addEventListener('change', () => {
                this.updateSpendingChart();
            });
        }
        
        // Add event listeners for notifications and profile
        const notificationBell = document.getElementById('notificationBell');
        const profilePic = document.getElementById('profilePic');
        
        if (notificationBell) {
            notificationBell.addEventListener('click', () => {
                this.switchTab('alerts');
            });
        }
        
        if (profilePic) {
            profilePic.addEventListener('click', () => {
                this.showProfileDropdown();
            });
        }
    }

    showLoginScreen() {
        document.body.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <div class="logo">
                        <div class="logo-icon"></div>
                        <span>Spendly</span>
                    </div>
                </div>
                
                <div class="hero">
                    <h1>AI-Powered Student Finance</h1>
                    <h2>Your intelligent financial companion</h2>
                    <p>Take control of your finances with AI-driven insights, smart budgeting, and personalized recommendations designed specifically for students.</p>
                    <button class="cta-btn" id="loginBtn">🚀 Login as Alex</button>
                    
                    <div class="features">
                        <div class="feature">
                            <div class="feature-icon">🤖</div>
                            <h3>AI Analysis</h3>
                            <p>Get personalized financial insights and recommendations powered by advanced AI.</p>
                        </div>
                        <div class="feature">
                            <div class="feature-icon">📊</div>
                            <h3>Smart Budgeting</h3>
                            <p>Track expenses, set goals, and optimize your spending with intelligent tools.</p>
                        </div>
                        <div class="feature">
                            <div class="feature-icon">💬</div>
                            <h3>AI Chat</h3>
                            <p>Chat with your AI financial advisor for instant help and guidance.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Re-setup event listeners for login
        document.getElementById('loginBtn').addEventListener('click', () => {
            this.loginAsParent();
        });
    }

    loginAsParent() {
        // Generate parent profile
        this.userProfile = this.generateParentProfile();
        this.children = this.generateChildrenData();
        this.isLoggedIn = true;
        
        // Generate sample data
        this.generateSampleData();
        
        // Save to storage
        this.saveToStorage('userProfile', this.userProfile);
        this.saveToStorage('children', this.children);
        this.saveToStorage('isLoggedIn', this.isLoggedIn);
        this.saveToStorage('transactions', this.transactions);
        this.saveToStorage('financialGoals', this.financialGoals);
        this.saveToStorage('alerts', this.alerts);
        this.saveToStorage('chatHistory', this.chatHistory);
        
        // Reload the app
        location.reload();
    }

    generateSampleData() {
        // Generate sample transactions
        const sampleTransactions = [
            {
                id: 1,
                type: 'income',
                amount: 1800,
                description: 'Part-time job salary',
                category: 'other',
                date: new Date().toISOString().split('T')[0],
                timestamp: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 2,
                type: 'expense',
                amount: -50,
                description: 'Grocery shopping',
                category: 'food',
                date: new Date().toISOString().split('T')[0],
                timestamp: new Date(Date.now() - 172800000).toISOString()
            },
            {
                id: 3,
                type: 'expense',
                amount: -25,
                description: 'Bus pass',
                category: 'transportation',
                date: new Date().toISOString().split('T')[0],
                timestamp: new Date(Date.now() - 259200000).toISOString()
            },
            {
                id: 4,
                type: 'expense',
                amount: -1200,
                description: 'Monthly rent',
                category: 'housing',
                date: new Date().toISOString().split('T')[0],
                timestamp: new Date(Date.now() - 345600000).toISOString()
            },
            {
                id: 5,
                type: 'expense',
                amount: -800,
                description: 'Tuition payment',
                category: 'education',
                date: new Date().toISOString().split('T')[0],
                timestamp: new Date(Date.now() - 432000000).toISOString()
            },
            {
                id: 6,
                type: 'expense',
                amount: -15,
                description: 'Coffee with friends',
                category: 'entertainment',
                date: new Date().toISOString().split('T')[0],
                timestamp: new Date(Date.now() - 518400000).toISOString()
            }
        ];
        
        this.transactions = sampleTransactions;
        
        // Generate sample budgets
        const sampleBudgets = [
            {
                id: 1,
                category: 'food',
                amount: 400,
                period: 'monthly',
                spent: 0,
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                category: 'transportation',
                amount: 150,
                period: 'monthly',
                spent: 0,
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                category: 'entertainment',
                amount: 300,
                period: 'monthly',
                spent: 0,
                createdAt: new Date().toISOString()
            }
        ];
        
        this.budgets = sampleBudgets;
        
        // Generate financial goals
        const sampleGoals = [
            {
                id: 1,
                name: 'Emergency Fund',
                targetAmount: 2000,
                timelineMonths: 6,
                monthlySavingsNeeded: 333.33,
                priority: 'High',
                createdDate: new Date().toISOString(),
                progress: 25,
                amountSaved: 500
            },
            {
                id: 2,
                name: 'Spring Break Trip',
                targetAmount: 800,
                timelineMonths: 4,
                monthlySavingsNeeded: 200,
                priority: 'Medium',
                createdDate: new Date().toISOString(),
                progress: 10,
                amountSaved: 80
            },
            {
                id: 3,
                name: 'New Laptop',
                targetAmount: 1200,
                timelineMonths: 8,
                monthlySavingsNeeded: 150,
                priority: 'High',
                createdDate: new Date().toISOString(),
                progress: 5,
                amountSaved: 60
            }
        ];
        
        this.financialGoals = sampleGoals;
        
        // Generate financial insights data
        const sampleInsights = [
            {
                id: 1,
                type: "trend",
                title: "Spending Trend Analysis",
                description: "Your food expenses have increased by 15% this month compared to last month",
                value: "+15%",
                trend: "up",
                category: "food"
            },
            {
                id: 2,
                type: "prediction",
                title: "Next Month Prediction",
                description: "Based on current spending patterns, you'll likely spend $2,450 next month",
                value: "$2,450",
                confidence: "85%",
                category: "overall"
            },
            {
                id: 3,
                type: "recommendation",
                title: "Savings Opportunity",
                description: "You could save $200/month by cooking at home 3 more times per week",
                value: "$200",
                impact: "high",
                category: "food"
            },
            {
                id: 4,
                type: "alert",
                title: "Budget Warning",
                description: "You're on track to exceed your entertainment budget by $50 this month",
                value: "$50",
                severity: "medium",
                category: "entertainment"
            }
        ];
        
        this.financialInsights = sampleInsights;
        
        // Generate campus savings data (keeping for now but will be replaced)
        const sampleCampusSavings = [
            {
                id: 1,
                name: "Student Union Café",
                category: "Food",
                originalPrice: 4.00,
                studentPrice: 2.50,
                savings: 1.50,
                description: "Coffee from $2.50",
                tip: "Save $1.50 vs Starbucks",
                tag: "Cheapest",
                tagColor: "green",
                icon: "☕"
            },
            {
                id: 2,
                name: "Library Vending",
                category: "Snacks",
                originalPrice: 2.00,
                studentPrice: 1.25,
                savings: 0.75,
                description: "Snacks from $1.25",
                tip: "Save $0.75 vs convenience store",
                tag: "24/7",
                tagColor: "blue",
                icon: "🍪"
            },
            {
                id: 3,
                name: "Dining Hall",
                category: "Meals",
                originalPrice: 12.00,
                studentPrice: 8.50,
                savings: 3.50,
                description: "Lunch from $8.50",
                tip: "Use your meal credits",
                tag: "Meal Plan",
                tagColor: "orange",
                icon: "🍽️"
            },
            {
                id: 4,
                name: "Campus Store",
                category: "Supplies",
                originalPrice: 100.00,
                studentPrice: 85.00,
                savings: 15.00,
                description: "Supplies 15% off",
                tip: "Show student ID",
                tag: "Student Discount",
                tagColor: "purple",
                icon: "📚"
            },
            {
                id: 5,
                name: "Gym Membership",
                category: "Fitness",
                originalPrice: 50.00,
                studentPrice: 30.00,
                savings: 20.00,
                description: "Monthly gym access",
                tip: "Save $20/month",
                tag: "Student Rate",
                tagColor: "green",
                icon: "💪"
            },
            {
                id: 6,
                name: "Campus Parking",
                category: "Transportation",
                originalPrice: 8.00,
                studentPrice: 5.00,
                savings: 3.00,
                description: "Daily parking $5",
                tip: "Save $3/day vs visitor rate",
                tag: "Student Rate",
                tagColor: "blue",
                icon: "🚗"
            }
        ];
        
        this.campusSavings = sampleCampusSavings;
        
        // Generate alerts data
        const sampleAlerts = [
            {
                id: 1,
                type: "warning",
                title: "Tuition Payment Due",
                message: "Your spring tuition payment of $1,250 is due in 12 days",
                time: "2 hours ago",
                icon: "⚠️",
                priority: "high"
            },
            {
                id: 2,
                type: "success",
                title: "Budget Success",
                message: "You're $15 under budget this week. Keep it up!",
                time: "1 day ago",
                icon: "✅",
                priority: "medium"
            },
            {
                id: 3,
                type: "info",
                title: "Campus Savings Tip",
                message: "Campus cafeteria has 20% off meals after 2 PM today",
                time: "3 hours ago",
                icon: "💡",
                priority: "low"
            },
            {
                id: 4,
                type: "warning",
                title: "Daily Budget Alert",
                message: "You've used 80% of your daily budget. $9 remaining today",
                time: "5 hours ago",
                icon: "💰",
                priority: "medium"
            },
            {
                id: 5,
                type: "success",
                title: "Savings Milestone",
                message: "Congratulations! You've saved $500 this month",
                time: "2 days ago",
                icon: "🎉",
                priority: "high"
            },
            {
                id: 6,
                type: "info",
                title: "New Campus Discount",
                message: "Student discount available at campus gym - save $20/month",
                time: "1 week ago",
                icon: "🏋️",
                priority: "low"
            }
        ];
        
        this.alerts = sampleAlerts;
    }

    logout() {
        this.isLoggedIn = false;
        this.userProfile = null;
        this.transactions = [];
        this.budgets = [];
        this.financialGoals = [];
        this.campusSavings = [];
        this.alerts = [];
        this.chatHistory = [];
        
        this.saveToStorage('isLoggedIn', false);
        this.saveToStorage('userProfile', null);
        this.saveToStorage('transactions', []);
        this.saveToStorage('budgets', []);
        this.saveToStorage('financialGoals', []);
        this.saveToStorage('campusSavings', []);
        this.saveToStorage('alerts', []);
        this.saveToStorage('chatHistory', []);
        
        this.showLoginScreen();
    }

    switchTab(tabName) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;

        // Refresh data when switching tabs
        if (tabName === 'dashboard') {
            this.renderDashboard();
                } else if (tabName === 'students') {
                    this.renderChildren();
        } else if (tabName === 'transactions') {
            this.renderTransactions();
        } else if (tabName === 'goals') {
            this.renderFinancialGoals();
        } else if (tabName === 'ai-coach') {
            this.renderAICoach();
        } else if (tabName === 'subscription') {
            this.renderSubscriptionPlans();
        } else if (tabName === 'alerts') {
            this.renderAlerts();
        } else if (tabName === 'settings') {
            this.renderSettings();
        }
    }

    renderFinancialGoals() {
        const goalsList = document.getElementById('goalsList');
        if (!goalsList) return;
        
        if (this.financialGoals.length === 0) {
            goalsList.innerHTML = '<p class="no-data">No financial goals set</p>';
            return;
        }

        goalsList.innerHTML = this.financialGoals.map(goal => `
            <div class="goal-item">
                <div class="goal-info">
                    <div class="goal-header">
                        <h4 class="goal-name">${goal.name}</h4>
                        <span class="goal-priority priority-${goal.priority.toLowerCase()}">${goal.priority}</span>
                    </div>
                    <div class="goal-amount">${this.formatCurrency(goal.amountSaved)} / ${this.formatCurrency(goal.targetAmount)}</div>
                    <div class="goal-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${goal.progress}%;"></div>
                        </div>
                        <span class="progress-text">${goal.progress}% complete</span>
                    </div>
                    <div class="goal-timeline">Target: ${goal.timelineMonths} months • ${this.formatCurrency(goal.monthlySavingsNeeded)}/month needed</div>
                </div>
                <div class="goal-actions">
                    <button class="btn btn-secondary" onclick="familyFinanceMonitor.deleteGoal(${goal.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    deleteGoal(goalId) {
        if (confirm('Are you sure you want to delete this goal?')) {
            this.financialGoals = this.financialGoals.filter(g => g.id !== goalId);
            this.saveToStorage('financialGoals', this.financialGoals);
            this.renderFinancialGoals();
            this.showNotification('Goal deleted successfully!', 'success');
        }
    }

    generateSpendingData() {
        // Generate realistic spending data for different time periods
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        // Generate data for the last 12 months
        const monthlyData = {};
        const categories = ['food', 'transport', 'books', 'entertainment', 'personal', 'other'];
        
        for (let i = 11; i >= 0; i--) {
            const date = new Date(currentYear, currentMonth - i, 1);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            monthlyData[monthKey] = {};
            categories.forEach(category => {
                // Generate realistic spending with some variation
                const baseAmount = this.getBaseAmountForCategory(category);
                const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
                monthlyData[monthKey][category] = Math.round(baseAmount * (1 + variation));
            });
        }
        
        // Generate weekly data for current month
        const weeklyData = {};
        const weeksInMonth = Math.ceil(now.getDate() / 7);
        
        for (let week = 1; week <= weeksInMonth; week++) {
            weeklyData[`Week ${week}`] = {};
            categories.forEach(category => {
                const baseAmount = this.getBaseAmountForCategory(category) / 4; // Weekly amount
                const variation = (Math.random() - 0.5) * 0.4; // ±20% variation
                weeklyData[`Week ${week}`][category] = Math.round(baseAmount * (1 + variation));
            });
        }
        
        this.spendingData = {
            monthly: monthlyData,
            weekly: weeklyData,
            categories: categories
        };
        
        this.saveToStorage('spendingData', this.spendingData);
        this.updateSpendingChart();
    }
    
    getBaseAmountForCategory(category) {
        const baseAmounts = {
            'food': 400,
            'transport': 150,
            'books': 200,
            'entertainment': 300,
            'personal': 250,
            'other': 100
        };
        return baseAmounts[category] || 100;
    }
    
    updateSpendingChart() {
        const timeFilter = document.querySelector('.time-filter');
        if (!timeFilter) return;
        
        const selectedPeriod = timeFilter.value;
        const chartBars = document.querySelectorAll('.bar');
        const chartLabels = document.querySelectorAll('.chart-labels span');
        
        if (selectedPeriod === 'This Month') {
            this.updateChartWithWeeklyData();
        } else if (selectedPeriod === 'This Week') {
            this.updateChartWithDailyData();
        } else if (selectedPeriod === 'This Year') {
            this.updateChartWithMonthlyData();
        }
    }
    
    updateChartWithWeeklyData() {
        const chartBars = document.querySelectorAll('.bar');
        const weeklyData = this.spendingData.weekly;
        const weeks = Object.keys(weeklyData);
        
        chartBars.forEach((bar, index) => {
            if (index < weeks.length) {
                const weekData = weeklyData[weeks[index]];
                const total = Object.values(weekData).reduce((sum, val) => sum + val, 0);
                const percentage = Math.min((total / 500) * 100, 100); // Scale to max 500
                bar.style.height = `${percentage}%`;
            }
        });
    }
    
    updateChartWithDailyData() {
        // Generate daily data for current week
        const dailyData = {
            'Monday': { food: 45, transport: 12, books: 0, entertainment: 25, personal: 15, other: 8 },
            'Tuesday': { food: 38, transport: 15, books: 0, entertainment: 0, personal: 22, other: 5 },
            'Wednesday': { food: 52, transport: 12, books: 0, entertainment: 30, personal: 18, other: 12 },
            'Thursday': { food: 41, transport: 18, books: 0, entertainment: 15, personal: 25, other: 7 },
            'Friday': { food: 48, transport: 20, books: 0, entertainment: 45, personal: 30, other: 15 },
            'Saturday': { food: 65, transport: 25, books: 0, entertainment: 80, personal: 40, other: 20 },
            'Sunday': { food: 35, transport: 10, books: 0, entertainment: 20, personal: 15, other: 5 }
        };
        
        const chartBars = document.querySelectorAll('.bar');
        const days = Object.keys(dailyData);
        
        chartBars.forEach((bar, index) => {
            if (index < days.length) {
                const dayData = dailyData[days[index]];
                const total = Object.values(dayData).reduce((sum, val) => sum + val, 0);
                const percentage = Math.min((total / 100) * 100, 100); // Scale to max 100
                bar.style.height = `${percentage}%`;
            }
        });
    }
    
    updateChartWithMonthlyData() {
        const chartBars = document.querySelectorAll('.bar');
        const monthlyData = this.spendingData.monthly;
        const months = Object.keys(monthlyData);
        
        chartBars.forEach((bar, index) => {
            if (index < months.length) {
                const monthData = monthlyData[months[index]];
                const total = Object.values(monthData).reduce((sum, val) => sum + val, 0);
                const percentage = Math.min((total / 2000) * 100, 100); // Scale to max 2000
                bar.style.height = `${percentage}%`;
            }
        });
    }

    renderFinancialInsights() {
        const insightsContainer = document.getElementById('insightsContainer');
        if (!insightsContainer) return;
        
        if (this.financialInsights.length === 0) {
            insightsContainer.innerHTML = '<p class="no-data">No insights available</p>';
            return;
        }

        insightsContainer.innerHTML = this.financialInsights.map(insight => `
            <div class="insight-card ${insight.type}">
                <div class="insight-header">
                    <div class="insight-icon">
                        <i class="fas fa-${this.getInsightIcon(insight.type)}"></i>
                    </div>
                    <div class="insight-title">${insight.title}</div>
                    <div class="insight-value ${insight.trend || insight.impact || insight.severity || ''}">${insight.value}</div>
                </div>
                <div class="insight-description">${insight.description}</div>
                <div class="insight-meta">
                    <span class="insight-category">${insight.category}</span>
                    ${insight.confidence ? `<span class="confidence">${insight.confidence} confidence</span>` : ''}
                </div>
            </div>
        `).join('');
    }
    
    getInsightIcon(type) {
        const icons = {
            'trend': 'chart-line',
            'prediction': 'crystal-ball',
            'recommendation': 'lightbulb',
            'alert': 'exclamation-triangle'
        };
        return icons[type] || 'info-circle';
    }
    
    // Settings functionality
    renderSettings() {
        // Populate settings form with current values
        document.getElementById('schoolAccount').value = this.settings.schoolAccount;
        document.getElementById('tuitionOwed').value = this.settings.tuitionOwed;
        document.getElementById('dailyBudget').value = this.settings.dailyBudget;
        document.getElementById('moneySaved').value = this.settings.moneySaved;
        document.getElementById('userName').value = this.settings.userName;
        document.getElementById('userEmail').value = this.settings.userEmail;
        document.getElementById('userUniversity').value = this.settings.userUniversity;
    }
    
    saveSettings() {
        // Get values from form
        this.settings.schoolAccount = parseFloat(document.getElementById('schoolAccount').value) || 0;
        this.settings.tuitionOwed = parseFloat(document.getElementById('tuitionOwed').value) || 0;
        this.settings.dailyBudget = parseFloat(document.getElementById('dailyBudget').value) || 0;
        this.settings.moneySaved = parseFloat(document.getElementById('moneySaved').value) || 0;
        this.settings.userName = document.getElementById('userName').value || 'Alex';
        this.settings.userEmail = document.getElementById('userEmail').value || 'alex@university.edu';
        this.settings.userUniversity = document.getElementById('userUniversity').value || 'State University';
        
        // Save to storage
        this.saveToStorage('settings', this.settings);
        
        // Update dashboard
        this.updateSummaryCards();
        this.updateWelcomeMessage();
        
        this.showNotification('Settings saved successfully!', 'success');
    }
    
    updateSummaryCards() {
        // Update summary cards with new values
        const schoolAccountEl = document.querySelector('.summary-card:nth-child(1) .summary-value');
        const tuitionEl = document.querySelector('.summary-card:nth-child(2) .summary-value');
        const dailyBudgetEl = document.querySelector('.summary-card:nth-child(3) .summary-value');
        const savingsEl = document.querySelector('.summary-card:nth-child(4) .summary-value');
        
        if (schoolAccountEl) schoolAccountEl.textContent = `$${this.settings.schoolAccount.toLocaleString()}`;
        if (tuitionEl) tuitionEl.textContent = `$${this.settings.tuitionOwed.toLocaleString()}`;
        if (dailyBudgetEl) dailyBudgetEl.textContent = `$${this.settings.dailyBudget}`;
        if (savingsEl) savingsEl.textContent = `$${this.settings.moneySaved}`;
    }
    
    updateWelcomeMessage() {
        const welcomeEl = document.querySelector('.welcome-section h1');
        if (welcomeEl) {
            welcomeEl.textContent = `Welcome back, ${this.settings.userName}!`;
        }
    }
    
    showProfileDropdown() {
        // Create dropdown menu
        const dropdown = document.createElement('div');
        dropdown.className = 'profile-dropdown';
        dropdown.innerHTML = `
            <div class="dropdown-item" onclick="familyFinanceMonitor.switchTab('settings')">
                <i class="fas fa-cog"></i> Settings
            </div>
            <div class="dropdown-item" onclick="familyFinanceMonitor.switchTab('goals')">
                <i class="fas fa-bullseye"></i> Goals
            </div>
            <div class="dropdown-item" onclick="familyFinanceMonitor.logout()">
                <i class="fas fa-sign-out-alt"></i> Logout
            </div>
        `;
        
        // Position dropdown
        const profilePic = document.getElementById('profilePic');
        const rect = profilePic.getBoundingClientRect();
        dropdown.style.position = 'absolute';
        dropdown.style.top = (rect.bottom + 5) + 'px';
        dropdown.style.right = '20px';
        dropdown.style.zIndex = '1000';
        
        // Remove existing dropdown
        const existing = document.querySelector('.profile-dropdown');
        if (existing) existing.remove();
        
        // Add to page
        document.body.appendChild(dropdown);
        
        // Close on click outside
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!dropdown.contains(e.target) && e.target !== profilePic) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 0);
    }
    
    // Enhanced budget functionality with delete
    deleteBudget(budgetId) {
        if (confirm('Are you sure you want to delete this budget?')) {
            this.budgets = this.budgets.filter(budget => budget.id !== budgetId);
            this.saveToStorage('budgets', this.budgets);
            this.renderBudgets();
            this.showNotification('Budget deleted successfully!', 'success');
        }
    }
    
    // Enhanced transaction functionality with delete
    deleteTransaction(transactionId) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            this.transactions = this.transactions.filter(transaction => transaction.id !== transactionId);
            this.saveToStorage('transactions', this.transactions);
            this.renderTransactions();
            this.updateBalance();
            this.showNotification('Transaction deleted successfully!', 'success');
        }
    }
    
    // Enhanced alerts with real data
    generateRealAlerts() {
        const alerts = [];
        
        // Budget alerts
        this.budgets.forEach(budget => {
            const spent = this.transactions
                .filter(t => t.category === budget.category && t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);
            const percentage = (spent / budget.amount) * 100;
            
            if (percentage >= 90) {
                alerts.push({
                    id: `budget-${budget.id}`,
                    type: 'warning',
                    title: 'Budget Alert',
                    message: `You've spent ${percentage.toFixed(0)}% of your ${budget.category} budget ($${spent.toFixed(2)} of $${budget.amount})`,
                    time: '2 hours ago',
                    category: budget.category
                });
            }
        });
        
        // Savings goal alerts
        this.financialGoals.forEach(goal => {
            const progress = (goal.amountSaved / goal.targetAmount) * 100;
            if (progress >= 80 && progress < 100) {
                alerts.push({
                    id: `goal-${goal.id}`,
                    type: 'success',
                    title: 'Goal Progress',
                    message: `You're ${progress.toFixed(0)}% towards your ${goal.name} goal!`,
                    time: '1 day ago',
                    category: 'goals'
                });
            }
        });
        
        // Low balance alert
        if (this.settings.schoolAccount < 500) {
            alerts.push({
                id: 'low-balance',
                type: 'danger',
                title: 'Low Balance',
                message: `Your school account balance is low: $${this.settings.schoolAccount}`,
                time: '3 hours ago',
                category: 'account'
            });
        }
        
        this.alerts = alerts;
        this.saveToStorage('alerts', this.alerts);
        this.updateNotificationBadge();
    }
    
    updateNotificationBadge() {
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            badge.textContent = this.alerts.length;
            badge.style.display = this.alerts.length > 0 ? 'block' : 'none';
        }
    }
    
    // Dynamic insights based on actual data
    generateDynamicInsights() {
        const insights = [];
        
        // Calculate actual spending trends
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const thisMonthTransactions = this.transactions.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        });
        
        const lastMonthTransactions = this.transactions.filter(t => {
            const date = new Date(t.date);
            const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;
            return date.getMonth() === lastMonth && date.getFullYear() === lastYear;
        });
        
        // Food spending analysis
        const thisMonthFood = thisMonthTransactions
            .filter(t => t.category === 'food' && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const lastMonthFood = lastMonthTransactions
            .filter(t => t.category === 'food' && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        
        if (lastMonthFood > 0) {
            const change = ((thisMonthFood - lastMonthFood) / lastMonthFood) * 100;
            insights.push({
                id: 1,
                type: 'trend',
                title: 'Food Spending Trend',
                description: `Your food expenses have ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change).toFixed(0)}% this month`,
                value: change > 0 ? `+${change.toFixed(0)}%` : `${change.toFixed(0)}%`,
                trend: change > 0 ? 'up' : 'down',
                category: 'food'
            });
        }
        
        // Budget performance
        this.budgets.forEach(budget => {
            const spent = thisMonthTransactions
                .filter(t => t.category === budget.category && t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);
            const remaining = budget.amount - spent;
            
            if (remaining < 0) {
                insights.push({
                    id: `budget-${budget.id}`,
                    type: 'alert',
                    title: 'Budget Exceeded',
                    description: `You've exceeded your ${budget.category} budget by $${Math.abs(remaining).toFixed(2)}`,
                    value: `$${Math.abs(remaining).toFixed(2)}`,
                    severity: 'high',
                    category: budget.category
                });
            }
        });
        
        this.financialInsights = insights;
        this.saveToStorage('financialInsights', this.financialInsights);
    }

    renderAlerts() {
        const alertsContainer = document.getElementById('alertsList');
        if (!alertsContainer) return;
        
        if (this.alerts.length === 0) {
            alertsContainer.innerHTML = '<p class="no-data">No alerts available</p>';
            return;
        }

        alertsContainer.innerHTML = this.alerts.map(alert => `
            <div class="alert-item ${alert.type}">
                <div class="alert-icon">${alert.icon}</div>
                <div class="alert-content">
                    <div class="alert-text">${alert.title}</div>
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-time">${alert.time}</div>
                </div>
                <div class="alert-actions">
                    <button class="btn btn-sm btn-secondary" onclick="familyFinanceMonitor.markAlertRead(${alert.id})">
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderAICoach() {
        // AI Coach is already rendered in HTML, just ensure chat history is loaded
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        // Load chat history
        this.chatHistory.forEach(message => {
            this.addMessageToChat(message.text, message.sender);
        });
        
        // Render AI analysis cards
        this.renderAIAnalysis();
    }
    
    renderAIAnalysis() {
        // Spending Trends Analysis
        const spendingTrends = document.getElementById('spendingTrends');
        if (spendingTrends) {
            const trends = this.generateSpendingTrends();
            spendingTrends.innerHTML = `
                <div class="trend-item">
                    <span class="trend-label">Food Spending</span>
                    <span class="trend-value up">+12%</span>
                </div>
                <div class="trend-item">
                    <span class="trend-label">Entertainment</span>
                    <span class="trend-value down">-8%</span>
                </div>
                <div class="trend-item">
                    <span class="trend-label">Transportation</span>
                    <span class="trend-value stable">+2%</span>
                </div>
            `;
        }
        
        // Predictions
        const predictions = document.getElementById('predictions');
        if (predictions) {
            predictions.innerHTML = `
                <div class="prediction-item">
                    <span class="prediction-label">Next Month Spending</span>
                    <span class="prediction-value">$2,450</span>
                    <span class="prediction-confidence">85% confidence</span>
                </div>
                <div class="prediction-item">
                    <span class="prediction-label">Budget Risk</span>
                    <span class="prediction-value warning">Medium</span>
                    <span class="prediction-confidence">Entertainment category</span>
                </div>
            `;
        }
        
        // Recommendations
        const recommendations = document.getElementById('recommendations');
        if (recommendations) {
            recommendations.innerHTML = `
                <div class="recommendation-item">
                    <i class="fas fa-utensils"></i>
                    <span>Cook at home 3x more to save $200/month</span>
                </div>
                <div class="recommendation-item">
                    <i class="fas fa-bus"></i>
                    <span>Use student transport pass to save $50/month</span>
                </div>
                <div class="recommendation-item">
                    <i class="fas fa-book"></i>
                    <span>Buy used textbooks to save $300/semester</span>
                </div>
            `;
        }
    }
    
    generateSpendingTrends() {
        // Generate realistic spending trends based on current data
        const trends = [];
        const categories = ['food', 'transport', 'books', 'entertainment', 'personal'];
        
        categories.forEach(category => {
            const change = (Math.random() - 0.5) * 30; // -15% to +15%
            const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
            trends.push({
                category,
                change: Math.abs(change).toFixed(0),
                direction
            });
        });
        
        return trends;
    }

    markAlertRead(alertId) {
        this.alerts = this.alerts.filter(alert => alert.id !== alertId);
        this.saveToStorage('alerts', this.alerts);
        this.renderAlerts();
        this.showNotification('Alert marked as read', 'success');
    }

    async sendAIMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Add user message to chat
        this.addMessageToChat(message, 'user');
        chatInput.value = '';
        
        // Add to chat history
        this.chatHistory.push({ text: message, sender: 'user' });
        
        // Show typing indicator
        this.addTypingIndicator();
        
        try {
            // Call Gemini API
            const aiResponse = await this.callGeminiAPI(message);
            this.removeTypingIndicator();
            this.addMessageToChat(aiResponse, 'ai');
            this.chatHistory.push({ text: aiResponse, sender: 'ai' });
        } catch (error) {
            this.removeTypingIndicator();
            this.addMessageToChat('Sorry, I encountered an error. Please try again.', 'ai');
            console.error('AI Error:', error);
        }
        
        this.saveToStorage('chatHistory', this.chatHistory);
    }

    addMessageToChat(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
                <div class="message-avatar user">
                    <i class="fas fa-user"></i>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${message}</p>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    addTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async callGeminiAPI(message) {
        const prompt = `You are an AI financial coach for college students. The user is Alex, a Computer Science junior at University of California with the following financial profile:
        
        - Monthly Income: $1,800
        - Current Balance: $2,847.50
        - Monthly Expenses: ~$2,300
        - Major expenses: Rent ($1,200), Food ($400), Transportation ($150), Entertainment ($300)
        - Tuition: $800/month
        - Financial Health Score: 72/100
        
        Recent spending includes: Starbucks, Campus Bookstore, Dining Hall
        
        Provide helpful, specific financial advice for college students. Keep responses concise (2-3 sentences) and actionable. Focus on budgeting, saving money, and student-specific financial tips.
        
        User question: ${message}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.geminiApiKey}`, {
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
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    addTransaction() {
        const type = document.getElementById('transactionType').value;
        const amount = parseFloat(document.getElementById('transactionAmount').value);
        const description = document.getElementById('transactionDescription').value;
        const category = document.getElementById('transactionCategory').value;
        const date = document.getElementById('transactionDate').value;

        if (!type || !amount || !description || !category || !date) {
            alert('Please fill in all fields');
            return;
        }

        const transaction = {
            id: Date.now(),
            type,
            amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
            description,
            category,
            date,
            timestamp: new Date().toISOString()
        };

        this.transactions.push(transaction);
        this.saveToStorage('transactions', this.transactions);

        // Reset form
        document.getElementById('transactionForm').reset();
        this.updateCurrentDate();

        // Update displays
        this.updateBalance();
        this.renderDashboard();
        this.renderTransactions();

        // Show success message
        this.showNotification('Transaction added successfully!', 'success');
    }

    addBudget() {
        const category = document.getElementById('budgetCategory').value;
        const amount = parseFloat(document.getElementById('budgetAmount').value);
        const period = document.getElementById('budgetPeriod').value;

        if (!category || !amount || !period) {
            alert('Please fill in all fields');
            return;
        }

        // Check if budget already exists for this category
        const existingBudget = this.budgets.find(b => b.category === category && b.period === period);
        if (existingBudget) {
            alert('A budget already exists for this category and period');
            return;
        }

        const budget = {
            id: Date.now(),
            category,
            amount,
            period,
            spent: 0,
            createdAt: new Date().toISOString()
        };

        this.budgets.push(budget);
        this.saveToStorage('budgets', this.budgets);

        // Reset form and close modal
        document.getElementById('budgetForm').reset();
        this.closeBudgetModal();

        // Update displays
        this.renderBudgets();
        this.renderDashboard();

        // Show success message
        this.showNotification('Budget created successfully!', 'success');
    }

    openBudgetModal() {
        document.getElementById('budgetModal').classList.add('active');
    }

    closeBudgetModal() {
        document.getElementById('budgetModal').classList.remove('active');
    }

    filterTransactions(filter) {
        const transactionsList = document.getElementById('transactionsList');
        const filteredTransactions = this.transactions.filter(transaction => {
            if (filter === 'all') return true;
            return transaction.type === filter;
        });

        this.renderTransactionList(filteredTransactions, transactionsList);
    }

    renderDashboard() {
        if (!this.userProfile) return;

        const currentMonth = new Date().toMonthYear();
        const monthlyTransactions = this.getMonthlyTransactions(currentMonth);

        const income = monthlyTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = monthlyTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        const savings = income - expenses;

        // Update header with Alex's info
        document.querySelector('.welcome-section h1').textContent = `Welcome back, ${this.userProfile.name}!`;
        document.getElementById('currentBalance').textContent = this.formatCurrency(this.userProfile.currentBalance);

        // Update dashboard stats
        document.getElementById('monthlyIncome').textContent = this.formatCurrency(income || this.userProfile.monthlyIncome);
        document.getElementById('monthlyExpenses').textContent = this.formatCurrency(expenses || this.userProfile.totalMonthlyExpenses);
        document.getElementById('monthlySavings').textContent = this.formatCurrency(savings || this.userProfile.monthlyBalance);

        // Update recent transactions
        this.renderRecentTransactions();

        // Update budget status
        this.renderBudgetStatus();

        // Add financial health score
        this.renderFinancialHealthScore();
    }

    renderFinancialHealthScore() {
        const healthScore = this.userProfile.financialHealthScore;
        const scoreColor = healthScore >= 80 ? '#28a745' : healthScore >= 60 ? '#ffc107' : '#dc3545';
        const scoreText = healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Needs Improvement';
        
        const healthScoreHTML = `
            <div class="card">
                <h3>Financial Health Score</h3>
                <div class="health-score">
                    <div class="score-circle" style="background: conic-gradient(${scoreColor} ${healthScore * 3.6}deg, #e9ecef 0deg);">
                        <div class="score-inner">
                            <span class="score-number">${healthScore}</span>
                            <span class="score-label">/100</span>
                        </div>
                    </div>
                    <div class="score-text">${scoreText}</div>
                </div>
            </div>
        `;
        
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (dashboardGrid && !document.querySelector('.health-score')) {
            dashboardGrid.insertAdjacentHTML('beforeend', healthScoreHTML);
        }
    }

    renderRecentTransactions() {
        const recentTransactions = document.getElementById('recentTransactions');
        const recent = this.transactions
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 5);

        if (recent.length === 0) {
            recentTransactions.innerHTML = '<p class="no-data">No transactions yet</p>';
            return;
        }

        recentTransactions.innerHTML = recent.map(transaction => `
            <div class="transaction-item">
                <div class="transaction-info">
                    <div class="transaction-description">${transaction.description}</div>
                    <div class="transaction-category">${transaction.category}</div>
                </div>
                <div class="transaction-amount ${transaction.type}">
                    ${this.formatCurrency(transaction.amount)}
                </div>
            </div>
        `).join('');
    }

    renderBudgetStatus() {
        const budgetStatus = document.getElementById('budgetStatus');
        const currentMonth = new Date().toMonthYear();
        const monthlyBudgets = this.budgets.filter(b => b.period === 'monthly');
        const monthlyTransactions = this.getMonthlyTransactions(currentMonth);

        if (monthlyBudgets.length === 0) {
            budgetStatus.innerHTML = '<p class="no-data">No budgets set</p>';
            return;
        }

        budgetStatus.innerHTML = monthlyBudgets.map(budget => {
            const spent = monthlyTransactions
                .filter(t => t.category === budget.category && t.type === 'expense')
                .reduce((sum, t) => sum + Math.abs(t.amount), 0);

            const percentage = (spent / budget.amount) * 100;
            const progressClass = percentage > 100 ? 'danger' : percentage > 80 ? 'warning' : '';

            return `
                <div class="budget-item">
                    <div class="budget-info">
                        <div class="budget-category">${budget.category}</div>
                        <div class="budget-amount">${this.formatCurrency(spent)} / ${this.formatCurrency(budget.amount)}</div>
                        <div class="budget-progress">
                            <div class="budget-progress-bar ${progressClass}" style="width: ${Math.min(percentage, 100)}%"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderTransactions() {
        const transactionsList = document.getElementById('transactionsList');
        this.renderTransactionList(this.transactions, transactionsList);
    }

    renderTransactionList(transactions, container) {
        if (transactions.length === 0) {
            container.innerHTML = '<p class="no-data">No transactions found</p>';
            return;
        }

        container.innerHTML = transactions
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(transaction => `
                <div class="transaction-item">
                    <div class="transaction-info">
                        <div class="transaction-description">${transaction.description}</div>
                        <div class="transaction-category">${transaction.category}</div>
                        <div class="transaction-date">${this.formatDate(transaction.date)}</div>
                    </div>
                    <div class="transaction-amount ${transaction.type}">
                        ${this.formatCurrency(transaction.amount)}
                    </div>
                </div>
            `).join('');
    }

    renderBudgets() {
        const budgetsList = document.getElementById('budgetsList');
        
        if (this.budgets.length === 0) {
            budgetsList.innerHTML = '<p class="no-data">No budgets created</p>';
            return;
        }

        budgetsList.innerHTML = this.budgets.map(budget => `
            <div class="budget-item">
                <div class="budget-info">
                    <div class="budget-category">${budget.category}</div>
                    <div class="budget-amount">${this.formatCurrency(budget.amount)} (${budget.period})</div>
                </div>
                <button class="btn btn-secondary" onclick="familyFinanceMonitor.deleteBudget(${budget.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `).join('');
    }

    deleteBudget(budgetId) {
        if (confirm('Are you sure you want to delete this budget?')) {
            this.budgets = this.budgets.filter(b => b.id !== budgetId);
            this.saveToStorage('budgets', this.budgets);
            this.renderBudgets();
            this.renderDashboard();
            this.showNotification('Budget deleted successfully!', 'success');
        }
    }

    updateBalance() {
        const balance = this.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        document.getElementById('currentBalance').textContent = this.formatCurrency(balance);
    }

    updateCurrentDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('transactionDate').value = today;
    }

    getMonthlyTransactions(monthYear) {
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            const transactionMonthYear = transactionDate.toMonthYear();
            return transactionMonthYear === monthYear;
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#38a169' : type === 'error' ? '#e53e3e' : '#3182ce'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from storage:', error);
            return null;
        }
    }

    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }
}

// Add helper methods to Date prototype
Date.prototype.toMonthYear = function() {
    return `${this.getFullYear()}-${String(this.getMonth() + 1).padStart(2, '0')}`;
};

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

    // New rendering methods for family finance monitor
    renderChildren() {
        const childrenGrid = document.getElementById('childrenGrid');
        if (!childrenGrid) return;
        
        if (this.children.length === 0) {
            childrenGrid.innerHTML = '<p class="no-data">No children added yet</p>';
            return;
        }

        childrenGrid.innerHTML = this.children.map(child => `
            <div class="child-card">
                <div class="child-header">
                    <div class="child-avatar">${child.name.charAt(0)}</div>
                    <div class="child-info">
                        <h3>${child.name}</h3>
                        <p>${child.age} years old • ${child.grade} grade</p>
                    </div>
                </div>
                <div class="child-stats">
                    <div class="stat-item">
                        <span class="stat-value">${this.formatCurrency(child.currentBalance)}</span>
                        <span class="stat-label">Current Balance</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${this.formatCurrency(child.spendingThisMonth)}</span>
                        <span class="stat-label">This Month</span>
                    </div>
                </div>
                <div class="child-account">
                    <p><strong>Account:</strong> ${child.bankAccount}</p>
                    <p><strong>Last Transaction:</strong> ${child.lastTransaction}</p>
                </div>
                <div class="child-goals">
                    <h4>Goals Progress</h4>
                    ${child.goals.map(goal => `
                        <div class="goal-item-small">
                            <span>${goal.name}</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(goal.current / goal.target) * 100}%"></div>
                            </div>
                            <span>${this.formatCurrency(goal.current)} / ${this.formatCurrency(goal.target)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    renderSubscriptionPlans() {
        const subscriptionPlans = document.getElementById('subscriptionPlans');
        if (!subscriptionPlans) return;

        const plans = [
            {
                name: "Basic",
                price: 9.99,
                period: "per month",
                features: [
                    "Monitor up to 2 children",
                    "Basic transaction tracking",
                    "Email alerts",
                    "Monthly reports"
                ],
                current: false
            },
            {
                name: "Family",
                price: 19.99,
                period: "per month",
                features: [
                    "Monitor up to 4 children",
                    "Real-time Plaid integration",
                    "Advanced analytics",
                    "Goal setting & tracking",
                    "SMS & email alerts",
                    "Weekly reports",
                    "Priority support"
                ],
                current: true,
                featured: true
            },
            {
                name: "Premium",
                price: 39.99,
                period: "per month",
                features: [
                    "Monitor unlimited children",
                    "All Family features",
                    "AI-powered insights",
                    "Custom alerts",
                    "Daily reports",
                    "24/7 phone support",
                    "Advanced budgeting tools",
                    "Financial education content"
                ],
                current: false
            }
        ];

        subscriptionPlans.innerHTML = plans.map(plan => `
            <div class="plan-card ${plan.featured ? 'featured' : ''}">
                ${plan.featured ? '<div class="plan-badge">Most Popular</div>' : ''}
                <div class="plan-header">
                    <h3 class="plan-name">${plan.name}</h3>
                    <div class="plan-price">$${plan.price}</div>
                    <p class="plan-period">${plan.period}</p>
                </div>
                <ul class="plan-features">
                    ${plan.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
                <button class="btn ${plan.current ? 'btn-secondary' : 'btn-primary'}" 
                        ${plan.current ? 'disabled' : ''}>
                    ${plan.current ? 'Current Plan' : 'Upgrade Now'}
                </button>
            </div>
        `).join('');
    }

    renderTransactions() {
        const transactionsList = document.getElementById('transactionsList');
        if (!transactionsList) return;

        if (!this.plaidData.transactions || this.plaidData.transactions.length === 0) {
            transactionsList.innerHTML = '<p class="no-data">No bank transactions found</p>';
            return;
        }

        transactionsList.innerHTML = this.plaidData.transactions.slice(0, 50).map(transaction => `
            <div class="transaction-item plaid-transaction">
                <div class="transaction-icon ${this.getCategoryIcon(transaction.category)}">
                    <i class="fas fa-${this.getCategoryIcon(transaction.category)}"></i>
                </div>
                <div class="transaction-details">
                    <div class="transaction-name">${transaction.merchant}</div>
                    <div class="transaction-category">${transaction.category} • ${transaction.childName}</div>
                    <div class="transaction-time">${this.formatDate(transaction.date)}</div>
                </div>
                <div class="transaction-amount ${transaction.amount < 0 ? 'expense' : 'income'}">
                    ${this.formatCurrency(transaction.amount)}
                </div>
                ${transaction.pending ? '<span class="pending-badge">Pending</span>' : ''}
            </div>
        `).join('');
    }

    getCategoryIcon(category) {
        const icons = {
            'Food & Dining': 'utensils',
            'Shopping': 'shopping-bag',
            'Entertainment': 'gamepad',
            'Gas & Fuel': 'gas-pump',
            'Health & Wellness': 'heart',
            'Convenience Store': 'store',
            'Other': 'receipt'
        };
        return icons[category] || 'receipt';
    }

    // Update the login screen
    showLoginScreen() {
        document.body.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <div class="logo">
                        <div class="logo-icon"></div>
                        <span>University Finance AI</span>
                    </div>
                </div>
                
                <div class="hero">
                    <h1>University Finance AI</h1>
                    <h2>Campus Life Assistant & Financial Tracking</h2>
                    <p>Monitor university students' spending, set academic financial goals, and track their progress with real-time bank data integration. Optimize campus life and financial success.</p>
                    <button class="cta-btn" id="loginBtn">🎓 Login as Administrator</button>
                    
                    <div class="features">
                        <div class="feature">
                            <div class="feature-icon">🎓</div>
                            <h3>Student Monitoring</h3>
                            <p>Track multiple university students' accounts and campus spending patterns in real-time.</p>
                        </div>
                        <div class="feature">
                            <div class="feature-icon">🏦</div>
                            <h3>Bank Integration</h3>
                            <p>Connect to students' bank accounts via Plaid for automatic transaction tracking.</p>
                        </div>
                        <div class="feature">
                            <div class="feature-icon">🎯</div>
                            <h3>Academic Goals</h3>
                            <p>Set and monitor financial goals for each student with progress tracking for campus life.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Re-setup event listeners for login
        document.getElementById('loginBtn').addEventListener('click', () => {
            this.loginAsParent();
        });
    }

    // AI-Powered Methods
    generateAIInsights() {
        this.aiInsights = [
            {
                type: 'trend',
                title: 'Campus Spending Analysis',
                description: 'Alex is spending 23% more on dining hall meals this month compared to last month. This could impact his study abroad savings goal.',
                value: '+23%',
                category: 'dining',
                child: 'Alex'
            },
            {
                type: 'prediction',
                title: 'Academic Goal Forecast',
                description: 'Based on current savings rates, Emma will reach her art supplies goal 1 month early, while Jake needs to increase savings by 15% to meet his engineering calculator goal.',
                value: '85% accuracy',
                category: 'goals',
                child: 'Emma'
            },
            {
                type: 'recommendation',
                title: 'Smart Budget Adjustment',
                description: 'Consider reducing Alex\'s dining hall budget by $30/month and redirecting it to his study abroad fund. This would accelerate his goal by 2 months.',
                value: '$30/month',
                category: 'budget',
                child: 'Alex'
            },
            {
                type: 'alert',
                title: 'Unusual Campus Spending Detected',
                description: 'Jake made 3 transactions at the Campus Recreation Center in one week totaling $45. This is 40% above his typical fitness budget.',
                value: '$45',
                category: 'recreation',
                child: 'Jake'
            }
        ];

        this.renderAIAnalysis();
    }

    renderAIAnalysis() {
        // Spending Trends
        const spendingTrends = document.getElementById('spendingTrends');
        if (spendingTrends) {
            const trends = this.aiInsights.filter(insight => insight.type === 'trend');
            spendingTrends.innerHTML = trends.map(trend => `
                <div class="trend-item">
                    <span class="trend-label">${trend.title} (${trend.child})</span>
                    <span class="trend-value up">${trend.value}</span>
                </div>
            `).join('');
        }

        // AI Predictions
        const predictions = document.getElementById('aiPredictions');
        if (predictions) {
            const preds = this.aiInsights.filter(insight => insight.type === 'prediction');
            predictions.innerHTML = preds.map(pred => `
                <div class="prediction-item">
                    <span class="prediction-label">${pred.title}</span>
                    <span class="prediction-value">${pred.value}</span>
                    <span class="prediction-confidence">${pred.description}</span>
                </div>
            `).join('');
        }

        // AI Recommendations
        const recommendations = document.getElementById('aiRecommendations');
        if (recommendations) {
            const recs = this.aiInsights.filter(insight => insight.type === 'recommendation');
            recommendations.innerHTML = recs.map(rec => `
                <div class="recommendation-item">
                    <i class="fas fa-lightbulb"></i>
                    <span>${rec.description}</span>
                </div>
            `).join('');
        }
    }

    renderAICoach() {
        this.renderAIAnalysis();
        this.setupAIChat();
    }

    setupAIChat() {
        const sendBtn = document.getElementById('sendMessage');
        const chatInput = document.getElementById('chatInput');
        
        if (sendBtn && chatInput) {
            sendBtn.addEventListener('click', () => {
                this.sendAIMessage();
            });
            
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendAIMessage();
                }
            });
        }
    }

    async sendAIMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessageToChat(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        this.addTypingIndicator();
        
        try {
            // Generate AI response
            const aiResponse = await this.generateAIResponse(message);
            this.removeTypingIndicator();
            this.addMessageToChat(aiResponse, 'ai');
        } catch (error) {
            this.removeTypingIndicator();
            this.addMessageToChat('Sorry, I encountered an error. Please try again.', 'ai');
        }
    }

    async generateAIResponse(message) {
        // Simulate AI response based on message content
        const responses = {
            'spending': 'I can see that Alex is spending more on dining hall meals this month. Would you like me to suggest some budget adjustments to help him stay on track with his study abroad savings goal?',
            'goals': 'Your students are making good progress on their academic goals! Emma is ahead of schedule for her art supplies, while Jake might need some encouragement to increase his savings rate for his engineering calculator.',
            'budget': 'Based on your students\' campus spending patterns, I recommend setting weekly spending limits for each student. This will help them learn better money management skills while in university.',
            'savings': 'Great question! I can help you create a savings strategy for each student. Would you like me to analyze their current progress and suggest improvements for their academic and personal goals?',
            'campus': 'I can help you track campus-specific expenses like dining hall usage, textbook purchases, and recreation center fees. What campus spending would you like to analyze?',
            'textbooks': 'Textbook expenses can be significant! I can help you find ways to save on textbooks through rentals, used books, or digital alternatives.',
            'dining': 'Campus dining can be expensive! I can analyze your students\' dining patterns and suggest ways to optimize their meal plan usage.',
            'default': 'I\'m here to help with your students\' campus life and financial planning! I can analyze spending patterns, predict goal completion dates, and provide personalized recommendations for university life. What specific aspect would you like to discuss?'
        };

        // Simple keyword matching for demo
        const lowerMessage = message.toLowerCase();
        for (const [keyword, response] of Object.entries(responses)) {
            if (lowerMessage.includes(keyword)) {
                return response;
            }
        }
        return responses.default;
    }

    addMessageToChat(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
                <div class="message-avatar user">
                    <i class="fas fa-user"></i>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${message}</p>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    addTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Enhanced alerts with AI insights
    renderAlertsSummary() {
        const container = document.getElementById('alertsSummary');
        if (!container) return;

        const alerts = [
            { type: 'warning', text: 'AI detected unusual spending pattern for Alex - 3 dining hall purchases in one day', time: '2 hours ago', ai: true },
            { type: 'success', text: 'Emma completed her art supplies savings goal! AI prediction was 95% accurate', time: '1 day ago', ai: true },
            { type: 'info', text: 'AI recommends setting a weekly budget limit for Jake to improve his savings rate for engineering equipment', time: '3 days ago', ai: true },
            { type: 'warning', text: 'Campus dining budget exceeded by 15% this month', time: '5 hours ago', ai: false }
        ];

        container.innerHTML = alerts.map(alert => `
            <div class="alert-item ${alert.type}">
                <div class="alert-icon">
                    <i class="fas fa-${alert.type === 'warning' ? 'exclamation-triangle' : alert.type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-text">
                        ${alert.text}
                        ${alert.ai ? '<span class="ai-badge">AI</span>' : ''}
                    </div>
                    <div class="alert-time">${alert.time}</div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize the application
let familyFinanceMonitor;
document.addEventListener('DOMContentLoaded', () => {
    familyFinanceMonitor = new FamilyFinanceMonitor();
});
