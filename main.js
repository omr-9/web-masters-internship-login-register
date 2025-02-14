const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const signupUsername = document.getElementById('signup-username');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupConfirmPassword = document.getElementById('confirm-password');

const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

const hashPassword = (password) => {
    return btoa(password);
}

const register = (event) => {
    event.preventDefault();

    const formData = {
        username: signupUsername.value.trim(),
        email: signupEmail.value.trim(),
        password: signupPassword.value,
        confirmPassword: signupConfirmPassword.value
    }

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        alert("All fields are required.");
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const usernameExists = users.some(user => user.username === formData.username);
    if (usernameExists) {
        alert("Username is already taken. Please choose a different one.");
        return;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
        alert("Please enter a valid email address.");
        return;
    }

    formData.password = hashPassword(formData.password);
    formData.confirmPassword = hashPassword(formData.confirmPassword); 
    users.push({ username: formData.username, email: formData.email, password: formData.password, confirmPassword: formData.confirmPassword });
    localStorage.setItem('users', JSON.stringify(users));

    window.location.href = 'index.html';
}

const login = (event) => {
    event.preventDefault();

    const formData = {
        username: loginUsername.value.trim(),
        password: loginPassword.value
    }

    if (!formData.username || !formData.password) {
        alert("Both fields are required.");
        return;
    }

    const hashedPassword = hashPassword(formData.password);

    const user = users.find(user => user.username === formData.username && user.password === hashedPassword);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));
        window.location.href = 'home.html';
    } else {
        alert("Invalid username or password.");
    }
}
