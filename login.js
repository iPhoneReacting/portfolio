const loginBtn = document.getElementById('loginBtn');
const adminPass = document.getElementById('adminPass');
const errorMsg = document.getElementById('errorMsg');

// كلمة المرور المؤقتة (يمكن تغييرها لاحقًا أو جعلها من قاعدة البيانات)
const correctPassword = "admin123";

loginBtn.addEventListener('click', () => {
  if (adminPass.value === correctPassword) {
    // حفظ جلسة الدخول
    localStorage.setItem("isAdmin", "true");
    window.location.href = "../admin.html"; // الانتقال للوحة التحكم
  } else {
    errorMsg.textContent = "❌ كلمة السر غير صحيحة";
  }
});

// إذا المستخدم سجل دخوله مسبقًا، لا داعي لإعادة إدخال كلمة السر
if (localStorage.getItem("isAdmin") === "true") {
  window.location.href = "../admin.html";
}
