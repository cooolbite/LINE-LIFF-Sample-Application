// LINE LIFF Application JavaScript
// พัฒนาโดย: cooolbite
// เวอร์ชัน: 1.0.0
class LineLiffApp {
    constructor() {
        this.initializeLiff();
        this.bindEvents();
        this.currentUser = null;
    }

    async initializeLiff() {
        try {
            // Initialize LIFF
            await liff.init({ liffId: 'your_liff_id_here' });
            console.log('LIFF initialized successfully');

            // Check if user is logged in
            if (liff.isLoggedIn()) {
                this.onUserLogin();
            } else {
                this.showLoginSection();
            }
        } catch (error) {
            console.error('LIFF initialization failed:', error);
            this.showError('ไม่สามารถเชื่อมต่อกับ LINE ได้ กรุณาลองใหม่อีกครั้ง');
        }
    }

    bindEvents() {
        // Login button click
        document.getElementById('loginButton').addEventListener('click', () => {
            this.login();
        });

        // Personal info form submit
        document.getElementById('personalInfoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePersonalInfo();
        });
    }

    async login() {
        try {
            if (!liff.isLoggedIn()) {
                await liff.login();
            }
        } catch (error) {
            console.error('Login failed:', error);
            this.showError('การเข้าสู่ระบบล้มเหลว กรุณาลองใหม่อีกครั้ง');
        }
    }

    async onUserLogin() {
        try {
            this.showLoading();
            
            // Get user profile
            const profile = await liff.getProfile();
            this.currentUser = profile;
            
            // Check if user data exists in database
            await this.checkExistingUserData(profile.userId);
            
            this.displayUserInfo(profile);
            this.showUserSection();
            
        } catch (error) {
            console.error('Error getting user profile:', error);
            this.showError('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
        }
    }

    async checkExistingUserData(userId) {
        try {
            const response = await fetch(`/api/users/${userId}`);
            if (response.ok) {
                const userData = await response.json();
                this.populateFormWithExistingData(userData);
            }
        } catch (error) {
            console.error('Error checking existing user data:', error);
        }
    }

    populateFormWithExistingData(userData) {
        if (userData.email) document.getElementById('email').value = userData.email;
        if (userData.phone) document.getElementById('phone').value = userData.phone;
        if (userData.address) document.getElementById('address').value = userData.address;
        if (userData.birth_date) document.getElementById('birthDate').value = userData.birth_date;
    }

    displayUserInfo(profile) {
        document.getElementById('displayName').textContent = profile.displayName;
        document.getElementById('userId').textContent = profile.userId;
        
        if (profile.pictureUrl) {
            document.getElementById('profilePicture').src = profile.pictureUrl;
        } else {
            document.getElementById('profilePicture').src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE1IiBmaWxsPSIjQ0NDIi8+CjxwYXRoIGQ9Ik0yMCA4MEg4MEM4MCA2MCA2MCA1MCA1MCA1MEMzNSA1MCAxNSA2MCAxNSA4MFoiIGZpbGw9IiNDQ0MiLz4KPC9zdmc+';
        }
    }

    async savePersonalInfo() {
        if (!this.currentUser) {
            this.showError('กรุณาเข้าสู่ระบบก่อน');
            return;
        }

        try {
            this.showLoading();
            
            const formData = new FormData(document.getElementById('personalInfoForm'));
            const userData = {
                line_user_id: this.currentUser.userId,
                display_name: this.currentUser.displayName,
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                birth_date: formData.get('birthDate')
            };

            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                this.showSuccess();
                this.hideLoading();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            }

        } catch (error) {
            console.error('Error saving user data:', error);
            this.showError(error.message);
            this.hideLoading();
        }
    }

    showLoginSection() {
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('userInfoSection').style.display = 'none';
        document.getElementById('loadingSection').style.display = 'none';
    }

    showUserSection() {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('userInfoSection').style.display = 'block';
        document.getElementById('loadingSection').style.display = 'none';
    }

    showLoading() {
        document.getElementById('loadingSection').style.display = 'block';
    }

    hideLoading() {
        document.getElementById('loadingSection').style.display = 'none';
    }

    showSuccess() {
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }

    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        errorText.textContent = message;
        errorMessage.style.display = 'block';
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LineLiffApp();
});
